import { Download, Lightbulb, Sparkles, Wand2 } from "lucide-react"

import { SAMPLE_CAROUSEL } from "@/features/carousel/templates/sample-data"
import { SlideRenderer } from "@/features/carousel/templates/slide-renderer"

import { Reveal } from "../reveal"

function HowItWorks() {
  const [hook, , , , , cta] = SAMPLE_CAROUSEL.slides

  const steps = [
    {
      icon: Lightbulb,
      title: "Bring your content",
      body: "Start with a topic, an article link, or a YouTube video.",
    },
    {
      icon: Sparkles,
      title: "Choose your strategy",
      body: "Viral Hook, Storytelling, or Actionable Value.",
    },
    {
      icon: Wand2,
      title: "Generate",
      body: "HookSlides structures it into a 6-slide carousel that actually holds together.",
      visual: <SlideRenderer template="template_1" slide={hook} index={0} />,
    },
    {
      icon: Download,
      title: "Export",
      body: "Get a finished carousel, ready to share.",
      visual: <SlideRenderer template="template_1" slide={cta} index={5} />,
    },
  ]

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <h2 className="max-w-xl text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
          From idea to carousel in four steps.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, body, visual }, index) => (
          <Reveal key={title} delay={index * 70} className="flex flex-col">
            {visual ? (
              <div className="mb-5 w-full max-w-40">{visual}</div>
            ) : (
              <div className="mb-5 grid size-11 place-items-center rounded-full bg-[#f6d9cf] text-[#e24b2c]">
                <Icon className="size-5" aria-hidden="true" />
              </div>
            )}
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e24b2c]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-[#1c1a17]">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#5c574e]">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export { HowItWorks }
