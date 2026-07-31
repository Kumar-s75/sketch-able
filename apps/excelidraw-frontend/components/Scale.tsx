import { RotateCcw, Undo2 } from "lucide-react"

interface ScaleProps {
  scale: number
  onZoomOut: () => void
  onZoomIn: () => void
  onUndo: () => void
  onRedo: () => void
}

export const Scale = ({ scale, onZoomOut, onZoomIn, onUndo, onRedo }: ScaleProps) => {
  return (
    <div className="fixed bottom-5 left-4 z-50 flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1f2026]/95 px-3 py-2 text-white shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={onZoomOut}
          className="rounded-md px-1 text-lg leading-none text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Zoom out"
        >
          -
        </button>
        <span className="min-w-14 text-center text-sm font-medium text-white/85">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          onClick={onZoomIn}
          className="rounded-md px-1 text-lg leading-none text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>

      <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#1f2026]/95 px-2 py-2 text-white shadow-lg backdrop-blur">
        <button
          type="button"
          onClick={onUndo}
          className="rounded-md p-1.5 text-white/75 transition hover:bg-white/10 hover:text-white"
          aria-label="Undo"
          title="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onRedo}
          className="rounded-md p-1.5 text-white/75 transition hover:bg-white/10 hover:text-white"
          aria-label="Redo"
          title="Redo"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
