import problemPhoto from "@/assets/landing/problem.png"
import { Reveal } from "../reveal"
import {
  Search,
  PenTool,
  RotateCcw,
  Layout,
  Palette,
  AlignLeft,
  Download,
  Sparkles,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

const visualSteps = [
  { text: "Research", icon: Search, color: "text-[#6D5EF7]", bg: "bg-[#6D5EF7]/10", border: "border-[#6D5EF7]/20", pos: "left-[-4%] sm:left-[-2%] top-[12%]", delay: 0, appearDelay: 0.2 },
  { text: "Write", icon: PenTool, color: "text-[#e24b2c]", bg: "bg-[#e24b2c]/10", border: "border-[#e24b2c]/20", pos: "left-[-8%] sm:left-[-6%] top-[48%]", delay: 1.2, appearDelay: 0.4 },
  { text: "Rewrite", icon: RotateCcw, color: "text-[#d97706]", bg: "bg-[#d97706]/10", border: "border-[#d97706]/20", pos: "left-[2%] sm:left-[4%] bottom-[6%]", delay: 2.5, appearDelay: 0.6 },
  { text: "Structure", icon: Layout, color: "text-[#4F8EF7]", bg: "bg-[#4F8EF7]/10", border: "border-[#4F8EF7]/20", pos: "left-[50%] top-[-4%]", delay: 0.8, appearDelay: 0.8 },
  { text: "Design", icon: Palette, color: "text-[#db2777]", bg: "bg-[#db2777]/10", border: "border-[#db2777]/20", pos: "right-[-4%] sm:right-[-2%] top-[18%]", delay: 1.7, appearDelay: 1.0 },
  { text: "Format", icon: AlignLeft, color: "text-[#0891b2]", bg: "bg-[#0891b2]/10", border: "border-[#0891b2]/20", pos: "right-[-8%] sm:right-[-6%] top-[54%]", delay: 3.1, appearDelay: 1.2 },
  { text: "Export", icon: Download, color: "text-[#16a34a]", bg: "bg-[#16a34a]/10", border: "border-[#16a34a]/20", pos: "right-[4%] sm:right-[6%] bottom-[4%]", delay: 2.1, appearDelay: 1.4 },
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
      { threshold: 0.4 }
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
              Your idea isn't the problem.<br />The process is.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#5c574e]">
              You already know what you want to say. But turning it into a post means navigating an exhausting maze of researching, writing, structuring, designing, and formatting.
            </p>
            <p className="mt-8 text-xl font-semibold leading-snug text-[#1c1a17]">
              By the time you're done, you've forgotten why you started. That's not content creation. That's a second job.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Interactive Overload Visual */}
        <Reveal delay={150}>
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto flex w-full max-w-4xl items-center justify-center py-12 lg:min-h-[46rem]"
          >
            <style>{`
              @keyframes float-center {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
              @keyframes float-badge {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
            `}</style>

            {/* Background Atmosphere Glow */}
            <div 
              className={`absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#6D5EF7]/10 to-[#e24b2c]/10 blur-[100px] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Dotted & Orbital SVG Background */}
            <svg 
              className={`pointer-events-none absolute inset-0 h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-95'}`} 
              viewBox="0 0 800 600" 
              preserveAspectRatio="xMidYMid meet"
              style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
            >
              <defs>
                <pattern id="problem-dot-pattern" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#1c1a17" fillOpacity="0.14" />
                </pattern>
                <radialGradient id="problem-mask-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="65%" stopColor="white" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="problem-dot-mask">
                  <rect width="100%" height="100%" fill="url(#problem-mask-gradient)" />
                </mask>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#problem-dot-pattern)" mask="url(#problem-dot-mask)" />
              
              <g transform="translate(400, 300)">
                <ellipse rx="260" ry="260" fill="none" stroke="#1c1a17" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="4 8" />
                <ellipse rx="330" ry="330" fill="none" stroke="#6D5EF7" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="5 10" />
                
                <path d="M -190 -190 Q -60 -280 120 -240" fill="none" stroke="#e24b2c" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="4 6" />
                <path d="M 240 -160 Q 330 0 260 210" fill="none" stroke="#6D5EF7" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 6" />
                <path d="M 160 260 Q 0 340 -210 210" fill="none" stroke="#4F8EF7" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 5" />
                
                <circle cx="-190" cy="-190" r="4" fill="#e24b2c" className="opacity-90" />
                <circle cx="120" cy="-240" r="5" fill="#6D5EF7" className="opacity-70" />
                <circle cx="260" cy="210" r="3.5" fill="#1c1a17" className="opacity-50" />
                <circle cx="-210" cy="210" r="4.5" fill="#4F8EF7" className="opacity-80" />
              </g>
            </svg>

            {/* Central 3D Pop-Out Composition */}
            <div 
              className={`relative z-10 mx-auto flex w-full max-w-[24rem] items-center justify-center sm:max-w-[28rem] lg:max-w-[30rem] transition-all duration-[1200ms] ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
              style={{ 
                animation: isVisible ? "float-center 7s ease-in-out infinite" : "none",
                transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`
              }}
            >
              <div className="relative aspect-square w-[85%] rounded-full border border-white/80 bg-gradient-to-b from-[#faf7f2] via-[#f5efe4] to-[#e8dfd2] p-3 shadow-[0_30px_60px_-15px_rgba(28,26,23,0.22)] backdrop-blur-md">
                <div className="h-full w-full rounded-full border border-[#1c1a17]/10 bg-gradient-to-tr from-[#6D5EF7]/10 via-transparent to-[#e24b2c]/10" />
              </div>

              <div className="absolute -bottom-4 left-1/2 w-[95%] -translate-x-1/2 sm:w-[92%]">
                <img
                  src={problemPhoto}
                  alt="A content creator feeling overwhelmed by the creation process"
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain drop-shadow-[0_20px_35px_rgba(28,26,23,0.25)]"
                />
              </div>

              <div 
                className={`absolute -bottom-2 left-[8%] z-20 flex items-center gap-2 rounded-full border border-white/40 bg-[#1c1a17] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#faf7f2] shadow-[0_12px_24px_-4px_rgba(28,26,23,0.4)] backdrop-blur-md transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
              >
                <Sparkles className="size-4 text-[#e24b2c]" />
                One idea
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
                    className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
                    }`}
                    style={{ transitionDelay: isVisible ? `${step.appearDelay}s` : '0s' }}
                  >
                    <div 
                      className="group pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-[0_8px_24px_-8px_rgba(28,26,23,0.18)] backdrop-blur-md transition-colors duration-300 hover:bg-white hover:shadow-[0_16px_32px_-8px_rgba(28,26,23,0.25)]"
                      style={{ animation: isVisible ? `float-badge 5s ease-in-out infinite ${step.delay}s` : 'none' }}
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
                  className={`absolute z-20 ${
                    [
                      "left-[0%] top-[6%]",
                      "left-[-6%] top-[50%]",
                      "left-[2%] bottom-[2%]",
                      "right-[-2%] top-[12%]",
                      "right-[-6%] top-[56%]",
                    ][i]
                  }`}
                >
                  <div 
                    className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-6"
                    }`}
                    style={{ transitionDelay: isVisible ? `${step.appearDelay}s` : '0s' }}
                  >
                    <div 
                      className="pointer-events-auto flex items-center gap-2 rounded-xl border border-white/90 bg-white/90 px-3 py-2 shadow-[0_4px_16px_-4px_rgba(28,26,23,0.15)] backdrop-blur-md"
                      style={{ animation: isVisible ? `float-badge 5s ease-in-out infinite ${step.delay}s` : 'none' }}
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

