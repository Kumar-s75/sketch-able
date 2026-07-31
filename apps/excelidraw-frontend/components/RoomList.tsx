"use client";

import Link from "next/link";
import { ArrowRight, Hash } from "lucide-react";

interface Room {
  id: string;
  roomName: string;
}

interface RoomListProps {
  rooms: Room[];
}

export function RoomList({ rooms }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/60 dark:bg-white/[0.04]">
          <Hash className="h-5 w-5 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No rooms yet</p>
        <p className="mt-1 text-xs text-muted-foreground/60">Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <Link
          key={room.id}
          href={`/room/${room.roomName}`}
          className="group flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3.5 transition-colors hover:border-border hover:bg-secondary/40 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground/80 group-hover:text-foreground">
              {room.roomName}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground/60">
              {room.id.slice(0, 8)}…
            </p>
          </div>
          <ArrowRight className="ml-3 h-4 w-4 flex-shrink-0 text-muted-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground/70" />
        </Link>
      ))}
    </div>
  );
}
