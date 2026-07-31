"use client"

import { useEffect, useRef } from "react"
import { createPixelReveal } from "landing-effects"

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.width
    const H = canvas.height
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw the "app mockup" programmatically
    ctx.fillStyle = "#12141c"
    ctx.fillRect(0, 0, W, H)

    // Toolbar bar at top
    ctx.fillStyle = "#1a1d2a"
    ctx.fillRect(0, 0, W, 40)

    // Toolbar buttons
    const tools = [
      { icon: "▭", x: 20 },
      { icon: "○", x: 55 },
      { icon: "◇", x: 90 },
      { icon: "↗", x: 125 },
      { icon: "✎", x: 160 },
      { icon: "T", x: 195 },
    ]
    ctx.font = "13px system-ui"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    tools.forEach(({ icon, x }) => {
      ctx.fillStyle = "rgba(255,255,255,0.15)"
      ctx.beginPath()
      ctx.roundRect(x - 13, 10, 26, 20, 4)
      ctx.fill()
      ctx.fillStyle = "rgba(255,255,255,0.5)"
      ctx.fillText(icon, x, 21)
    })

    // Grid dots
    ctx.fillStyle = "rgba(255,255,255,0.04)"
    for (let gx = 20; gx < W; gx += 24) {
      for (let gy = 60; gy < H; gy += 24) {
        ctx.beginPath()
        ctx.arc(gx, gy, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Shape 1: Rectangle with label
    ctx.strokeStyle = "rgba(98,177,247,0.75)"
    ctx.lineWidth = 1.5
    ctx.fillStyle = "rgba(30,70,110,0.35)"
    ctx.beginPath()
    ctx.roundRect(40, 65, 155, 90, 5)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(98,177,247,0.6)"
    ctx.font = "11px system-ui"
    ctx.textAlign = "left"
    ctx.fillText("User Auth", 54, 116)

    // Shape 2: Ellipse
    ctx.strokeStyle = "rgba(167,139,250,0.75)"
    ctx.fillStyle = "rgba(76,29,149,0.3)"
    ctx.beginPath()
    ctx.ellipse(310, 110, 90, 60, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(167,139,250,0.7)"
    ctx.font = "11px system-ui"
    ctx.textAlign = "center"
    ctx.fillText("API Layer", 310, 115)

    // Arrow between rect and ellipse
    ctx.strokeStyle = "rgba(200,200,200,0.4)"
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(196, 110)
    ctx.lineTo(218, 110)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(212, 104)
    ctx.lineTo(220, 110)
    ctx.lineTo(212, 116)
    ctx.stroke()

    // Shape 3: Diamond
    ctx.strokeStyle = "rgba(74,222,128,0.65)"
    ctx.fillStyle = "rgba(20,83,45,0.3)"
    ctx.lineWidth = 1.5
    const dx = 490, dy = 110, dw = 90, dh = 70
    ctx.beginPath()
    ctx.moveTo(dx, dy - dh / 2)
    ctx.lineTo(dx + dw / 2, dy)
    ctx.lineTo(dx, dy + dh / 2)
    ctx.lineTo(dx - dw / 2, dy)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "rgba(74,222,128,0.65)"
    ctx.font = "10px system-ui"
    ctx.textAlign = "center"
    ctx.fillText("Cache?", dx, dy + 4)

    // Arrow from ellipse to diamond
    ctx.strokeStyle = "rgba(200,200,200,0.4)"
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(401, 110)
    ctx.lineTo(443, 110)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(437, 104)
    ctx.lineTo(445, 110)
    ctx.lineTo(437, 116)
    ctx.stroke()

    // Pencil stroke (freehand)
    ctx.strokeStyle = "rgba(251,191,36,0.5)"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.beginPath()
    const pts: [number, number][] = [
      [60, 200], [75, 190], [90, 205], [108, 185], [125, 210],
      [140, 195], [158, 215], [172, 200], [185, 220],
    ]
    ctx.moveTo(pts[0]![0], pts[0]![1])
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i]![0], pts[i]![1])
    }
    ctx.stroke()

    // Text label
    ctx.fillStyle = "rgba(255,255,255,0.2)"
    ctx.font = "12px system-ui"
    ctx.textAlign = "left"
    ctx.fillText("Sketch notes here...", 60, 250)

    // Remote cursor 1 — blue
    ctx.fillStyle = "rgba(98,177,247,0.9)"
    ctx.beginPath()
    ctx.moveTo(350, 200)
    ctx.lineTo(356, 215)
    ctx.lineTo(352, 213)
    ctx.lineTo(350, 220)
    ctx.lineTo(348, 213)
    ctx.lineTo(344, 215)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = "rgba(98,177,247,1)"
    ctx.font = "9px system-ui"
    ctx.textAlign = "left"
    ctx.fillText("Alice", 360, 215)

    // Remote cursor 2 — purple
    ctx.fillStyle = "rgba(167,139,250,0.9)"
    ctx.beginPath()
    ctx.moveTo(510, 200)
    ctx.lineTo(516, 215)
    ctx.lineTo(512, 213)
    ctx.lineTo(510, 220)
    ctx.lineTo(508, 213)
    ctx.lineTo(504, 215)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = "rgba(167,139,250,1)"
    ctx.font = "9px system-ui"
    ctx.textAlign = "left"
    ctx.fillText("Bob", 520, 215)

    // Status bar at bottom
    ctx.fillStyle = "#151720"
    ctx.fillRect(0, H - 28, W, 28)
    ctx.fillStyle = "rgba(255,255,255,0.15)"
    ctx.font = "10px system-ui"
    ctx.textAlign = "left"
    ctx.fillText("2 collaborators · Auto-saved", 12, H - 11)

    // Now run pixel reveal on the drawn canvas
    const cleanup = createPixelReveal({
      canvas,
      imageSrc: canvas.toDataURL(),
      blockSize: 10,
      pixelsPerFrame: 150,
      glitchRegion: 0.45,
      delay: 400,
    })

    return cleanup
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={620}
      height={280}
      className="w-full rounded-xl"
      style={{ imageRendering: "pixelated" }}
    />
  )
}
