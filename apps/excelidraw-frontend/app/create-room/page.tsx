"use client"

import { DashboardLayout } from "@/components/DashboardLayout"
import { CreateRoomCard } from "@/components/CreateRoomCard"
import { Sparkles } from "lucide-react"

const CreateRoomPage = () => {
  return (  
    <DashboardLayout>
      {() => (
        <div className="max-w-2xl mx-auto space-y-8 py-12">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" />
              New Session
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Create a New Room</h1>
            <p className="text-muted-foreground">
              Get started by giving your room a name. You can invite others to join once you&apos;re inside.
            </p>
          </div>

          <CreateRoomCard />
        </div>
      )}
    </DashboardLayout>
  )
}

export default CreateRoomPage
