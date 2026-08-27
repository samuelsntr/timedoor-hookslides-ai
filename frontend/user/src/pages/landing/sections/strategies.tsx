import { Bolt, BookOpen, TrendingUp } from "lucide-react"

import { Reveal } from "../reveal"

const strategies = [
  {
    icon: TrendingUp,
    name: "Viral Hook",
    headline: "Make people stop scrolling.",
    body: "Turn an idea into an opening people can't skip past.",
  },
  {
    icon: BookOpen,
    name: "Storytelling",
    headline: "Give your idea a story.",
    body: "Turn information into something people want to follow to the end.",
  },
  {
    icon: Bolt,
    name: "Actionable Value",
    headline: "Give people something useful.",
    body: "Turn knowledge into steps they can act on today.",
  },
]

function Strategies() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
            Not just AI text. A strategy.
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
