import "@repo/common/env-bootstrap"
import { createServer } from "http"
import {WebSocket, WebSocketServer} from "ws"
import type { RawData } from "ws"
import { checkUser } from "./checkUser";
import {prismaClient} from "@repo/db/client"
import { createLogger } from "@repo/common/logger"
import { randomUUID } from "crypto"

const logger = createLogger({ service: "ws-backend" })
const port = Number(process.env.PORT ?? process.env.WS_PORT ?? 8080)
const server = createServer((req, res) => {
    if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ ok: true }))
        return
    }

    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Not found" }))
})

const wss = new WebSocketServer({ server })

interface User {
    ws:  WebSocket,
    rooms: string[],
    userId: string
    username?: string
}

const users : User[] = []
const MAX_MESSAGE_BYTES = 100_000

const isLegacyRoomSchemaError = (error: unknown): boolean => {
    if (!error || typeof error !== "object") {
        return false
    }
    const maybe = error as {
        code?: string
        message?: string
        meta?: { column?: string }
    }
    if (maybe.code !== "P2022") {
        return false
    }
    const column = typeof maybe.meta?.column === "string" ? maybe.meta.column : ""
    const message = typeof maybe.message === "string" ? maybe.message : ""
    return (
        column.includes("Room.isPrivate") ||
        column.includes("Room.inviteCode") ||
        message.includes("Room.isPrivate") ||
        message.includes("Room.inviteCode")
    )
}

const getUser = (ws: WebSocket) => users.find(x => x.ws === ws)
const broadcastPresence = (roomId: string) => {
    const activeUsers = users
        .filter(u => u.rooms.includes(roomId))
        .map(u => ({
            id: u.userId,
            username: u.username || "User"
        }))

    users.forEach(u => {
        if (u.rooms.includes(roomId)) {
            u.ws.send(JSON.stringify({
                type: "presence",
                roomId,
                users: activeUsers
            }))
        }
    })
}

const toText = (data: RawData): string => {
    if (typeof data === "string") {
        return data
    }
    if (Buffer.isBuffer(data)) {
        return data.toString()
    }
    if (Array.isArray(data)) {
        return Buffer.concat(data).toString()
    }
    if (data instanceof ArrayBuffer) {
        return Buffer.from(data).toString()
    }
    return ""
}

const safeJsonParse = (data: RawData | string) => {
    try {
        const text = typeof data === "string" ? data : toText(data)
        return JSON.parse(text)
    } catch (e) {
        return null
    }
}

