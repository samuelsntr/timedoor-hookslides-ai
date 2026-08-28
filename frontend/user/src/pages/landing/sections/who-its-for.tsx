import { Check, Layers, Sparkles, TrendingUp, Users } from "lucide-react"

import creatorPhoto from "@/assets/landing/audience-creator-photo.png"
import founderPhoto from "@/assets/landing/audience-founder-photo.png"
import marketerPhoto from "@/assets/landing/audience-marketer-photo.png"

import { Reveal } from "../reveal"

const audiences = [
  {
    icon: Sparkles,
    badge: "Solo Creators",
    name: "Content Creators",
    headline: "Turn thoughts into viral carousels without touching a design tool.",
    photo: creatorPhoto,
    alt: "Illustration of content creators producing engaging content",
    cardBg: "bg-gradient-to-b from-[#e24b2c] via-[#d63f21] to-[#ba3317] text-white",
    cardBorder: "border-transparent",
    hoverShadow: "hover:shadow-[0_24px_50px_-12px_rgba(226,75,44,0.45)]",
    badgeStyle: "bg-white/20 text-white border-white/30",
    imgWrapperBg: "bg-white/15 border-white/25",
    titleClass: "font-[Fraunces,serif] text-2xl font-bold text-white",
    bodyColor: "text-white/90",
    checkBg: "bg-white/25 text-white",
    highlights: [
      "No design skills required",
      "Instant viral hook generation",
      "Consistent daily publishing",
    ],
  },
  {
    icon: TrendingUp,
    badge: "Leaders & Experts",
    name: "Founders & Execs",
    headline: "Build industry authority and personal reach in minutes.",
    photo: founderPhoto,
    alt: "Illustration of founders discussing business growth",
    cardBg: "bg-gradient-to-b from-[#1c1a17] via-[#23201c] to-[#161412] text-[#faf7f2]",
    cardBorder: "border-white/10",
    hoverShadow: "hover:shadow-[0_24px_50px_-12px_rgba(28,26,23,0.6)] hover:border-white/25",
    badgeStyle: "bg-white/10 text-[#faf7f2] border-white/20",
    imgWrapperBg: "bg-white/10 border-white/15",
    titleClass: "font-[Fraunces,serif] text-2xl font-bold text-[#faf7f2]",
    bodyColor: "text-[#faf7f2]/80",
    checkBg: "bg-[#e24b2c] text-white",
    highlights: [
      "Turn notes & podcasts into slides",
      "Executive personal branding",
      "High-credibility slide layouts",
    ],
  },
  {
    icon: Layers,
    badge: "Agencies & Teams",
    name: "Marketers & Teams",
    headline: "Repurpose long-form content into weeks of carousels effortlessly.",
    photo: marketerPhoto,
    alt: "Illustration of marketers organizing workflows and campaigns",
    cardBg: "bg-gradient-to-b from-[#ffffff] via-[#faf7f2] to-[#f3ece0] text-[#1c1a17]",
    cardBorder: "border-[#e4ddd0]",
    hoverShadow: "hover:shadow-[0_24px_50px_-12px_rgba(109,94,247,0.25)] hover:border-[#e24b2c]/40",
    badgeStyle: "bg-[#f1ece3] text-[#1c1a17] border-[#e4ddd0]",
    imgWrapperBg: "bg-[#f1ece3]/80 border-[#e4ddd0]",
    titleClass: "font-[Fraunces,serif] text-2xl font-semibold text-[#1c1a17]",
    bodyColor: "text-[#5c574e]",
    checkBg: "bg-[#e24b2c] text-white",
    highlights: [
      "Blog & video content repurposing",
      "Multi-platform batch export",
      "Scale distribution without extra headcount",
    ],
  },
]

function WhoItsFor() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="text-center">
            <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-[#1c1a17] sm:text-4xl lg:text-5xl">
              Built for anyone who needs to post consistently.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5c574e]">
              Scale your content output without hiring a designer, wrestling with Canva, or burning your weekends.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {audiences.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.name} delay={index * 150}>
                <div
                  className={`group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[2.25rem] border p-7 shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 ${item.cardBg} ${item.cardBorder} ${item.hoverShadow}`}
                >
                  <div>
                    {/* Role Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold tracking-wide backdrop-blur-md ${item.badgeStyle}`}
                      >
                        <Icon className="size-3.5" aria-hidden="true" />
                        {item.badge}
                      </span>
                    </div>

                    {/* Persona Title */}
                    <h3 className={`mt-5 ${item.titleClass}`}>{item.name}</h3>

                    {/* Illustration Container */}
                    <div
                      className={`relative mt-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border p-4 backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02] ${item.imgWrapperBg}`}
                    >
                      <img
                        src={item.photo}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Description */}
                    <p className={`mt-5 text-[15px] font-medium leading-relaxed ${item.bodyColor}`}>
                      {item.headline}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="mt-6 border-t border-current/15 pt-5">
                    <ul className="space-y-2.5">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold">
                          <span
                            className={`flex size-4 shrink-0 items-center justify-center rounded-full ${item.checkBg}`}
                          >
                            <Check className="size-2.5 stroke-[3]" />
                          </span>
                          <span className="opacity-90">{highlight}</span>
                        </li>
                      ))}
                    </ul>
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
