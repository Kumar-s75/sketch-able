"use client"

import { useEffect, useRef } from "react"

function RealtimeSVG() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <style>{`
        .rt-rect { stroke-dasharray: 340; stroke-dashoffset: 340; animation: drawLine 1.2s ease forwards 0.2s; }
        .rt-ellipse { stroke-dasharray: 280; stroke-dashoffset: 280; animation: drawLine 1.2s ease forwards 0.6s; }
        .rt-arrow { stroke-dasharray: 80; stroke-dashoffset: 80; animation: drawLine 0.6s ease forwards 1.2s; }
        .rt-cursor1 { animation: moveCursor1 3s ease-in-out infinite 1.4s; }
        .rt-cursor2 { animation: moveCursor2 3s ease-in-out infinite 1.4s; }
        .rt-label1 { opacity: 0; animation: fadeIn 0.4s ease forwards 1.4s; }
        .rt-label2 { opacity: 0; animation: fadeIn 0.4s ease forwards 1.6s; }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes moveCursor1 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(8px, -6px); }
        }
        @keyframes moveCursor2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-6px, 8px); }
        }
      `}</style>

      {/* Grid dots */}
      {[30,54,78,102,126].map(x =>
        [20,44,68,92].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={0.8} fill="rgba(255,255,255,0.08)" />
        ))
      )}

      {/* Rect */}
      <rect className="rt-rect" x="10" y="14" width="55" height="36" rx="3"
        stroke="rgba(98,177,247,0.7)" strokeWidth="1.5" fill="rgba(30,70,110,0.25)" />

      {/* Ellipse */}
      <ellipse className="rt-ellipse" cx="118" cy="32" rx="30" ry="20"
        stroke="rgba(167,139,250,0.7)" strokeWidth="1.5" fill="rgba(76,29,149,0.2)" />

      {/* Arrow */}
      <line className="rt-arrow" x1="67" y1="32" x2="86" y2="32"
        stroke="rgba(200,200,200,0.5)" strokeWidth="1.5" />
      <path className="rt-arrow" d="M82 27 L88 32 L82 37"
        stroke="rgba(200,200,200,0.5)" strokeWidth="1.5" fill="none" />

      {/* Cursor 1 */}
      <g className="rt-cursor1" style={{ transformOrigin: "28px 68px" }}>
        <path d="M25 65 L28 74 L26.5 72.5 L25 77 L23.5 72.5 L22 74 Z"
          fill="rgba(98,177,247,0.95)" />
      </g>
      <text className="rt-label1" x="32" y="76" fill="rgba(98,177,247,1)" fontSize="7" fontFamily="system-ui">you</text>

      {/* Cursor 2 */}
      <g className="rt-cursor2" style={{ transformOrigin: "115px 72px" }}>
        <path d="M112 69 L115 78 L113.5 76.5 L112 81 L110.5 76.5 L109 78 Z"
          fill="rgba(167,139,250,0.95)" />
      </g>
      <text className="rt-label2" x="119" y="80" fill="rgba(167,139,250,1)" fontSize="7" fontFamily="system-ui">teammate</text>
    </svg>
  )
}

function ShapesSVG() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <style>{`
        .sh-r { stroke-dasharray: 200; stroke-dashoffset: 200; animation: d 0.7s ease forwards 0.1s; }
        .sh-e { stroke-dasharray: 250; stroke-dashoffset: 250; animation: d 0.8s ease forwards 0.5s; }
        .sh-d { stroke-dasharray: 200; stroke-dashoffset: 200; animation: d 0.7s ease forwards 0.9s; }
        .sh-a { stroke-dasharray: 120; stroke-dashoffset: 120; animation: d 0.5s ease forwards 1.3s; }
        .sh-p { stroke-dasharray: 300; stroke-dashoffset: 300; animation: d 1s ease forwards 1.6s; }
        .sh-t { opacity: 0; animation: fi 0.4s ease forwards 2.2s; }
        @keyframes d { to { stroke-dashoffset: 0; } }
        @keyframes fi { to { opacity: 1; } }
      `}</style>

      {/* Rect */}
      <rect className="sh-r" x="8" y="10" width="40" height="28" rx="2"
        stroke="rgba(98,177,247,0.7)" strokeWidth="1.5" fill="rgba(30,70,110,0.2)" />

      {/* Ellipse */}
      <ellipse className="sh-e" cx="90" cy="24" rx="25" ry="18"
        stroke="rgba(167,139,250,0.7)" strokeWidth="1.5" fill="rgba(76,29,149,0.2)" />

      {/* Diamond */}
      <path className="sh-d" d="M140 10 L158 24 L140 38 L122 24 Z"
        stroke="rgba(74,222,128,0.65)" strokeWidth="1.5" fill="rgba(20,83,45,0.2)" />

      {/* Arrow */}
      <path className="sh-a" d="M18 55 L55 55 M49 50 L56 55 L49 60"
        stroke="rgba(251,191,36,0.7)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Pencil stroke */}
      <path className="sh-p"
        d="M8 80 C18 72, 26 88, 36 78 S52 70, 60 80 S76 90, 84 80 S96 72, 106 82"
        stroke="rgba(251,146,60,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Text */}
      <text className="sh-t" x="116" y="58" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="system-ui">T</text>
      <text className="sh-t" x="126" y="58" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="system-ui">ext</text>
    </svg>
  )
}

