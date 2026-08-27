/** Mirrors the server carouselSchema (server/validators/carousel.js). */

const SLIDE_TYPES = ["hook", "context", "value", "value", "takeaway", "cta"] as const

type SlideType = (typeof SLIDE_TYPES)[number]

type Slide = {
  type: SlideType
  heading: string
  body: string
}

type TemplateId = "template_1" | "template_2" | "template_3"

type Strategy = "viral_hook" | "storytelling" | "actionable_value"

type SourceType = "topic" | "article" | "youtube"

type Carousel = {
  title: string
  summary?: string | null
  captionIdeas: string[]
  hashtags: string[]
  /** Always exactly 6, in SLIDE_TYPES order. */
  slides: Slide[]
  sourceType: SourceType
  strategy: Strategy
  template: TemplateId
}

const TEMPLATES: { id: TemplateId; name: string; blurb: string }[] = [
  { id: "template_1", name: "Bold", blurb: "High contrast. Impossible to scroll past." },
  { id: "template_2", name: "Editorial", blurb: "Quiet, considered, serif. Reads like print." },
  { id: "template_3", name: "Structured", blurb: "Numbered and scannable. Built for steps." },
]

export { SLIDE_TYPES, TEMPLATES }
export type { Carousel, Slide, SlideType, SourceType, Strategy, TemplateId }
