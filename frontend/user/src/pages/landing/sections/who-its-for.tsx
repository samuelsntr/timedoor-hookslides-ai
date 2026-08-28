import { ArrowRight, Layers, Sparkles, TrendingUp } from "lucide-react"

import creatorPhoto from "@/assets/landing/audience-creator-photo.png"
import founderPhoto from "@/assets/landing/audience-founder-photo.png"
import marketerPhoto from "@/assets/landing/audience-marketer-photo.png"

import { Reveal } from "../reveal"

const audiences = [
  {
    badge: "Template 01 · Bold",
    icon: Sparkles,
    slideNum: "01 / 06",
    name: "Content Creators",
    tagline: "Viral Hook Strategy",
    body: "Grow your audience faster. Turn your daily thoughts into viral carousels without touching a design tool.",
    photo: creatorPhoto,
    alt: "Illustration of content creators producing engaging video content",
    cardBg: "bg-gradient-to-b from-[#e24b2c] via-[#d63f21] to-[#ba3317] text-white",
    cardBorder: "border-transparent",
    hoverShadow: "hover:shadow-[0_24px_50px_-12px_rgba(226,75,44,0.45)]",
    imgWrapperBg: "bg-white/15 border-white/25",
    badgeBg: "bg-white/20 text-white border-white/30",
    numColor: "text-white/80",
    titleClass: "font-[Fraunces,serif] text-2xl font-bold text-white",
    bodyColor: "text-white/90",
    btnStyle: "bg-white text-[#e24b2c] hover:bg-[#fffdf9] shadow-sm",
    progressDots: [true, false, false, false, false, false],
    activeDotColor: "bg-white",
    inactiveDotColor: "bg-white/25",
  },
  {
    badge: "Template 03 · Structured",
    icon: TrendingUp,
    slideNum: "02 / 06",
    name: "Founders & Execs",
    tagline: "Thought Leadership",
    body: "Build authority and reach. Turn your hard-earned industry expertise into polished, branded assets in minutes.",
    photo: founderPhoto,
    alt: "Illustration of founders discussing business growth",
    cardBg: "bg-gradient-to-b from-[#1c1a17] via-[#23201c] to-[#161412] text-[#faf7f2]",
    cardBorder: "border-white/10",
    hoverShadow: "hover:shadow-[0_24px_50px_-12px_rgba(28,26,23,0.6)] hover:border-white/25",
    imgWrapperBg: "bg-white/10 border-white/15",
    badgeBg: "bg-white/10 text-[#faf7f2] border-white/20",
    numColor: "text-[#e24b2c]",
    titleClass: "font-[Fraunces,serif] text-2xl font-bold text-[#faf7f2]",
    bodyColor: "text-[#faf7f2]/80",
    btnStyle: "bg-[#e24b2c] text-white hover:bg-[#c93d21] shadow-sm",
    progressDots: [false, true, false, false, false, false],
    activeDotColor: "bg-[#e24b2c]",
    inactiveDotColor: "bg-white/20",
  },
  {
    badge: "Template 02 · Editorial",
    icon: Layers,
    slideNum: "03 / 06",
    name: "Marketers & Teams",
    tagline: "Content Repurposing",
    body: "Fill your content calendar effortlessly. Repurpose articles and videos into weeks of high-performing carousels.",
    photo: marketerPhoto,
    alt: "Illustration of marketers organizing workflows and campaigns",
    cardBg: "bg-gradient-to-b from-[#ffffff] via-[#faf7f2] to-[#f3ece0] text-[#1c1a17]",
    cardBorder: "border-[#e4ddd0]",
    hoverShadow: "hover:shadow-[0_24px_50px_-12px_rgba(109,94,247,0.25)] hover:border-[#6D5EF7]/40",
    imgWrapperBg: "bg-[#f1ece3]/80 border-[#e4ddd0]",
    badgeBg: "bg-[#f1ece3] text-[#1c1a17] border-[#e4ddd0]",
    numColor: "text-[#e24b2c]",
    titleClass: "font-[Fraunces,serif] text-2xl font-normal italic text-[#1c1a17]",
    bodyColor: "text-[#5c574e]",
    btnStyle: "bg-[#1c1a17] text-[#faf7f2] hover:bg-[#e24b2c] hover:text-white transition-colors shadow-sm",
    progressDots: [false, false, true, false, false, false],
    activeDotColor: "bg-[#e24b2c]",
    inactiveDotColor: "bg-[#1c1a17]/15",
  },
]

function WhoItsFor() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e4ddd0] bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e] shadow-sm">
              <span className="size-1.5 rounded-full bg-[#e24b2c]" aria-hidden="true" />
              Tailored For Your Goals
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-[#1c1a17] sm:text-4xl lg:text-5xl">
              Built for teams and creators who need to post consistently.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5c574e]">
              Scale your content output without hiring a designer, wrestling with Canva, or burning your weekends.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {audiences.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.name} delay={index * 150}>
                <div
                  className={`group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[2.25rem] border p-7 shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 ${item.cardBg} ${item.cardBorder} ${item.hoverShadow}`}
                >
                  {/* Top Slide Meta Header */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${item.badgeBg}`}>
                        <Icon className="size-3.5" aria-hidden="true" />
                        {item.badge}
                      </span>
                      <span className={`font-mono text-xs font-semibold ${item.numColor}`}>
                        {item.slideNum}
                      </span>
                    </div>

                    {/* Illustration Container */}
                    <div className={`relative mt-6 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border p-4 backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02] ${item.imgWrapperBg}`}>
                      <img
                        src={item.photo}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>

                    {/* Text Details */}
                    <div className="mt-6">
                      <h3 className={item.titleClass}>
                        {item.name}
                      </h3>
                      <p className={`mt-3 text-[14.5px] leading-relaxed ${item.bodyColor}`}>
                        {item.body}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Carousel Controls & Action Pill */}
                  <div className="mt-8 pt-4">
                    {/* Slide Pagination Bars */}
                    <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
                      {item.progressDots.map((isActive, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            isActive ? `${item.activeDotColor} scale-y-125` : item.inactiveDotColor
                          }`}
                        />
                      ))}
                    </div>

                    {/* Action Pill Button */}
                    <div
                      className={`flex w-full items-center justify-between rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${item.btnStyle}`}
                    >
                      <span>{item.tagline}</span>
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
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
