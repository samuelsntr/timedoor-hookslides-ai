import problemPhoto from "@/assets/landing/problem3.png"
import { Reveal } from "../reveal"
import {
  Search,
  PenTool,
  RotateCcw,
  Layout,
  Palette,
  AlignLeft,
  Download,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

const visualSteps = [
  { text: "Research", icon: Search, color: "text-[#6D5EF7]", bg: "bg-[#6D5EF7]/10", border: "border-[#6D5EF7]/30", pos: "left-[-4%] sm:left-[-2%] top-[12%]", delay: 0.1, appearDelay: 0.1 },
  { text: "Write", icon: PenTool, color: "text-[#e24b2c]", bg: "bg-[#e24b2c]/10", border: "border-[#e24b2c]/30", pos: "left-[-8%] sm:left-[-6%] top-[48%]", delay: 0.5, appearDelay: 0.2 },
  { text: "Rewrite", icon: RotateCcw, color: "text-[#d97706]", bg: "bg-[#d97706]/10", border: "border-[#d97706]/30", pos: "left-[2%] sm:left-[4%] bottom-[6%]", delay: 0.9, appearDelay: 0.3 },
  { text: "Structure", icon: Layout, color: "text-[#4F8EF7]", bg: "bg-[#4F8EF7]/10", border: "border-[#4F8EF7]/30", pos: "left-[50%] top-[-4%]", delay: 0.3, appearDelay: 0.15 },
  { text: "Design", icon: Palette, color: "text-[#db2777]", bg: "bg-[#db2777]/10", border: "border-[#db2777]/30", pos: "right-[-4%] sm:right-[-2%] top-[18%]", delay: 0.7, appearDelay: 0.25 },
  { text: "Format", icon: AlignLeft, color: "text-[#0891b2]", bg: "bg-[#0891b2]/10", border: "border-[#0891b2]/30", pos: "right-[-8%] sm:right-[-6%] top-[54%]", delay: 1.1, appearDelay: 0.35 },
  { text: "Export", icon: Download, color: "text-[#16a34a]", bg: "bg-[#16a34a]/10", border: "border-[#16a34a]/30", pos: "right-[4%] sm:right-[6%] bottom-[4%]", delay: 1.3, appearDelay: 0.4 },
]

function Problem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 })

  return (
    <section className="overflow-hidden border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[4fr_6fr] lg:gap-8">
        {/* Left Column: Focused Copy */}
        <div className="relative z-20">
          <Reveal>
            <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-[#1c1a17] sm:text-5xl lg:text-[3.5rem]">
              Your idea isn't the problem. The process is.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#5c574e]">
              You have brilliant ideas, but turning them into polished, swipeable posts takes forever. Staring at a blank canvas shouldn't be the hardest part of content creation.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Animated Problem Overload Visual */}
        <Reveal delay={100}>
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto flex w-full max-w-4xl items-center justify-center py-12 lg:min-h-[46rem]"
          >
            <style>{`
              @keyframes dash-flow {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes float-center {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-8px) scale(1.01); }
              }
              @keyframes float-badge {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-7px); }
              }
              @keyframes danger-pulse {
                0%, 100% { opacity: 0.35; transform: translate(-50%, -50%) scale(0.96); }
                50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.06); }
              }
              @keyframes ping-slow {
                0% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.4); opacity: 0; }
                100% { transform: scale(1); opacity: 0; }
              }
            `}</style>

            {/* Glowing Problem Atmosphere Ring */}
            <div
              className={`absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#e24b2c]/20 via-[#d97706]/15 to-[#db2777]/15 blur-[90px] transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{
                animation: isVisible ? "danger-pulse 6s ease-in-out infinite" : "none",
              }}
            />

            {/* Animated SVG Chaos Connector Web */}
            <svg
              className={`pointer-events-none absolute inset-0 h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] transition-all duration-1000 ease-out ${
                isVisible ? "opacity-90 scale-100" : "opacity-0 scale-95"
              }`}
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid meet"
              style={{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` }}
            >
              <defs>
                <pattern id="problem-dot-pattern" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#1c1a17" fillOpacity="0.12" />
                </pattern>
                <radialGradient id="problem-mask-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="70%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="problem-dot-mask">
                  <rect width="100%" height="100%" fill="url(#problem-mask-gradient)" />
                </mask>
              </defs>

              <rect width="100%" height="100%" fill="url(#problem-dot-pattern)" mask="url(#problem-dot-mask)" />

              <g transform="translate(400, 300)">
                {/* Orbit Rings */}
                <ellipse rx="250" ry="250" fill="none" stroke="#e24b2c" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="6 8" />
                <ellipse rx="320" ry="320" fill="none" stroke="#d97706" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="4 10" />

                {/* Animated Chaos Flow Lines */}
                <path
                  d="M -190 -190 Q -60 -280 120 -240"
                  fill="none"
                  stroke="#e24b2c"
                  strokeOpacity="0.5"
                  strokeWidth="2"
                  strokeDasharray="5 7"
                  style={{ animation: "dash-flow 2s linear infinite" }}
                />
                <path
                  d="M 240 -160 Q 330 0 260 210"
                  fill="none"
                  stroke="#db2777"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  style={{ animation: "dash-flow 2.5s linear infinite" }}
                />
                <path
                  d="M 160 260 Q 0 340 -210 210"
                  fill="none"
                  stroke="#6D5EF7"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  style={{ animation: "dash-flow 3s linear infinite" }}
                />

                {/* Alert Warning Node Dots */}
                <circle cx="-190" cy="-190" r="4.5" fill="#e24b2c" className="animate-pulse" />
                <circle cx="120" cy="-240" r="5" fill="#d97706" className="animate-pulse" />
                <circle cx="260" cy="210" r="4" fill="#db2777" />
                <circle cx="-210" cy="210" r="5" fill="#6D5EF7" className="animate-pulse" />
              </g>
            </svg>

            {/* Central Creator Image Composition */}
            <div
              className={`relative z-10 mx-auto flex w-full max-w-[24rem] items-center justify-center sm:max-w-[28rem] lg:max-w-[30rem] transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
              }`}
              style={{
                animation: isVisible ? "float-center 6s ease-in-out infinite" : "none",
                transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
              }}
            >
              {/* Outer Pulsing Stress Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#e24b2c]/30 animate-[ping-slow_4s_ease-in-out_infinite]" />

              <div className="relative aspect-square w-[85%] rounded-full border-2 border-[#e24b2c]/25 bg-gradient-to-b from-[#faf7f2] via-[#f7ebd8] to-[#e8dfd2] p-3 shadow-[0_30px_60px_-15px_rgba(226,75,44,0.25)] backdrop-blur-md">
                <div className="h-full w-full rounded-full border border-[#e24b2c]/15 bg-gradient-to-tr from-[#e24b2c]/10 via-transparent to-[#d97706]/10" />
              </div>

              {/* Creator Photo */}
              <div className="absolute -bottom-4 left-1/2 w-[95%] -translate-x-1/2 sm:w-[92%]">
                <img
                  src={problemPhoto}
                  alt="Content creator overwhelmed by manual design work"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain drop-shadow-[0_22px_35px_rgba(226,75,44,0.25)]"
                />
              </div>

              {/* High Impact Problem Headline Badge */}
              <div
                className={`absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-[#e24b2c]/40 bg-[#1c1a17] px-4 py-2 text-xs font-bold text-[#faf7f2] shadow-[0_16px_32px_-6px_rgba(28,26,23,0.5)] backdrop-blur-md transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              >
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e24b2c] opacity-75"></span>
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#e24b2c]"></span>
                </span>
                <span className="uppercase tracking-wider text-[#e24b2c]">Problem:</span>
                <span className="font-medium text-white">7 Manual Steps = Hours Wasted</span>
              </div>
            </div>

            {/* Orbiting Staggered Badges - Desktop & Tablet */}
            <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block">
              {visualSteps.map((step) => (
                <div
                  key={step.text}
                  className={`absolute z-20 ${step.pos}`}
                  style={{
                    transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <div
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
                      }`}
                    style={{ transitionDelay: isVisible ? `${step.appearDelay}s` : '0s' }}
                  >
                    <div
                      className="group pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/90 bg-white/95 px-4 py-3 shadow-[0_12px_28px_-8px_rgba(28,26,23,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_18px_36px_-8px_rgba(226,75,44,0.3)]"
                      style={{ animation: isVisible ? `float-badge 4.5s ease-in-out infinite ${step.delay}s` : 'none' }}
                    >
                      <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${step.bg} ${step.border} border`}>
                          <step.icon size={18} className={step.color} strokeWidth={2.5} />
                        </div>
                        <span className="text-[14px] font-bold tracking-tight text-[#1c1a17]">{step.text}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Orbiting Staggered Badges - Mobile */}
            <div className="pointer-events-none absolute inset-0 z-20 sm:hidden">
              {visualSteps.slice(0, 5).map((step, i) => (
                <div
                  key={step.text}
                  className={`absolute z-20 ${[
                    "left-[0%] top-[6%]",
                    "left-[-6%] top-[50%]",
                    "left-[2%] bottom-[2%]",
                    "right-[-2%] top-[12%]",
                    "right-[-6%] top-[56%]",
                  ][i]
                    }`}
                >
                  <div
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-6"
                      }`}
                    style={{ transitionDelay: isVisible ? `${step.appearDelay}s` : '0s' }}
                  >
                    <div
                      className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/90 bg-white/95 px-3 py-2 shadow-md backdrop-blur-md"
                      style={{ animation: isVisible ? `float-badge 4.5s ease-in-out infinite ${step.delay}s` : 'none' }}
                    >
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${step.bg} ${step.border} border`}>
                        <step.icon size={14} className={step.color} strokeWidth={2.5} />
                      </div>
                      <span className="text-[12px] font-bold tracking-tight text-[#1c1a17]">{step.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export { Problem }
