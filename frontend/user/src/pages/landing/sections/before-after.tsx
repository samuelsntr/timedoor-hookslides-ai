import { ArrowRight, Check, X } from "lucide-react"

import { Reveal } from "../reveal"

const before = ["Idea", "Research", "Writing", "Rewriting", "Design", "Formatting", "Export"]
const after = ["Content", "Strategy", "Generate", "Export"]

function BeforeAfter() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <Reveal className="max-w-xl">
        <h2 className="text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
          Less busywork. More creating.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <Reveal delay={70} className="rounded-2xl border border-[#e4ddd0] bg-[#f1ece3] p-7 md:p-9">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e]">Before</span>
          <ul className="mt-5 space-y-3">
            {before.map((step) => (
              <li key={step} className="flex items-center gap-3 text-[15px] text-[#5c574e]">
                <X className="size-4 shrink-0 text-[#5c574e]/50" aria-hidden="true" />
                {step}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={130} className="rounded-2xl border-2 border-[#e24b2c] bg-[#faf7f2] p-7 md:p-9">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e24b2c]">With HookSlides</span>
          <ul className="mt-5 space-y-3">
            {after.map((step) => (
              <li key={step} className="flex items-center gap-3 text-[15px] font-medium text-[#1c1a17]">
                <Check className="size-4 shrink-0 text-[#e24b2c]" aria-hidden="true" />
                {step}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#e24b2c]">
            Same idea, fewer steps <ArrowRight className="size-4" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export { BeforeAfter }
