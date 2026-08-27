import { SAMPLE_CAROUSEL } from "@/features/carousel/templates/sample-data"
import { SlideRenderer } from "@/features/carousel/templates/slide-renderer"

import { Reveal } from "../reveal"

const flow = ["Your content", "Content strategy", "AI structure", "Visual template", "Ready to publish"]

function Solution() {
  const takeaway = SAMPLE_CAROUSEL.slides[4]

  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
      <Reveal>
        <h2 className="text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
          Meet HookSlides AI.
        </h2>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#5c574e]">
          Give us your content. Choose how you want to tell the story. We'll turn it into a polished carousel, ready to
          publish.
        </p>

        <ol className="mt-10 space-y-0">
          {flow.map((item, index) => (
            <li key={item} className="flex items-center gap-4 border-b border-[#e4ddd0] py-4 last:border-b-0">
              <span className="w-8 shrink-0 text-sm font-semibold text-[#e24b2c]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-medium text-[#1c1a17]">{item}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={90} className="mx-auto w-full max-w-xs sm:max-w-sm">
        <SlideRenderer
          template="template_2"
          slide={takeaway}
          index={4}
          className="shadow-[0_28px_60px_-30px_rgb(28_26_23/45%)]"
        />
      </Reveal>
    </section>
  )
}

export { Solution }
