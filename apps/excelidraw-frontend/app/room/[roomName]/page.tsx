import { getRoom } from "@/actions/getRoom"
import { RoomCanvas } from "@/canvas/RoomCanvas"

interface PageProps {
    params: Promise<{
        roomName: string
    }>
    searchParams: Promise<{
        invite?: string
    }>
}

const page = async ({params, searchParams}: PageProps) => {
    const { roomName } = await params
    const resolvedSearchParams = await searchParams
    try {
        const room = await getRoom(roomName, resolvedSearchParams?.invite)
        const inviteToken = resolvedSearchParams?.invite || room.inviteCode || null
        return <RoomCanvas roomId={String(room.id)} room={room} inviteCode={inviteToken} />
    } catch (error) {
        return <p>Error loading room: {(error as Error).message}</p>
    }
}

export default page
