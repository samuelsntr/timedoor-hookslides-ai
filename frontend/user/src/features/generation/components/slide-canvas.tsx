import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { SlideRenderer } from "@/features/carousel/templates/slide-renderer"
import type { Slide as TemplateSlide } from "@/features/carousel/templates/types"
import { templateIds } from "../data"
import type { Slide, Template } from "../types"

const SLIDE_WIDTH = 1080
const SLIDE_HEIGHT = 1350

function toTemplateSlide(slide: Slide): TemplateSlide {
  return { type: slide.type as TemplateSlide["type"], heading: slide.title, body: slide.description }
}

function SlideCanvas({
  slide,
  index,
  template,
  preview = false,
  thumbnail = false,
  dataExportSlide = true,
}: {
  slide: Slide
  index: number
  template: Template
  preview?: boolean
  thumbnail?: boolean
  dataExportSlide?: boolean
}) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!preview && !thumbnail) {
      setScale(1)
      return
    }

    const element = outerRef.current
    if (!element) return

    const updateScale = () => {
      const availableWidth = element.clientWidth
      if (availableWidth) setScale(Math.min(availableWidth / SLIDE_WIDTH, 1))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(element)
    return () => observer.disconnect()
  }, [preview, thumbnail])

  const visualHeight = SLIDE_HEIGHT * scale

  return (
    <div ref={outerRef} className={cn("relative w-full", preview || thumbnail ? "overflow-hidden" : "h-[1350px] w-[1080px]")} style={preview || thumbnail ? { height: visualHeight, minHeight: visualHeight } : undefined}>
      <div
        {...(dataExportSlide ? { "data-carousel-slide": "" } : {})}
        className={cn(
          "absolute left-0 top-0 origin-top-left overflow-hidden",
          "[&_.slide-card]:rounded-none",
        )}
        style={{
          width: `${SLIDE_WIDTH}px`,
          height: `${SLIDE_HEIGHT}px`,
          minWidth: `${SLIDE_WIDTH}px`,
          minHeight: `${SLIDE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <SlideRenderer template={templateIds[template]} slide={toTemplateSlide(slide)} index={index} />
      </div>
    </div>
  )
}

export { SlideCanvas, SLIDE_WIDTH, SLIDE_HEIGHT }
