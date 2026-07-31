import React from "react"
import type { PresenceUser } from "@/render/Game"

interface PresenceBarProps {
  users: PresenceUser[]
}

const getInitials = (name: string) => {
  const trimmed = name.trim()
  if (!trimmed) return "U"
  return trimmed.charAt(0).toUpperCase()
}

export const PresenceBar = ({ users }: PresenceBarProps) => {
  const visible = users.slice(0, 5)
  const extra = users.length - visible.length

  return (
    <div className="flex items-center gap-3 bg-[#232329] px-3 py-2 rounded-md text-white">
      <div className="text-xs text-white/70">Active</div>
      <div className="flex -space-x-2">
        {visible.map((user) => (
          <div
            key={user.id}
            className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-semibold"
            title={user.username}
          >
            {getInitials(user.username)}
          </div>
        ))}
        {extra > 0 ? (
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-semibold">
            +{extra}
          </div>
        ) : null}
      </div>
      <div className="text-xs text-white/40">Autosave on</div>
    </div>
  )
}
