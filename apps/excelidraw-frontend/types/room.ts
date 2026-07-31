export interface RoomShapeRecord {
  data: string
}

export interface RoomData {
  id: number
  roomName: string
  inviteCode?: string | null
  isPrivate?: boolean
  shape?: RoomShapeRecord[]
}
