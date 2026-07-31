import {
  Circle,
  Eraser,
  HandIcon,
  Pencil,
  RectangleHorizontalIcon,
  Slash,
  MousePointer2,
  ArrowUpRight,
  Diamond,
  Triangle,
  Type,
  Waypoints,
  Lock,
  Unlock,
} from "lucide-react"
import { ToolButton } from "./ToolButton"
import { Tool } from "@/canvas/Canvas"
import { ReactNode } from "react"
import { Separator } from "@repo/ui/separator"

interface ToolbarProps {
  activeTool: Tool
  setActiveTool: (s: Tool) => void
  toolLocked: boolean
  setToolLocked: (next: boolean) => void
  mermaidPanelOpen: boolean
  onToggleMermaidPanel: () => void
}

export const Toolbar = ({
  activeTool,
  setActiveTool,
  toolLocked,
  setToolLocked,
  mermaidPanelOpen,
  onToggleMermaidPanel,
}: ToolbarProps) => {
  const groups: { tool: Tool; icon: ReactNode; shortcut: string; badge: string }[][] = [
    [
      { tool: "select", icon: <MousePointer2 className="h-4 w-4" />, shortcut: "V", badge: "V" },
      { tool: "grab", icon: <HandIcon className="h-4 w-4" />, shortcut: "H", badge: "H" },
    ],
    [
      { tool: "rect", icon: <RectangleHorizontalIcon className="h-4 w-4" />, shortcut: "R", badge: "R" },
      { tool: "ellipse", icon: <Circle className="h-4 w-4" />, shortcut: "O", badge: "O" },
      { tool: "arrow", icon: <ArrowUpRight className="h-4 w-4" />, shortcut: "A", badge: "A" },
      { tool: "line", icon: <Slash className="h-4 w-4" />, shortcut: "L", badge: "L" },
      { tool: "pencil", icon: <Pencil className="h-4 w-4" />, shortcut: "P", badge: "P" },
      { tool: "text", icon: <Type className="h-4 w-4" />, shortcut: "T", badge: "T" },
      { tool: "diamond", icon: <Diamond className="h-4 w-4" />, shortcut: "D", badge: "D" },
      { tool: "triangle", icon: <Triangle className="h-4 w-4" />, shortcut: "G", badge: "G" },
    ],
    [{ tool: "erase", icon: <Eraser className="h-4 w-4" />, shortcut: "E", badge: "E" }],
  ]

  return (
    <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#1e1e2e]/98 px-2 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur">
        {groups.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex items-center gap-0.5">
            {group.map((item) => (
              <ToolButton
                key={item.tool}
                active={activeTool === item.tool}
                onClick={() => setActiveTool(item.tool)}
                icon={item.icon}
                shortcut={item.shortcut}
                badge={item.badge}
                tool={item.tool}
              />
            ))}
            {groupIndex < groups.length - 1 ? (
              <Separator orientation="vertical" className="mx-1 h-5 bg-white/10" />
            ) : null}
          </div>
        ))}

        <Separator orientation="vertical" className="mx-1 h-5 bg-white/10" />

        <button
          type="button"
          onClick={onToggleMermaidPanel}
          title="Mermaid diagram"
          aria-label="Toggle Mermaid panel"
          className={`rounded-lg p-1.5 transition-colors ${
            mermaidPanelOpen
              ? "bg-indigo-600 text-white"
              : "text-white/50 hover:bg-white/[0.08] hover:text-white/80"
          }`}
        >
          <Waypoints className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setToolLocked(!toolLocked)}
          title={toolLocked ? "Tool locked" : "Lock tool"}
          aria-label={toolLocked ? "Disable tool lock" : "Enable tool lock"}
          className={`rounded-lg p-1.5 transition-colors ${
            toolLocked
              ? "bg-indigo-600 text-white"
              : "text-white/50 hover:bg-white/[0.08] hover:text-white/80"
          }`}
        >
          {toolLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
