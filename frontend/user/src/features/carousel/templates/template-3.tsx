import { cn } from "@/lib/utils"

import type { Slide } from "./types"

/** Structured — giant numeral, scannable. Built for step-by-step content. */
function TemplateThree({ slide, index, className }: { slide: Slide; index: number; className?: string }) {
  const isOpener = slide.type === "hook"

  return (
    <div
      className={cn(
        "slide-card flex w-full flex-col overflow-hidden rounded-[4%] bg-[#1c1a17] p-[8%] font-sans text-[#faf7f2]",
        className,
      )}
    >
      {isOpener ? (
        <span className="slide-kicker font-bold uppercase text-[#e24b2c]">Start here</span>
      ) : (
        <span className="slide-numeral font-[Fraunces,serif] font-semibold text-[#e24b2c]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <h3
        className={cn(
          "mt-[4%] font-[Fraunces,serif] font-semibold",
          isOpener ? "slide-heading-lg" : "slide-heading",
        )}
      >
        {slide.heading}
      </h3>

      <p className="slide-body mt-[6%] text-[#faf7f2]/70">{slide.body}</p>

      <div className="mt-auto flex gap-[1.5%]" aria-hidden="true">
        {Array.from({ length: 6 }, (_, dot) => (
          <span
            key={dot}
            className={cn(
              "h-[1.2cqw] flex-1 rounded-full",
              dot === index ? "bg-[#e24b2c]" : "bg-[#faf7f2]/20",
            )}
          />
        ))}
      </div>
    </div>
  )
}

export { TemplateThree }
