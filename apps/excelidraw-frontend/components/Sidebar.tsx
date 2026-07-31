import { bgFill, strokeFill, strokeWidth, Tool, StrokeStyle } from "@/canvas/Canvas"
import type { SelectedShapeInfo } from "@/render/Game"
import React from "react"

interface SidebarProps {
  activeTool: Tool
  selectedShape: SelectedShapeInfo | null
  strokeFill: strokeFill
  setStrokeFill: React.Dispatch<React.SetStateAction<strokeFill>>
  strokeWidth: strokeWidth
  setStrokeWidth: React.Dispatch<React.SetStateAction<strokeWidth>>
  bgFill: bgFill
  setBgFill: React.Dispatch<React.SetStateAction<bgFill>>
  opacity: number
  setOpacity: React.Dispatch<React.SetStateAction<number>>
  strokeStyle: StrokeStyle
  setStrokeStyle: React.Dispatch<React.SetStateAction<StrokeStyle>>
  fontSize: number
  setFontSize: React.Dispatch<React.SetStateAction<number>>
}

const STROKE_FILLS: strokeFill[] = [
  "rgba(211, 211, 211)",
  "rgba(242, 154, 158)",
  "rgba(77, 161, 83)",
  "rgba(98, 177, 247)",
  "rgba(183, 98, 42)",
]

const BG_FILLS: bgFill[] = [
  "rgba(0, 0, 0, 0)",
  "rgba(89, 49, 49)",
  "rgba(23, 61, 16)",
  "rgba(30, 70, 101)",
  "rgba(49, 37, 7)",
]

const STROKE_WIDTHS: strokeWidth[] = [1, 2, 4]
const STROKE_STYLES: StrokeStyle[] = ["solid", "dashed", "dotted"]

const SHAPE_TOOLS: Tool[] = ["rect", "ellipse", "diamond", "triangle"]
const ALL_DRAW_TOOLS: Tool[] = ["rect", "ellipse", "diamond", "triangle", "line", "arrow", "pencil", "text"]

