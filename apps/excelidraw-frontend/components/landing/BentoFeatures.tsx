"use client"

function RealtimeSVG() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
          50% { transform: translate(10px, -8px); }
        }
        @keyframes moveCursor2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-8px, 10px); }
        }
      `}</style>
      {[30,58,86,114,142,170].flatMap(x =>
        [18,42,66,90,114].map(y => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={0.8} fill="rgba(99,102,241,0.15)" />
        ))
      )}
      <rect className="rt-rect" x="14" y="18" width="66" height="44" rx="4"
        stroke="rgba(98,177,247,0.75)" strokeWidth="1.5" fill="rgba(30,70,110,0.2)" />
      <ellipse className="rt-ellipse" cx="148" cy="40" rx="36" ry="24"
        stroke="rgba(167,139,250,0.75)" strokeWidth="1.5" fill="rgba(76,29,149,0.18)" />
      <line className="rt-arrow" x1="82" y1="40" x2="108" y2="40"
        stroke="rgba(148,163,184,0.6)" strokeWidth="1.5" />
      <path className="rt-arrow" d="M103 34 L110 40 L103 46"
        stroke="rgba(148,163,184,0.6)" strokeWidth="1.5" fill="none" />
      <g className="rt-cursor1" style={{ transformOrigin: "38px 84px" }}>
        <path d="M35 80 L38 90 L36.5 88.5 L35 94 L33.5 88.5 L32 90 Z"
          fill="rgba(98,177,247,0.95)" />
      </g>
      <text className="rt-label1" x="43" y="92" fill="rgba(98,177,247,1)" fontSize="8" fontFamily="system-ui" fontWeight="500">you</text>
      <g className="rt-cursor2" style={{ transformOrigin: "148px 88px" }}>
        <path d="M145 84 L148 94 L146.5 92.5 L145 98 L143.5 92.5 L142 94 Z"
          fill="rgba(167,139,250,0.95)" />
      </g>
      <text className="rt-label2" x="153" y="96" fill="rgba(167,139,250,1)" fontSize="8" fontFamily="system-ui" fontWeight="500">teammate</text>
    </svg>
  )
}

function ShapesSVG() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
      <rect className="sh-r" x="8" y="10" width="42" height="30" rx="3"
        stroke="rgba(98,177,247,0.75)" strokeWidth="1.5" fill="rgba(30,70,110,0.15)" />
      <ellipse className="sh-e" cx="92" cy="25" rx="27" ry="19"
        stroke="rgba(167,139,250,0.75)" strokeWidth="1.5" fill="rgba(76,29,149,0.15)" />
      <path className="sh-d" d="M142 10 L160 25 L142 40 L124 25 Z"
        stroke="rgba(74,222,128,0.65)" strokeWidth="1.5" fill="rgba(20,83,45,0.15)" />
      <path className="sh-a" d="M18 58 L55 58 M49 52 L57 58 L49 64"
        stroke="rgba(251,191,36,0.75)" strokeWidth="1.5" strokeLinecap="round" />
      <path className="sh-p"
        d="M8 82 C18 74, 26 90, 36 80 S52 72, 60 82 S76 92, 84 82 S96 74, 108 84"
        stroke="rgba(251,146,60,0.65)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <text className="sh-t" x="118" y="60" fill="rgba(99,102,241,0.5)" fontSize="11" fontFamily="system-ui" fontWeight="600">T</text>
    </svg>
  )
}

function RoomsSVG() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
        .rm-pulse { animation: pulse 2.5s ease-in-out infinite; }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes dl { to { stroke-dashoffset: 0; } }
        @keyframes pulse {
          0%, 100% { r: 26; opacity: 0.5; }
          50% { r: 32; opacity: 0.12; }
        }
      `}</style>
      <circle className="rm-pulse" cx="80" cy="50" r="26" fill="rgba(99,102,241,0.12)" />
      <g className="rm-node rm-n1">
        <circle cx="80" cy="50" r="15" fill="rgba(99,102,241,0.25)" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" />
        <text x="80" y="54.5" textAnchor="middle" fill="rgba(99,102,241,1)" fontSize="8" fontFamily="system-ui" fontWeight="600">room</text>
      </g>
      <line className="rm-line rm-l1" x1="80" y1="35" x2="80" y2="14" stroke="rgba(148,163,184,0.25)" strokeWidth="1" strokeDasharray="3 3" />
      <line className="rm-line rm-l2" x1="67" y1="61" x2="40" y2="78" stroke="rgba(148,163,184,0.25)" strokeWidth="1" strokeDasharray="3 3" />
      <line className="rm-line rm-l3" x1="93" y1="61" x2="120" y2="78" stroke="rgba(148,163,184,0.25)" strokeWidth="1" strokeDasharray="3 3" />
      <g className="rm-node rm-n2" style={{ transformOrigin: "80px 10px" }}>
        <circle cx="80" cy="10" r="10" fill="rgba(98,177,247,0.25)" stroke="rgba(98,177,247,0.75)" strokeWidth="1.2" />
        <text x="80" y="13.5" textAnchor="middle" fill="rgba(98,177,247,1)" fontSize="7" fontFamily="system-ui" fontWeight="600">A</text>
      </g>
      <g className="rm-node rm-n3" style={{ transformOrigin: "34px 82px" }}>
        <circle cx="34" cy="82" r="10" fill="rgba(167,139,250,0.25)" stroke="rgba(167,139,250,0.75)" strokeWidth="1.2" />
        <text x="34" y="85.5" textAnchor="middle" fill="rgba(167,139,250,1)" fontSize="7" fontFamily="system-ui" fontWeight="600">B</text>
      </g>
      <g className="rm-node rm-n4" style={{ transformOrigin: "126px 82px" }}>
        <circle cx="126" cy="82" r="10" fill="rgba(74,222,128,0.25)" stroke="rgba(74,222,128,0.75)" strokeWidth="1.2" />
        <text x="126" y="85.5" textAnchor="middle" fill="rgba(74,222,128,1)" fontSize="7" fontFamily="system-ui" fontWeight="600">C</text>
      </g>
    </svg>
  )
}

