import { ArrowRight } from "lucide-react"

import ctaPhoto from "@/assets/landing/cta.jpg"

import { Reveal } from "../reveal"

function FinalCta({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={ctaPhoto}
        alt="A person smiling at their laptop in warm evening light"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1c1a17]/75" aria-hidden="true" />

      <Reveal className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
        <h2 className="text-3xl font-semibold leading-[1.1] text-[#faf7f2] sm:text-4xl lg:text-5xl">
          Your next viral carousel is 60 seconds away.
        </h2>
        <p className="mt-5 text-lg text-[#faf7f2]/80">Stop letting your best ideas die in your notes app. Turn them into beautifully designed posts today.</p>
        <button
          type="button"
          onClick={onStart}
          className="group mt-9 inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-[#e24b2c] px-7 text-base font-semibold text-[#fffdf9] transition-colors hover:bg-[#c93d21] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#faf7f2]"
        >
          Create Your First Carousel
          <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </Reveal>
    </section>
  )
}

export { FinalCta }
