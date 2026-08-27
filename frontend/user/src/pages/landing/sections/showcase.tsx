import { useState } from "react"

import { SAMPLE_CAROUSEL } from "@/features/carousel/templates/sample-data"
import { SlideRenderer } from "@/features/carousel/templates/slide-renderer"
import { TEMPLATES, type TemplateId } from "@/features/carousel/templates/types"
import { cn } from "@/lib/utils"

import { Reveal } from "../reveal"

function Showcase() {
  const [template, setTemplate] = useState<TemplateId>("template_1")
  const active = TEMPLATES.find((item) => item.id === template)

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <Reveal className="max-w-2xl">
        <h2 className="text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
          From raw idea to ready-to-post.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[#5c574e]">
          Same carousel, three ways to tell it. Pick the look that fits your feed.
        </p>
      </Reveal>

      <Reveal delay={70} className="mt-10">
        <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Carousel templates">
          {TEMPLATES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={template === item.id}
              onClick={() => setTemplate(item.id)}
              className={cn(
                "cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a17]",
                template === item.id
                  ? "border-[#1c1a17] bg-[#1c1a17] text-[#faf7f2]"
                  : "border-[#e4ddd0] bg-[#faf7f2] text-[#5c574e] hover:border-[#1c1a17]/40 hover:text-[#1c1a17]",
              )}
            >
              {item.name}
            </button>
          ))}
          {active && <p className="text-sm text-[#5c574e]">{active.blurb}</p>}
        </div>
      </Reveal>

      <Reveal delay={110} className="mt-10">
        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:gap-6">
          {SAMPLE_CAROUSEL.slides.map((slide, index) => (
            <div key={`${template}-${slide.heading}`} className="w-[68vw] shrink-0 snap-center sm:w-[52vw] md:w-auto">
              <SlideRenderer
                template={template}
                slide={slide}
                index={index}
                className="shadow-[0_20px_50px_-28px_rgb(28_26_23/40%)]"
              />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e]/70">
                {String(index + 1).padStart(2, "0")} · {slide.type}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={140} className="mt-12 rounded-2xl border border-[#e4ddd0] bg-[#f1ece3] p-7 md:p-9">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e24b2c]">You also get</span>
        <div className="mt-5 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-[#1c1a17]">Caption ideas</h3>
            <ul className="mt-3 space-y-2.5">
              {SAMPLE_CAROUSEL.captionIdeas.slice(0, 2).map((caption) => (
                <li key={caption} className="text-[15px] leading-relaxed text-[#5c574e]">
                  {caption}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1c1a17]">Hashtags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {SAMPLE_CAROUSEL.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#e4ddd0] bg-[#faf7f2] px-3 py-1.5 text-sm text-[#5c574e]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export { Showcase }
