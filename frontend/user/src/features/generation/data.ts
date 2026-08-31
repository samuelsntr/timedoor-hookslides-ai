import { BookOpen, Bolt, Lightbulb, Link2, TrendingUp, Video } from "lucide-react"
import type { TemplateId } from "@/features/carousel/templates/types"
import type { Carousel, Template } from "./types"

const contentSources = [
  { label: "Topic", icon: Lightbulb },
  { label: "Article URL", icon: Link2 },
  { label: "YouTube", icon: Video },
] as const

const strategies = [
  { id: "viral_hook", label: "Viral Hook", body: "Optimized for immediate engagement and sharing.", icon: TrendingUp },
  { id: "storytelling", label: "Storytelling", body: "Narrative-driven structure to build deep connection.", icon: BookOpen },
  { id: "actionable_value", label: "Actionable Value", body: "Step-by-step guides and practical takeaways.", icon: Bolt },
] as const

const templateNames: Record<Template, string> = {
  "bold-accent": "Bold",
  minimalist: "Editorial",
  "data-focused": "Structured",
  timedoor: "Timedoor",
}

const templateIds: Record<Template, TemplateId> = {
  "bold-accent": "template_1",
  minimalist: "template_2",
  "data-focused": "template_3",
  timedoor: "template_4",
}

const dummyCarousel: Carousel = {
  slides: [
    { type: "hook", title: "How AI is actually killing your productivity.", description: "A closer look at the habits behind busy work." },
    { type: "context", title: "Prompt Overload", description: "Spending 40 minutes tweaking a prompt for a 5-minute task is the new procrastination." },
    { type: "value", title: "Context Switching", description: "Jumping between AI tools every 5 minutes destroys your deep work momentum." },
    { type: "value", title: "Output Overload", description: "Generating 50 variations of the same paragraph is not progress, it is a loop." },
    { type: "takeaway", title: "The Fix", description: "Use AI for drafts, keep judgment for decisions. Separate creation from editing." },
    { type: "cta", title: "AI amplifies habits.", description: "Build good ones first." },
  ],
  captionIdeas: [
    "Is AI actually helping you, or just making you busy? Here is the truth about productivity in the age of automation.",
    "Stop wasting time on prompt engineering and start focusing on results. Here are 3 ways to reclaim your schedule.",
    "AI amplifies your habits. Build the right workflow before adding another tool.",
  ],
  hashtags: ["#AI", "#Productivity", "#TechTrends", "#FutureOfWork", "#Automation", "#GrowthMindset", "#WorkSmarter", "#DeepWork", "#CreatorTips", "#DigitalStrategy"],
}

export { contentSources, strategies, templateNames, templateIds, dummyCarousel }
