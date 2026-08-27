import problemPhoto from "@/assets/landing/problem.jpg"

import { Reveal } from "../reveal"

const steps = ["Research", "Write", "Rewrite", "Structure", "Design", "Format", "Export"]

function Problem() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <img
            src={problemPhoto}
            alt="A person resting their head on a desk beside an open laptop late at night"
            loading="lazy"
            decoding="async"
            className="aspect-4/3 w-full rounded-2xl object-cover lg:aspect-3/2"
          />
        </Reveal>

        <Reveal delay={90}>
          <h2 className="text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
            Your idea isn't the problem. The process is.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#5c574e]">
            You already know what you want to say. But turning it into a post means researching, writing, rewriting,
            structuring, designing, formatting, exporting — and by the time you're done, you've forgotten why you
            started.
          </p>

          <ol className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-[#1c1a17]/15 bg-[#faf7f2] px-3.5 py-1.5 text-sm font-medium text-[#5c574e]">
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <span className="text-[#5c574e]/40" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <p className="mt-8 text-lg font-semibold text-[#1c1a17]">That's not content creation. That's a second job.</p>
        </Reveal>
      </div>
    </section>
  )
}

export { Problem }