function LinkCard() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <div className="w-full max-w-[220px]">
        <div className="flex items-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
          <span className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300 truncate">
            sketchable.app/room/<span className="font-semibold">my-team</span>
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {["Alice joined", "Bob joined", "Carol joined"].map((name, i) => (
            <div
              key={name}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2"
              style={{ opacity: 0, animation: `fadeInUp 0.4s ease forwards ${0.3 + i * 0.2}s` }}
            >
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 ${
                i === 0 ? "bg-blue-500" : i === 1 ? "bg-violet-500" : "bg-emerald-500"
              }`}>
                {name[0]}
              </div>
              <span className="text-xs text-muted-foreground">{name}</span>
              <span className="ml-auto text-[10px] text-emerald-500 dark:text-emerald-400 font-medium">✓</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const cards = [
  {
    id: "collab",
    span: "md:col-span-7",
    title: "Live collaboration",
    description: "See every stroke the moment it's drawn. Multiple cursors, zero lag, one shared canvas.",
    visual: <RealtimeSVG />,
    visualHeight: "h-44",
    accent: "border-blue-200 dark:border-blue-500/20",
    bg: "bg-gradient-to-b from-blue-50/80 to-transparent dark:from-blue-500/[0.07] dark:to-transparent",
    tag: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    tagLabel: "Real-time",
  },
  {
    id: "rooms",
    span: "md:col-span-5",
    title: "Instant rooms",
    description: "Create a room in one click. Share a URL. Your team is drawing together in seconds.",
    visual: <RoomsSVG />,
    visualHeight: "h-36",
    accent: "border-indigo-200 dark:border-indigo-500/20",
    bg: "bg-gradient-to-b from-indigo-50/80 to-transparent dark:from-indigo-500/[0.07] dark:to-transparent",
    tag: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    tagLabel: "One click",
  },
  {
    id: "shapes",
    span: "md:col-span-5",
    title: "Rich shape library",
    description: "Rectangles, ellipses, diamonds, arrows, pencil freehand, and text — all the tools you need.",
    visual: <ShapesSVG />,
    visualHeight: "h-36",
    accent: "border-violet-200 dark:border-violet-500/20",
    bg: "bg-gradient-to-b from-violet-50/80 to-transparent dark:from-violet-500/[0.07] dark:to-transparent",
    tag: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    tagLabel: "6 tools",
  },
  {
    id: "link",
    span: "md:col-span-7",
    title: "Your team is one link away",
    description: "No accounts needed for guests. Share a URL — they join instantly, start drawing immediately.",
    visual: <LinkCard />,
    visualHeight: "h-44",
    accent: "border-emerald-200 dark:border-emerald-500/20",
    bg: "bg-gradient-to-b from-emerald-50/80 to-transparent dark:from-emerald-500/[0.07] dark:to-transparent",
    tag: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    tagLabel: "No signup",
  },
]

export function BentoFeatures() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
      {cards.map(({ id, span, title, description, visual, visualHeight, accent, bg, tag, tagLabel }) => (
        <div
          key={id}
          className={`${span} group relative overflow-hidden rounded-2xl border ${accent} ${bg} p-5 transition-all duration-300 hover:shadow-md dark:hover:shadow-none`}
        >
          <div className={`${visualHeight} mb-4 w-full`}>
            {visual}
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
            </div>
            <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${tag}`}>
              {tagLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
