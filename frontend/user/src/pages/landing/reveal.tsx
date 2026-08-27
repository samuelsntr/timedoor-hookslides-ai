import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

/** Fades/slides an element in once it scrolls into view. */
function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

export { Reveal }
