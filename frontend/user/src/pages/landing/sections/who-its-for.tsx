import { ArrowRight, Bookmark, Layers, Sparkles, TrendingUp, Zap } from "lucide-react"

import creatorPhoto from "@/assets/landing/audience-creator-photo.png"
import founderPhoto from "@/assets/landing/audience-founder-photo.png"
import marketerPhoto from "@/assets/landing/audience-marketer-photo.png"

import { Reveal } from "../reveal"

const audiences = [
  {
    badge: "01 · Creators",
    tag: "Viral Output",
    name: "Content Creators",
    headline: "Grow your audience faster.",
    body: "Turn your daily thoughts into viral carousels without touching a design tool or staring at a blank canvas.",
    photo: creatorPhoto,
    alt: "Content Creators illustration",
    icon: TrendingUp,
    templateStyle: "bold",
    cardClasses: "bg-white text-[#1c1a17] border border-[#e4ddd0] shadow-[0_12px_36px_-15px_rgba(28,26,23,0.08)]",
    hoverClasses: "hover:-translate-y-2.5 hover:shadow-[0_28px_60px_-15px_rgba(226,75,44,0.25)] hover:border-[#e24b2c]/40",
    badgeClasses: "bg-[#e24b2c]/10 text-[#e24b2c] border border-[#e24b2c]/20",
    imageBg: "bg-gradient-to-b from-[#faf7f2] to-[#faede8]",
    accentColor: "#e24b2c",
    pillClasses: "bg-[#e24b2c] text-[#fffdf9] group-hover:bg-[#c93d21]",
    activeSlide: 0,
  },
  {
    badge: "02 · Founders",
    tag: "Authority Engine",
    name: "Founders & Leaders",
    headline: "Build industry authority.",
    body: "Turn your deep expertise and company updates into high-converting, professional thought leadership carousels in minutes.",
    photo: founderPhoto,
    alt: "Founders & Leaders illustration",
    icon: Zap,
    templateStyle: "dark",
    cardClasses: "bg-[#1c1a17] text-[#faf7f2] border border-white/10 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.3)]",
    hoverClasses: "hover:-translate-y-2.5 hover:shadow-[0_28px_60px_-15px_rgba(109,94,247,0.35)] hover:border-[#6D5EF7]/50",
    badgeClasses: "bg-[#6D5EF7]/20 text-[#A5B4FC] border border-[#6D5EF7]/30",
    imageBg: "bg-gradient-to-b from-[#2a2622] to-[#201d19]",
    accentColor: "#6D5EF7",
    pillClasses: "bg-[#6D5EF7] text-white group-hover:bg-[#5b4be3]",
    activeSlide: 1,
  },
  {
    badge: "03 · Marketers",
    tag: "Multi-Channel Scale",
    name: "Marketers & Teams",
    headline: "Fill your content calendar.",
    body: "Repurpose long-form articles, blogs, and videos into weeks of engaging social carousels on autopilot.",
    photo: marketerPhoto,
    alt: "Marketers & Teams illustration",
    icon: Layers,
    templateStyle: "editorial",
    cardClasses: "bg-[#faf7f2] text-[#1c1a17] border border-[#e4ddd0] shadow-[0_12px_36px_-15px_rgba(28,26,23,0.08)]",
    hoverClasses: "hover:-translate-y-2.5 hover:shadow-[0_28px_60px_-15px_rgba(79,142,247,0.25)] hover:border-[#4F8EF7]/40",
    badgeClasses: "bg-[#4F8EF7]/10 text-[#4F8EF7] border border-[#4F8EF7]/20",
    imageBg: "bg-gradient-to-b from-[#ffffff] to-[#f1ece3]",
    accentColor: "#4F8EF7",
    pillClasses: "bg-[#1c1a17] text-[#faf7f2] group-hover:bg-[#e24b2c]",
    activeSlide: 2,
  },
]

function WhoItsFor() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e4ddd0] bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e24b2c] shadow-sm">
                <Sparkles className="size-3.5" />
                Tailored Carousels
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-[#1c1a17] sm:text-4xl lg:text-5xl">
                Built for teams and creators who need to post consistently.
              </h2>
              <p className="mt-4 text-lg text-[#5c574e]">
                Scale your content output without hiring an agency or burning your weekends.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-[#e4ddd0] bg-[#faf7f2] p-4 text-left shadow-sm md:block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e]">Slide Format</span>
              <p className="mt-1 font-[Fraunces,serif] text-base font-semibold text-[#1c1a17]">
                Instagram & LinkedIn Carousels
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === 0 ? "w-6 bg-[#e24b2c]" : "w-2 bg-[#1c1a17]/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Carousel-Styled Audience Cards Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {audiences.map((item, index) => {
            const Icon = item.icon
            const isDark = item.templateStyle === "dark"

            return (
              <Reveal key={item.name} delay={index * 150}>
                <div
                  className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${item.cardClasses} ${item.hoverClasses}`}
                >
                  {/* Top Story / Slide Progress Indicator */}
                  <div className="mb-6 flex items-center gap-1.5" aria-hidden="true">
                    {Array.from({ length: 6 }).map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          dotIndex === item.activeSlide
                            ? "flex-[2] bg-current"
                            : "flex-1 opacity-20 bg-current"
                        }`}
                        style={{
                          color: dotIndex === item.activeSlide ? item.accentColor : undefined,
                        }}
                      />
                    ))}
                  </div>

                  {/* Slide Meta Bar */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${item.badgeClasses}`}>
                      <Icon className="size-3.5" />
                      {item.tag}
                    </span>

                    <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-white/60' : 'text-[#5c574e]/70'}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Framed Carousel Illustration Container */}
                  <div className={`relative mb-6 flex aspect-[16/11] w-full items-center justify-center overflow-hidden rounded-[1.5rem] border ${isDark ? 'border-white/10' : 'border-black/5'} ${item.imageBg}`}>
                    <img
                      src={item.photo}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    
                    {/* Micro Instagram Card Tag */}
                    <div className={`absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md shadow-sm ${
                      isDark ? 'bg-black/60 text-white/90 border border-white/15' : 'bg-white/90 text-[#1c1a17] border border-black/5'
                    }`}>
                      <Bookmark className="size-3 text-[#e24b2c]" />
                      <span>Ready to post</span>
                    </div>
                  </div>

                  {/* Slide Content */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className={`font-[Fraunces,serif] text-2xl font-bold tracking-tight transition-colors ${
                        isDark ? 'text-white group-hover:text-[#A5B4FC]' : 'text-[#1c1a17] group-hover:text-[#e24b2c]'
                      }`}>
                        {item.name}
                      </h3>
                    </div>

                    <p className={`mt-2 text-sm font-semibold tracking-wide ${
                      isDark ? 'text-white/90' : 'text-[#e24b2c]'
                    }`}>
                      {item.headline}
                    </p>

                    <p className={`mt-3 text-[14px] leading-relaxed ${
                      isDark ? 'text-white/70' : 'text-[#5c574e]'
                    }`}>
                      {item.body}
                    </p>

                    {/* Bottom Action Pill & Footer */}
                    <div className="mt-6 flex items-center justify-between border-t pt-5 transition-colors border-current/10">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-[#5c574e]/60'}`}>
                        Slide 0{index + 1} of 06
                      </span>

                      <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm transition-all duration-300 group-hover:gap-2.5 ${item.pillClasses}`}>
                        <span>Create slide</span>
                        <ArrowRight className="size-3.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { WhoItsFor }
