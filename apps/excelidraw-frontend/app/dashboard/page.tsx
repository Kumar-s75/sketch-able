"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { CreateRoomCard } from "@/components/CreateRoomCard"
import { RoomList } from "@/components/RoomList"

const Dashboard = () => {
  return (
    <DashboardLayout>
      {(username, rooms) => (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {username ? `Hello, ${username}` : "Dashboard"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your rooms and active sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
            <CreateRoomCard />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Recent rooms</p>
                <span className="text-xs text-muted-foreground/55">{rooms.length} total</span>
              </div>
              <RoomList rooms={rooms} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Dashboard