function RoomsSVG() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <style>{`
        .rm-node { opacity: 0; animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .rm-n1 { animation-delay: 0.1s; }
        .rm-n2 { animation-delay: 0.4s; }
        .rm-n3 { animation-delay: 0.7s; }
        .rm-n4 { animation-delay: 1.0s; }
        .rm-line { stroke-dasharray: 80; stroke-dashoffset: 80; animation: dl 0.5s ease forwards; }
        .rm-l1 { animation-delay: 0.5s; }
        .rm-l2 { animation-delay: 0.8s; }
        .rm-l3 { animation-delay: 1.1s; }
        .rm-pulse { animation: pulse 2s ease-in-out infinite; transform-origin: center; }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes dl { to { stroke-dashoffset: 0; } }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; r: 28; }
          50% { opacity: 0.15; r: 34; }
        }
      `}</style>

      {/* Central pulse */}
      <circle className="rm-pulse" cx="80" cy="50" r="28" fill="rgba(99,102,241,0.15)" stroke="none" />

      {/* Central node */}
      <g className="rm-node rm-n1">
        <circle cx="80" cy="50" r="14" fill="rgba(99,102,241,0.3)" stroke="rgba(99,102,241,0.8)" strokeWidth="1.5" />
        <text x="80" y="54" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="system-ui">room</text>
      </g>

      {/* Lines */}
      <line className="rm-line rm-l1" x1="80" y1="36" x2="80" y2="16" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <line className="rm-line rm-l2" x1="66" y1="60" x2="40" y2="76" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <line className="rm-line rm-l3" x1="94" y1="60" x2="120" y2="76" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />

      {/* User nodes */}
      <g className="rm-node rm-n2" style={{ transformOrigin: "80px 12px" }}>
        <circle cx="80" cy="12" r="9" fill="rgba(98,177,247,0.3)" stroke="rgba(98,177,247,0.8)" strokeWidth="1.2" />
        <text x="80" y="15.5" textAnchor="middle" fill="rgba(98,177,247,1)" fontSize="7" fontFamily="system-ui">A</text>
      </g>

      <g className="rm-node rm-n3" style={{ transformOrigin: "34px 80px" }}>
        <circle cx="34" cy="80" r="9" fill="rgba(167,139,250,0.3)" stroke="rgba(167,139,250,0.8)" strokeWidth="1.2" />
        <text x="34" y="83.5" textAnchor="middle" fill="rgba(167,139,250,1)" fontSize="7" fontFamily="system-ui">B</text>
      </g>

      <g className="rm-node rm-n4" style={{ transformOrigin: "126px 80px" }}>
        <circle cx="126" cy="80" r="9" fill="rgba(74,222,128,0.3)" stroke="rgba(74,222,128,0.8)" strokeWidth="1.2" />
        <text x="126" y="83.5" textAnchor="middle" fill="rgba(74,222,128,1)" fontSize="7" fontFamily="system-ui">C</text>
      </g>
    </svg>
  )
}

const features = [
  {
    title: "Live collaboration",
    description: "See every stroke as it happens. Multiple cursors, zero lag, one shared canvas.",
    svg: <RealtimeSVG />,
    accent: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/20",
  },
  {
    title: "Rich shape library",
    description: "Rectangles, ellipses, diamonds, arrows, pencil, and text. Everything you need, nothing you don't.",
    svg: <ShapesSVG />,
    accent: "from-violet-500/10 to-violet-500/5",
    border: "border-violet-500/20",
  },
  {
    title: "Instant rooms",
    description: "Create a room in one click. Share a link. Your team is drawing together in seconds.",
    svg: <RoomsSVG />,
    accent: "from-indigo-500/10 to-indigo-500/5",
    border: "border-indigo-500/20",
  },
]

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {features.map(({ title, description, svg, accent, border }) => (
        <div
          key={title}
          className={`group rounded-2xl border ${border} bg-gradient-to-b ${accent} p-5 transition-all hover:border-opacity-60`}
        >
          <div className="mb-4 h-28">{svg}</div>
          <h3 className="text-sm font-semibold text-white/90">{title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-white/40">{description}</p>
        </div>
      ))}
    </div>
  )
}
