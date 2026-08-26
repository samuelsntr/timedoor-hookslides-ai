import { useState } from "react"
import {
  BookOpen,
  Bolt,
  Check,
  Copy,
  Download,
  Lightbulb,
  Link2,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Video,
  WandSparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SiteFooter } from "@/components/shared/site-footer"
import { SiteHeader } from "@/components/shared/site-header"
import { cn, copyToClipboard } from "@/lib/utils"

const contentSources = [
  { id: "topic", label: "Topic", icon: Lightbulb },
  { id: "url", label: "Article URL", icon: Link2 },
  { id: "youtube", label: "YouTube", icon: Video },
] as const

const strategies = [
  { id: "viral", label: "Viral Hook", body: "Optimized for immediate engagement and sharing.", icon: TrendingUp },
  { id: "story", label: "Storytelling", body: "Narrative-driven structure to build deep connection.", icon: BookOpen },
  { id: "action", label: "Actionable Value", body: "Step-by-step guides and practical takeaways.", icon: Bolt },
] as const

const captions = [
  "Is AI actually helping you, or just making you busy? 🤖 Here is the truth about productivity in the age of automation. #AI #Productivity",
  "Stop wasting time on prompt engineering and start focusing on results. 🚀 Here are 3 ways to reclaim your schedule. #Efficiency #WorkSmarter",
]

const tags = ["#AI", "#Productivity", "#TechTrends", "#FutureOfWork", "#Automation", "#GrowthMindset"]

const slides = [
  { kicker: "The Breakthrough", title: "How AI is actually killing your productivity." },
  { kicker: "01", title: "Prompt Overload", body: "Spending 40 minutes tweaking a prompt for a 5-minute task is the new \"procrastination.\"" },
  { kicker: "02", title: "Context Switching", body: "Jumping between AI tools every 5 minutes destroys your deep work momentum." },
  { kicker: "03", title: "Output Overload", body: "Generating 50 variations of the same paragraph is not progress, it's a loop." },
  { kicker: "04", title: "The Fix", body: "Use AI for drafts, keep judgment for decisions. Separate creation from editing." },
  { kicker: "The Takeaway", title: "AI amplifies habits. Build good ones first." },
]

