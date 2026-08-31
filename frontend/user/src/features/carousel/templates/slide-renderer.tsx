import { TemplateOne } from "./template-1"
import { TemplateThree } from "./template-3"
import { TemplateTwo } from "./template-2"
import type { Slide, TemplateId } from "./types"
import { TemplateFour } from "./template-4"

const renderers = {
  template_1: TemplateOne,
  template_2: TemplateTwo,
  template_3: TemplateThree,
  template_4: TemplateFour,
} as const

/** Renders one 4:5 slide in the given template. Type sizes off container width. */
function SlideRenderer({
  template,
  slide,
  index,
  className,
}: {
  template: TemplateId
  slide: Slide
  index: number
  className?: string
}) {
  const Template = renderers[template]
  return <Template slide={slide} index={index} className={className} />
}

export { SlideRenderer }
