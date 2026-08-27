import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

import { SAMPLE_CAROUSEL } from "@/features/carousel/templates/sample-data"
import { SlideRenderer } from "@/features/carousel/templates/slide-renderer"

function Hero({ onStart }: { onStart: () => void }) {
  const [hook, context, value] = SAMPLE_CAROUSEL.slides
  const [isMounted, setIsMounted] = useState(false)
  const [isSettled, setIsSettled] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setIsSettled(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative mx-auto grid w-full max-w-7xl items-center gap-12 overflow-hidden px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      
      {/* Background Decorative Accents */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <style>{`
          @keyframes slow-float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes slow-drift {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(15px, -15px) rotate(-5deg); }
          }
          @keyframes float-breathing {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(226, 75, 44, 0.4); }
            50% { box-shadow: 0 0 20px 4px rgba(226, 75, 44, 0.15); }
          }
        `}</style>
        
        {/* Accent 1: Orange Sparkle */}
        <div 
          className={`absolute left-[52%] top-[18%] text-[#e24b2c]/20 transition-all duration-[2000ms] ease-out ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ animation: isSettled ? 'slow-float 8s ease-in-out infinite' : 'none', transitionDelay: '0.8s' }}
        >
          <Sparkles size={48} strokeWidth={1} />
        </div>
        
        {/* Accent 2: Purple Ring */}
        <div 
          className={`absolute right-[5%] top-[25%] h-24 w-24 rounded-full border-[3px] border-[#6D5EF7]/15 transition-all duration-[2000ms] ease-out ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{ animation: isSettled ? 'slow-drift 12s ease-in-out infinite reverse' : 'none', transitionDelay: '1s' }}
        />
        
        {/* Accent 3: Dotted Square */}
        <svg 
          className={`absolute bottom-[10%] left-[45%] h-32 w-32 opacity-40 transition-all duration-[2000ms] ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ animation: isSettled ? 'slow-float 10s ease-in-out infinite 1s' : 'none', transitionDelay: '1.2s' }}
          viewBox="0 0 100 100"
        >
          <pattern id="hero-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#d97706" fillOpacity="0.15" />
          </pattern>
          <rect width="100" height="100" fill="url(#hero-dots)" />
        </svg>
      </div>

      {/* Left Column: Text Content */}
      <div className="relative z-10 max-w-2xl">
        <div 
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e4ddd0] bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e] shadow-sm">
            <span className="size-1.5 rounded-full bg-[#e24b2c] shadow-[0_0_8px_rgba(226,75,44,0.6)]" aria-hidden="true" />
            Topic · Article · YouTube
          </span>
        </div>

        <h1 
          className={`mt-6 text-[2.75rem] font-semibold leading-[1.05] text-[#1c1a17] sm:text-6xl lg:text-[4.25rem] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.25s' }}
        >
          Turn your ideas into <em className="relative inline-block font-normal italic text-[#e24b2c]">
            carousels
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 8 Q 50 -2 100 8" fill="none" stroke="#e24b2c" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
            </svg>
          </em>.
        </h1>

        <p 
          className={`mt-6 max-w-xl text-lg leading-relaxed text-[#5c574e] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          Give us a topic, an article, or a video. Pick how you want to tell the story. We'll turn it into a carousel
          that's ready to post — no writing, designing, or formatting required.
        </p>

        <div 
          className={`mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0.55s' }}
        >
          <button
            type="button"
            onClick={onStart}
            className="group relative inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-[#e24b2c] px-7 text-base font-semibold text-[#fffdf9] transition-all duration-300 hover:bg-[#c93d21] hover:shadow-[0_8px_20px_rgba(226,75,44,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a17]"
            style={{ animation: isSettled ? 'glow-pulse 3s infinite' : 'none' }}
          >
            Create Your First Carousel
            <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            <div className="absolute inset-0 rounded-full border border-white/20" />
          </button>
          <p className="text-sm font-medium text-[#5c574e]">No design skills needed · Ready in minutes</p>
        </div>
      </div>

      {/* Right Column: The Fanning Hero Cards */}
      <div className="relative z-10 mx-auto mt-12 w-full max-w-md lg:mt-0 lg:max-w-none">
        
        {/* Main Stack Container (handles hover & floating) */}
        <div 
          className="group relative mx-auto aspect-4/5 w-[78%] sm:w-[68%] lg:w-[74%]"
          style={{ animation: isSettled ? 'float-breathing 6s ease-in-out infinite' : 'none' }}
        >
          
          {/* Card 3 (Left - End Slide) */}
          <div 
            className={`absolute inset-0 z-0 origin-bottom-left transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMounted 
                ? '-translate-x-[26%] -rotate-[8deg] scale-100 opacity-90' 
                : 'translate-x-0 rotate-0 scale-75 opacity-0'
            } ${isSettled ? 'group-hover:-translate-x-[36%] group-hover:-rotate-[14deg]' : ''}`}
            style={{ transitionDelay: isMounted ? '0.2s' : '0s' }}
            aria-hidden="true"
          >
            <SlideRenderer template="template_2" slide={value} index={2} className="shadow-[0_18px_50px_-20px_rgb(28_26_23/30%)] transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-20px_rgb(28_26_23/25%)]" />
          </div>
          
          {/* Card 2 (Right - Middle Slide) */}
          <div 
            className={`absolute inset-0 z-10 origin-bottom-right transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMounted 
                ? 'translate-x-[26%] rotate-[8deg] scale-100 opacity-90' 
                : 'translate-x-0 rotate-0 scale-75 opacity-0'
            } ${isSettled ? 'group-hover:translate-x-[36%] group-hover:rotate-[14deg]' : ''}`}
            style={{ transitionDelay: isMounted ? '0.3s' : '0s' }}
            aria-hidden="true"
          >
            <SlideRenderer template="template_3" slide={context} index={1} className="shadow-[0_18px_50px_-20px_rgb(28_26_23/30%)] transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-20px_rgb(28_26_23/25%)]" />
          </div>
          
          {/* Card 1 (Center - Cover Slide) */}
          <div 
            className={`relative z-20 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMounted ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-90 opacity-0'
            } ${isSettled ? 'group-hover:-translate-y-4' : ''}`}
            style={{ transitionDelay: isMounted ? '0.4s' : '0s' }}
          >
            <SlideRenderer template="template_1" slide={hook} index={0} className="shadow-[0_30px_70px_-28px_rgb(28_26_23/45%)] ring-1 ring-black/5 transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-28px_rgb(28_26_23/40%)]" />
          </div>
        </div>
        
        <p 
          className={`mt-10 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e]/70 transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '1s' }}
        >
          Real output · 6 slides · Ready to post
        </p>
      </div>
    </section>
  )
}

export { Hero }
