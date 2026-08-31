import type { TemplateId } from "@/features/carousel/templates/types"

export type Template = "bold-accent" | "minimalist" | "data-focused" | "timedoor"

export type Slide = {
  type: string
  title: string
  description: string
}

export type Carousel = {
  slides: Slide[]
  captionIdeas: string[]
  hashtags: string[]
}

export type GenerateCarouselRequest = {
  input: string
  sourceType: "topic" | "article_url" | "youtube"
  strategy: "viral_hook" | "storytelling" | "actionable_value"
  template: TemplateId
}

export type GenerateCarouselResponse = {
  slides: Array<{
    type: string
    heading: string
    body: string
  }>
  captionIdeas?: string[]
  hashtags?: string[]
}