wss.on("connection", async function connection(ws, request){
    const url = request.url

    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1])
    const connectionId = queryParams.get("requestId") || randomUUID()
    const token = queryParams.get("token") || ""
    const userId = await checkUser(token)

    if (userId === null){
        logger.warn("Rejected websocket connection due to invalid token", { connectionId })
        ws.close()
        return null;
    }


    let username = "User"
    try {
        const dbUser = await prismaClient.user.findUnique({
            where: { id: userId },
            select: { username: true }
        })
        if (dbUser?.username) {
            username = dbUser.username
        }
    } catch (e) {
        logger.warn("User lookup failed during websocket connection", { connectionId, userId, error: e })
    }

    users.push({
        userId,
        username,
        ws,
        rooms: []
    })

    logger.info("WebSocket connection established", { connectionId, userId, username })

    ws.on("error", (error) => {
        logger.error("WebSocket connection error", { connectionId, userId, error })
    })

    ws.on("close", () => {
        const user = getUser(ws)
        const rooms = user?.rooms ? [...user.rooms] : []
        const index = users.findIndex(x => x.ws === ws)
        if (index !== -1) {
            users.splice(index, 1)
        }
        logger.info("WebSocket connection closed", { connectionId, userId, roomCount: rooms.length })
        rooms.forEach(broadcastPresence)
    })

    ws.on('message', async function message(data){
        const text = toText(data)
        const size = Buffer.byteLength(text)
        if (size > MAX_MESSAGE_BYTES) {
            return;
        }
        const parsedData = safeJsonParse(text)
        if (!parsedData || typeof parsedData.type !== "string") {
            return;
        }

        if(parsedData.type === "join_room"){
            const user = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            const roomIdNum = Number(roomId)
            if (!user || !roomId || !Number.isFinite(roomIdNum)) {
                return;
            }
            let room: { id: number; roomName: string; userId: string; isPrivate?: boolean; inviteCode?: string | null } | null = null
            try {
                room = await prismaClient.room.findUnique({
                    where: { id: roomIdNum }
                })
            } catch (roomError: unknown) {
                if (!isLegacyRoomSchemaError(roomError)) {
                    throw roomError
                }
                const legacyRooms = await prismaClient.$queryRaw<Array<{ id: number; roomName: string; userId: string }>>`
                    SELECT "id", "roomName", "userId" FROM "Room" WHERE "id" = ${roomIdNum} LIMIT 1
                `
                const legacyRoom = legacyRooms[0]
                room = legacyRoom ? { ...legacyRoom, isPrivate: false, inviteCode: null } : null
            }
            if (!room) {
                return;
            }
            if (room.isPrivate) {
                const invite = String(parsedData.invite ?? "")
                if (!invite || room.inviteCode !== invite) {
                    return;
                }
            }

            if (!user.rooms.includes(roomId)) {
                user.rooms.push(roomId)
            }
            logger.info("WebSocket joined room", { connectionId, userId, roomId })
            broadcastPresence(roomId)
            return;
        }

        if(parsedData.type === "leave_room"){
            const user = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            if(!user || !roomId){
                return;
            }
            user.rooms = user.rooms.filter(x => x !== roomId)
            logger.info("WebSocket left room", { connectionId, userId, roomId })
            broadcastPresence(roomId)
            return;
        }

        if(parsedData.type === "reset"){
            const sender = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            const roomIdNum = Number(roomId)
            if (!sender || !roomId || !Number.isFinite(roomIdNum) || !sender.rooms.includes(roomId)) {
                return;
            }

            await prismaClient.shape.deleteMany({
                where:{
                    roomId: roomIdNum
                }
            })

            users.forEach(user => {
                if(user.rooms.includes(roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "reset",
                        roomId
                    }))
                }
            })
            return;
        }

        if(parsedData.type === "bulk_draw"){
            const sender = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            const roomIdNum = Number(roomId)
            const shapes = parsedData.shapes
            if (!sender || !roomId || !Number.isFinite(roomIdNum) || !Array.isArray(shapes) || !sender.rooms.includes(roomId)) {
                return;
            }

            const payloads = shapes
                .filter((shape) => shape && typeof shape === "object")
                .map((shape) => ({
                    roomId: roomIdNum,
                    data: JSON.stringify({ shape }),
                    userId
                }))

            if (payloads.length) {
                await prismaClient.shape.createMany({
                    data: payloads
                })
            }

            users.forEach(user => {
                if(user.rooms.includes(roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "bulk_draw",
                        roomId,
                        data: JSON.stringify({ shapes })
                    }))
                }
            })

            return;
        }

        if(parsedData.type === "cursor"){
            const sender = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            const roomIdNum = Number(roomId)
            const cursorPayload = safeJsonParse(parsedData.data)
            if (!sender || !roomId || !Number.isFinite(roomIdNum) || !cursorPayload || !sender.rooms.includes(roomId)) {
                return;
            }
            const x = Number(cursorPayload.x)
            const y = Number(cursorPayload.y)
            if (!Number.isFinite(x) || !Number.isFinite(y)) {
                return;
            }
            const payload = {
                userId,
                username: sender?.username || "User",
                x,
                y
            }

            users.forEach(user => {
                if(user.rooms.includes(roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "cursor",
                        roomId,
                        data: JSON.stringify(payload)
                    }))
                }
            })
            return;
        }

        if(parsedData.type === "draw"){
            const sender = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            const payload = parsedData.data
            const roomIdNum = Number(roomId)
            if (
                !sender ||
                !roomId ||
                typeof payload !== "string" ||
                !Number.isFinite(roomIdNum) ||
                payload.length > MAX_MESSAGE_BYTES ||
                !sender.rooms.includes(roomId)
            ) {
                return;
            }

            await prismaClient.shape.create({
                data: {
                    roomId: roomIdNum,
                    data: payload,
                    userId
                }
            })

            users.forEach(user => {
                if(user.rooms.includes(roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "draw",
                        data: payload,
                        roomId
                    }))
                }
            })

            return;
        }


        if(parsedData.type === "erase"){
            const sender = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            const payload = parsedData.data
            const roomIdNum = Number(roomId)
            if (
                !sender ||
                !roomId ||
                typeof payload !== "string" ||
                !Number.isFinite(roomIdNum) ||
                payload.length > MAX_MESSAGE_BYTES ||
                !sender.rooms.includes(roomId)
            ) {
                return;
            }

            await prismaClient.shape.deleteMany({
                where:{
                    data: payload,
                    roomId: roomIdNum
                }
            })

            users.forEach(user => {
                if(user.rooms.includes(roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({
                        type: "erase",
                        data: payload,
                        roomId
                    }))
                }
            })
            return;
        }

        if (parsedData.type === "update") {
            const sender = getUser(ws)
            const roomId = String(parsedData.roomId ?? "")
            const roomIdNum = Number(roomId)
            const payload = safeJsonParse(parsedData.data)
            if (
                !sender ||
                !roomId ||
                !Number.isFinite(roomIdNum) ||
                !payload ||
                typeof payload.index !== "number" ||
                !payload.shape ||
                !sender.rooms.includes(roomId)
            ) {
                return;
            }
            try {
                const shapes = await prismaClient.shape.findMany({
                    where: { roomId: roomIdNum },
                    orderBy: { id: "asc" },
                    select: { id: true }
                })
                const record = shapes[payload.index]
                if (record) {
                    await prismaClient.shape.update({
                        where: { id: record.id },
                        data: { data: JSON.stringify({ shape: payload.shape }) }
                    })
                }
            } catch (e) {
                logger.warn("Shape update DB write failed", { roomId, index: payload.index, error: e })
            }
            users.forEach(user => {
                if (user.rooms.includes(roomId) && user.ws !== ws) {
                    user.ws.send(JSON.stringify({
                        type: "update",
                        roomId,
                        data: parsedData.data
                    }))
                }
            })
            return;
        }

    })
})

server.listen(port, () => {
    logger.info("WebSocket server listening", { port, env: process.env.NODE_ENV ?? "development" })
})

process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled promise rejection", reason)
})

process.on("uncaughtException", (error) => {
    logger.error("Uncaught exception", error)
    process.exit(1)
})
