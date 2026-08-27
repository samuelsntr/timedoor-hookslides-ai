import { Bolt, BookOpen, TrendingUp } from "lucide-react"

import { Reveal } from "../reveal"

const strategies = [
  {
    icon: TrendingUp,
    name: "Viral Hook",
    headline: "Make people stop scrolling.",
    body: "Stop the scroll. We automatically generate punchy, psychology-backed hooks that force people to swipe left.",
  },
  {
    icon: BookOpen,
    name: "Storytelling",
    headline: "Give your idea a story.",
    body: "Keep them reading. Our AI structures your information into a compelling narrative arc that retains attention.",
  },
  {
    icon: Bolt,
    name: "Actionable Value",
    headline: "Give people something useful.",
    body: "Drive saves and shares. We format your expertise into bite-sized, actionable steps your audience will want to bookmark.",
  },
]

function Strategies() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
            Engineered for engagement, not just automation.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {strategies.map(({ icon: Icon, name, headline, body }, index) => (
            <Reveal key={name} delay={index * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-[#e4ddd0] bg-[#faf7f2] p-7">
                <div className="grid size-11 place-items-center rounded-full bg-[#e24b2c] text-[#fffdf9]">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <span className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#e24b2c]">{name}</span>
                <h3 className="mt-2 font-[Fraunces,serif] text-2xl font-normal italic text-[#1c1a17]">{headline}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#5c574e]">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Strategies }