export const Sidebar = ({
  activeTool,
  selectedShape,
  strokeFill,
  setStrokeFill,
  strokeWidth,
  setStrokeWidth,
  bgFill,
  setBgFill,
  opacity,
  setOpacity,
  strokeStyle,
  setStrokeStyle,
  fontSize,
  setFontSize,
}: SidebarProps) => {
  const isSelectWithShape = activeTool === "select" && selectedShape !== null
  const isDrawTool = ALL_DRAW_TOOLS.includes(activeTool)

  if (activeTool === "erase" || activeTool === "grab") return null
  if (activeTool === "select" && !selectedShape) return null

  const showBgFill =
    isDrawTool
      ? SHAPE_TOOLS.includes(activeTool)
      : isSelectWithShape && selectedShape &&
        (selectedShape.type === "rect" ||
          selectedShape.type === "ellipse" ||
          selectedShape.type === "diamond" ||
          selectedShape.type === "triangle")

  const showStrokeStyle =
    isDrawTool
      ? activeTool !== "pencil" && activeTool !== "text"
      : isSelectWithShape && selectedShape &&
        selectedShape.type !== "pencil" &&
        selectedShape.type !== "text"

  const showFontSize =
    isDrawTool
      ? activeTool === "text"
      : isSelectWithShape && selectedShape?.type === "text"

  const toolLabel = isSelectWithShape
    ? `Selected · ${selectedShape.type}`
    : activeTool

  return (
    <aside className="fixed left-4 top-20 z-40 w-[220px] rounded-xl border border-white/10 bg-[#1e1e2e] p-3 text-white shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Properties</p>
        <span className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[10px] font-medium text-white/50">
          {toolLabel}
        </span>
      </div>

      <div className="space-y-4">
        <Section label="Stroke">
          <div className="grid grid-cols-5 gap-1.5">
            {STROKE_FILLS.map((fill) => (
              <ColorSwatch
                key={fill}
                color={fill}
                isActive={strokeFill === fill}
                onClick={() => setStrokeFill(fill)}
                ariaLabel={`Stroke color ${fill}`}
              />
            ))}
          </div>
        </Section>

        {showBgFill && (
          <Section label="Background">
            <div className="grid grid-cols-5 gap-1.5">
              {BG_FILLS.map((fill) => (
                <ColorSwatch
                  key={fill}
                  color={fill}
                  isActive={bgFill === fill}
                  onClick={() => setBgFill(fill)}
                  transparent={fill === "rgba(0, 0, 0, 0)"}
                  ariaLabel={`Background color ${fill}`}
                />
              ))}
            </div>
          </Section>
        )}

        <Section label="Stroke Width">
          <div className="flex gap-1.5">
            {STROKE_WIDTHS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setStrokeWidth(w)}
                aria-label={`Stroke width ${w}`}
                className={`flex h-8 flex-1 items-center justify-center rounded-md border transition-colors ${
                  strokeWidth === w
                    ? "border-indigo-400/60 bg-indigo-500/20 text-white"
                    : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:bg-white/[0.08]"
                }`}
              >
                <span
                  className="block w-5 rounded-full bg-current"
                  style={{ height: `${w}px` }}
                />
              </button>
            ))}
          </div>
        </Section>

        {showStrokeStyle && (
          <Section label="Stroke Style">
            <div className="flex gap-1.5">
              {STROKE_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setStrokeStyle(style)}
                  aria-label={`Stroke style ${style}`}
                  className={`flex h-8 flex-1 items-center justify-center rounded-md border transition-colors ${
                    strokeStyle === style
                      ? "border-indigo-400/60 bg-indigo-500/20 text-white"
                      : "border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  <StrokeStyleIcon style={style} />
                </button>
              ))}
            </div>
          </Section>
        )}

        <Section label={`Opacity ${Math.round(opacity * 100)}%`}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(Number.parseFloat(e.target.value))}
            className="w-full cursor-pointer accent-indigo-400"
          />
        </Section>

        {showFontSize && (
          <Section label={`Font Size ${fontSize}px`}>
            <input
              type="range"
              min="12"
              max="72"
              step="2"
              value={fontSize}
              onChange={(e) => setFontSize(Number.parseInt(e.target.value, 10))}
              className="w-full cursor-pointer accent-indigo-400"
            />
          </Section>
        )}
      </div>
    </aside>
  )
}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">{label}</p>
    {children}
  </div>
)

const ColorSwatch = ({
  color,
  isActive,
  onClick,
  ariaLabel,
  transparent,
}: {
  color: string
  isActive: boolean
  onClick: () => void
  ariaLabel: string
  transparent?: boolean
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={`h-7 w-full rounded-md border transition-all ${
      isActive
        ? "border-indigo-400 shadow-[0_0_0_2px_rgba(99,102,241,0.35)]"
        : transparent
          ? "border-white/25 hover:border-white/50"
          : "border-white/10 hover:border-white/30"
    } ${transparent ? "relative overflow-hidden" : ""}`}
    style={{ backgroundColor: color }}
  >
    {transparent && (
      <span
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom right, transparent calc(50% - 0.5px), rgba(239,68,68,0.7) calc(50% - 0.5px), rgba(239,68,68,0.7) calc(50% + 0.5px), transparent calc(50% + 0.5px))",
        }}
      />
    )}
  </button>
)

const StrokeStyleIcon = ({ style }: { style: StrokeStyle }) => {
  if (style === "solid") {
    return <span className="block h-[2px] w-5 rounded-full bg-current" />
  }
  if (style === "dashed") {
    return (
      <span className="flex items-center gap-0.5">
        <span className="block h-[2px] w-1.5 rounded-full bg-current" />
        <span className="block h-[2px] w-1.5 rounded-full bg-current" />
        <span className="block h-[2px] w-1.5 rounded-full bg-current" />
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1">
      <span className="block h-[2px] w-[3px] rounded-full bg-current" />
      <span className="block h-[2px] w-[3px] rounded-full bg-current" />
      <span className="block h-[2px] w-[3px] rounded-full bg-current" />
      <span className="block h-[2px] w-[3px] rounded-full bg-current" />
    </span>
  )
}
