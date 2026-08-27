import { ArrowRight } from "lucide-react"

import { SAMPLE_CAROUSEL } from "@/features/carousel/templates/sample-data"
import { SlideRenderer } from "@/features/carousel/templates/slide-renderer"

function Hero({ onStart }: { onStart: () => void }) {
  const [hook, context, value] = SAMPLE_CAROUSEL.slides

  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e4ddd0] bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e]">
          <span className="size-1.5 rounded-full bg-[#e24b2c]" aria-hidden="true" />
          Topic · Article · YouTube
        </span>

        <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] text-[#1c1a17] sm:text-6xl lg:text-[4.25rem]">
          Turn your ideas into <em className="font-normal italic text-[#e24b2c]">carousels</em>.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5c574e]">
          Give us a topic, an article, or a video. Pick how you want to tell the story. We'll turn it into a carousel
          that's ready to post — no writing, designing, or formatting required.
        </p>

        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-[#e24b2c] px-7 text-base font-semibold text-[#fffdf9] transition-colors hover:bg-[#c93d21] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a17]"
          >
            Create Your First Carousel
            <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          <p className="text-sm text-[#5c574e]">No design skills needed · Ready in minutes</p>
        </div>
      </div>

      {/* The product is the hero image: three real slides, fanned. */}
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="relative mx-auto aspect-4/5 w-[78%] sm:w-[68%] lg:w-[74%]">
          <div className="absolute inset-0 hidden -translate-x-[26%] rotate-[-8deg] opacity-90 sm:block" aria-hidden="true">
            <SlideRenderer template="template_2" slide={value} index={2} className="shadow-[0_18px_50px_-20px_rgb(28_26_23/40%)]" />
          </div>
          <div className="absolute inset-0 hidden translate-x-[26%] rotate-[8deg] opacity-90 sm:block" aria-hidden="true">
            <SlideRenderer template="template_3" slide={context} index={1} className="shadow-[0_18px_50px_-20px_rgb(28_26_23/40%)]" />
          </div>
          <div className="relative">
            <SlideRenderer template="template_1" slide={hook} index={0} className="shadow-[0_30px_70px_-28px_rgb(28_26_23/55%)]" />
          </div>
        </div>
        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e]/70">
          Real output · 6 slides · Ready to post
        </p>
      </div>
    </section>
  )
}

export { Hero }
