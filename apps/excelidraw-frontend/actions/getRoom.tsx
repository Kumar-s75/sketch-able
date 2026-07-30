import type { RoomData } from "@/types/room"
import { getPublicHttpUrl } from "@/lib/public-urls"

type GetRoomResponse = {
  room?: RoomData
  error?: string
}

export const getRoom = async (roomName: string, invite?: string): Promise<RoomData> => {
    const params = new URLSearchParams()
    if (invite) {
        params.set("invite", invite)
    }

    const query = params.toString()
    const url = `${getPublicHttpUrl()}/room/${roomName}${query ? `?${query}` : ""}`
    const res = await fetch(url, {
        method: "GET"
    })

    const data = (await res.json().catch(() => null)) as GetRoomResponse | null

    if (res.status === 200 && data?.room) {
        return data.room
    }

    throw new Error(data?.error || "Something went wrong")
}