function GenerateCarouselPage() {
  const [source, setSource] = useState<(typeof contentSources)[number]["id"]>("topic")
  const [strategy, setStrategy] = useState<(typeof strategies)[number]["id"]>("story")
  const [template, setTemplate] = useState<"Bold Accent" | "Minimalist" | "Data Focused">("Bold Accent")
  const [copied, setCopied] = useState<string | null>(null)

  async function handleCopy(text: string) {
    if (await copyToClipboard(text)) {
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-6 pt-24 md:p-8 md:pt-24 lg:flex-row">
        <section className="flex flex-1 basis-0 flex-col gap-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div>
            <h1 className="mb-2 font-heading text-3xl font-bold">Create New Carousel</h1>
            <p className="text-muted-foreground">Transform your ideas into high-converting visual stories.</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Content Source</h2>
            <div className="flex flex-wrap gap-3">
              {contentSources.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSource(id)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 font-medium transition-colors",
                    source === id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground hover:border-primary/40",
                  )}
                >
                  <Icon className="size-4" /> {label}
                </button>
              ))}
            </div>
            <textarea
              className="h-40 w-full resize-none rounded-xl bg-muted p-5 text-foreground outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring"
              placeholder="Write a topic, paste an article URL, or a YouTube link..."
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Content Strategy</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {strategies.map(({ id, label, body, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStrategy(id)}
                  className={cn(
                    "flex cursor-pointer flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
                    strategy === id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted hover:border-primary/40",
                  )}
                >
                  <Icon className="size-5 text-primary" />
                  <span className={cn("font-medium", strategy === id ? "text-primary" : "text-foreground")}>{label}</span>
                  <p className={cn("mt-1 text-xs leading-relaxed", strategy === id ? "text-primary/80" : "text-muted-foreground")}>{body}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Select Layout Template</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setTemplate("Bold Accent")}
                  className={cn(
                    "flex aspect-4/5 cursor-pointer flex-col rounded-xl border-2 bg-primary/5 p-4",
                    template === "Bold Accent" ? "border-primary" : "border-border bg-muted hover:border-primary/40",
                  )}
                >
                  <div className="mb-4 h-2 w-1/2 rounded bg-primary/30" />
                  <div className="mb-2 h-16 w-full rounded bg-primary/30" />
                  <div className="mt-auto h-2 w-1/3 self-end rounded bg-primary/30" />
                </button>
                <span className={cn("text-center text-sm font-medium", template === "Bold Accent" ? "text-primary" : "text-muted-foreground")}>Bold Accent</span>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setTemplate("Minimalist")}
                  className={cn(
                    "flex aspect-4/5 cursor-pointer flex-col items-center justify-center rounded-xl border p-4",
                    template === "Minimalist" ? "border-primary bg-primary/5" : "border-border bg-muted hover:border-primary/40",
                  )}
                >
                  <div className="mb-4 size-12 rounded-full bg-border" />
                  <div className="h-2 w-3/4 rounded bg-border" />
                </button>
                <span className={cn("text-center text-sm font-medium", template === "Minimalist" ? "text-primary" : "text-muted-foreground")}>Minimalist</span>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setTemplate("Data Focused")}
                  className={cn(
                    "flex aspect-4/5 cursor-pointer flex-col rounded-xl border p-4",
                    template === "Data Focused" ? "border-primary bg-primary/5" : "border-border bg-muted hover:border-primary/40",
                  )}
                >
                  <div className="mb-2 h-2 w-full rounded bg-border" />
                  <div className="mb-4 h-2 w-5/6 rounded bg-border" />
                  <div className="h-24 w-full rounded bg-border" />
                </button>
                <span className={cn("text-center text-sm font-medium", template === "Data Focused" ? "text-primary" : "text-muted-foreground")}>Data Focused</span>
              </div>
            </div>
          </div>

          <Button className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-br from-primary to-secondary py-6 text-lg font-semibold text-primary-foreground shadow-md transition-colors hover:opacity-90">
            <WandSparkles className="size-5" /> Generate My Carousel
          </Button>
        </section>

        <section className="flex flex-1 basis-0 flex-col gap-6 lg:min-h-0">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-heading text-xl font-semibold">Carousel Preview</h2>
            <span className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="size-3.5" /> {slides.length} Slides Drafted
            </span>
          </div>

          <ScrollArea className="relative max-h-125 min-h-0 flex-1 overflow-hidden rounded-2xl bg-muted">
            <div className="flex flex-col items-center gap-8 py-8">
              {slides.map((slide, index) => (
                <div key={slide.title} className="relative mx-auto flex w-full max-w-xs items-center gap-3 sm:max-w-sm sm:gap-6">
                  <div className={cn("grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold sm:size-8 sm:text-sm", index === 0 ? "bg-primary/20 text-primary" : "bg-border text-muted-foreground")}>{index + 1}</div>
                  {slide.body ? (
                    <div className="flex aspect-4/5 w-full max-w-full flex-col rounded-2xl border-4 bg-primary p-5 text-primary-foreground shadow-lg sm:rounded-3xl sm:border-[6px] sm:p-8">
                      <span className="mb-2 text-lg font-medium text-primary-foreground/70">{slide.kicker}</span>
                      <h3 className="mb-4 font-heading text-xl font-bold sm:text-2xl">{slide.title}</h3>
                      <p className="text-sm leading-relaxed text-primary-foreground/90">{slide.body}</p>
                    </div>
                  ) : (
                    <div className="flex aspect-4/5 w-full max-w-full flex-col items-center justify-center rounded-2xl border-4 border-foreground bg-card p-5 text-center shadow-lg sm:rounded-3xl sm:border-[6px] sm:p-8">
                      <span className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">{slide.kicker}</span>
                      <h3 className="mb-8 font-heading text-2xl font-bold leading-tight sm:text-3xl">{slide.title}</h3>
                      <div className="mb-8 mt-auto h-1 w-12 rounded-full bg-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 flex gap-4">
            <Button className="flex-1 cursor-pointer gap-2 rounded-xl py-3 font-medium"><Download className="size-4" />Export Images</Button>
            <Button variant="secondary" className="flex-1 cursor-pointer gap-2 rounded-xl bg-card py-3 font-medium text-foreground hover:bg-muted"><RotateCcw className="size-4" />Regenerate</Button>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-lg font-semibold">Recommended Captions</h3>
              <div className="flex flex-col gap-3">
                {captions.map((caption) => (
                  <div key={caption} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-sm leading-relaxed text-muted-foreground">{caption}</p>
                    <button type="button" onClick={() => handleCopy(caption)} aria-label="Copy caption" className="relative grid shrink-0 cursor-pointer place-items-center self-center p-1 text-primary hover:text-primary/80">
                      <Check className={cn("col-start-1 row-start-1 size-4 transition-opacity", copied === caption ? "opacity-100" : "opacity-0")} />
                      <Copy className={cn("col-start-1 row-start-1 size-4 transition-opacity", copied === caption ? "opacity-0" : "opacity-100")} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold">Recommended Tags</h3>
                <button type="button" onClick={() => handleCopy(tags.join(" "))} className="flex cursor-pointer items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
                  {copied === tags.join(" ") ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} {copied === tags.join(" ") ? "Copied!" : "Copy All"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="cursor-pointer rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

export { GenerateCarouselPage }
