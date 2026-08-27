import { cn } from "@/lib/utils"

import type { Slide } from "./types"

/** Editorial — paper stock, serif, hairline rules. Reads like a printed spread. */
function TemplateTwo({ slide, index, className }: { slide: Slide; index: number; className?: string }) {
  const isOpener = slide.type === "hook"

  return (
    <div
      className={cn(
        "slide-card flex w-full flex-col overflow-hidden rounded-[4%] border border-[#e4ddd0] bg-[#faf7f2] p-[9%] font-sans text-[#1c1a17]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[#1c1a17]/15 pb-[4%]">
        <span className="slide-kicker font-semibold uppercase text-[#5c574e]">
          {slide.type === "cta" ? "Your turn" : slide.type}
        </span>
        <span className="slide-kicker font-semibold text-[#e24b2c]">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <h3
        className={cn(
          "mt-[8%] font-[Fraunces,serif] font-normal italic",
          isOpener ? "slide-heading-lg" : "slide-heading",
        )}
      >
        {slide.heading}
      </h3>

      <p className="slide-body mt-[7%] text-[#5c574e]">{slide.body}</p>

      <span className="slide-kicker mt-auto font-semibold uppercase text-[#5c574e]/60">HookSlides AI</span>
    </div>
  )
}

export { TemplateTwo }
