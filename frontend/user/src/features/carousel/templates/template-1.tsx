import { cn } from "@/lib/utils"

import type { Slide } from "./types"

/** Bold — solid vermillion field, oversized heading, high contrast. */
function TemplateOne({ slide, index, className }: { slide: Slide; index: number; className?: string }) {
  const isOpener = slide.type === "hook"

  return (
    <div
      className={cn(
        "slide-card flex w-full flex-col overflow-hidden rounded-[4%] p-[8%] font-sans",
        isOpener ? "bg-[#1c1a17] text-[#faf7f2]" : "bg-[#e24b2c] text-[#fffdf9]",
        className,
      )}
    >
      <span className="slide-kicker font-bold uppercase opacity-70">
        {isOpener ? "HookSlides" : `${String(index + 1).padStart(2, "0")} / 06`}
      </span>

      <h3
        className={cn(
          "mt-[6%] font-semibold",
          isOpener ? "slide-heading-lg font-[Fraunces,serif]" : "slide-heading font-[Fraunces,serif]",
        )}
      >
        {slide.heading}
      </h3>

      <p className="slide-body mt-[6%] opacity-90">{slide.body}</p>

      <div
        className={cn(
          "mt-auto h-[1.5cqw] w-[18%] rounded-full",
          isOpener ? "bg-[#e24b2c]" : "bg-[#fffdf9]/60",
        )}
      />
    </div>
  )
}

export { TemplateOne }
