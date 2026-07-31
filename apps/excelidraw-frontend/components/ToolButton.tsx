import type { ReactNode } from "react"
import { Tool } from "@/canvas/Canvas"

interface ToolProps {
  tool: Tool
  icon: ReactNode
  shortcut: string
  badge?: string
  onClick: () => void
  active: boolean
}

export const ToolButton = ({ tool, icon, shortcut, badge, onClick, active }: ToolProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${tool} tool (${shortcut})`}
      title={`${tool} (${shortcut})`}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
        active
          ? "bg-[#5f5fcf] text-white shadow-[0_0_0_1px_rgba(153,153,255,0.45)]"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="scale-90">{icon}</span>
      <span className="pointer-events-none absolute -bottom-1.5 -right-1 rounded bg-black/60 px-1 text-[9px] leading-4 text-white/70 group-hover:text-white">
        {badge ?? shortcut}
      </span>
    </button>
  )
}
