import { useState, useEffect } from "react"
import { X, User, Calendar, Copy, Check, ChevronLeft, ChevronRight, Hash, MessageSquareText, Layers, Loader2 } from "lucide-react"
import { adminApi, type AdminCarouselDetail } from "@/services/admin-api"
import { SlideCanvas } from "@/features/generation/components/slide-canvas"

interface CarouselDetailModalProps {
  carouselId: string | null
  secret: string
  onClose: () => void
  onSelectUser?: (userId: string) => void
}

export function CarouselDetailModal({ carouselId, secret, onClose, onSelectUser }: CarouselDetailModalProps) {
  const [data, setData] = useState<AdminCarouselDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  useEffect(() => {
    if (!carouselId) return
    let isMounted = true
    setLoading(true)
    adminApi
      .getCarouselById(secret, carouselId)
      .then((res) => {
        if (isMounted) {
          setData(res)
          setActiveSlide(0)
        }
      })
      .catch((err) => {
        console.error("Failed to fetch carousel detail:", err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [carouselId, secret])

  if (!carouselId) return null

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(key)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const currentSlide = data?.slides?.[activeSlide]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1a17]/50 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#e4ddd0] bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e4ddd0] bg-[#faf7f2] px-7 py-5">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#f6d9cf] text-[#e24b2c]">
              <Layers className="size-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-[Fraunces,serif] text-xl font-bold text-[#1c1a17]">
                  {loading ? "Loading Carousel..." : data?.title || "Untitled Carousel"}
                </h3>
                {data && (
                  <span className="rounded-lg border border-[#e4ddd0] bg-white px-2.5 py-0.5 text-xs font-mono font-bold uppercase text-[#1c1a17]">
                    {data.sourceType}
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-[#5c574e]">ID: {carouselId}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl border border-[#e4ddd0] bg-white text-[#5c574e] hover:bg-[#f1ece3] hover:text-[#1c1a17] transition-all cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body */}
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-[#e24b2c]" />
          </div>
        ) : !data ? (
          <div className="p-12 text-center text-[#5c574e]">Carousel not found or error loading details.</div>
        ) : (
          <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
            {/* Left Column: Metadata & Raw Inputs */}
            <div className="border-b border-[#e4ddd0] p-6 space-y-6 lg:col-span-5 lg:border-b-0 lg:border-r bg-[#faf7f2]/30">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5c574e]">Overview & Parameters</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-[#e4ddd0] bg-white p-3.5 shadow-xs">
                    <span className="text-[#5c574e] block mb-1">Author / User</span>
                    <button
                      type="button"
                      onClick={() => data.user.id && onSelectUser?.(data.user.id)}
                      className="font-bold text-[#e24b2c] hover:underline flex items-center gap-1.5 truncate cursor-pointer"
                    >
                      <User className="size-3.5" />
                      <span className="truncate">{data.user.username}</span>
                    </button>
                  </div>
                  <div className="rounded-xl border border-[#e4ddd0] bg-white p-3.5 shadow-xs">
                    <span className="text-[#5c574e] block mb-1">Created At</span>
                    <span className="font-semibold text-[#1c1a17] flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-[#5c574e]" />
                      <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="rounded-xl border border-[#e4ddd0] bg-white p-3.5 shadow-xs">
                    <span className="text-[#5c574e] block mb-1">Strategy</span>
                    <span className="inline-flex rounded-md bg-[#f1ece3] px-2 py-0.5 font-semibold text-[#1c1a17] capitalize">
                      {data.strategy.replace("_", " ")}
                    </span>
                  </div>
                  <div className="rounded-xl border border-[#e4ddd0] bg-white p-3.5 shadow-xs">
                    <span className="text-[#5c574e] block mb-1">Template</span>
                    <span className="font-mono font-semibold text-[#1c1a17]">
                      {data.template}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              {data.summary && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5c574e]">Brief Summary</h4>
                  <p className="text-xs leading-relaxed text-[#1c1a17] rounded-xl bg-white p-4 border border-[#e4ddd0] shadow-xs">
                    {data.summary}
                  </p>
                </div>
              )}

              {/* Original Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5c574e]">Source Content / Prompt</h4>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.originalInput, "input")}
                    className="text-xs font-semibold text-[#5c574e] hover:text-[#e24b2c] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSection === "input" ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                    <span>{copiedSection === "input" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="max-h-32 overflow-y-auto rounded-xl border border-[#e4ddd0] bg-white p-3 text-xs font-mono leading-relaxed text-[#5c574e] whitespace-pre-wrap">
                  {data.originalInput}
                </div>
              </div>

              {/* Captions & Hashtags */}
              {(data.captionIdeas.length > 0 || data.hashtags.length > 0) && (
                <div className="space-y-4 pt-1">
                  {data.hashtags.length > 0 && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#5c574e] block mb-2">Hashtags</span>
                      <div className="flex flex-wrap gap-1.5">
                        {data.hashtags.map((h, i) => (
                          <span key={i} className="inline-flex items-center gap-1 rounded-lg bg-[#f6d9cf] px-2.5 py-1 text-xs font-bold text-[#e24b2c] font-mono">
                            <Hash className="size-3" />
                            {h.replace(/^#/, "")}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.captionIdeas.length > 0 && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#5c574e] block mb-2">Generated Captions</span>
                      <div className="space-y-2">
                        {data.captionIdeas.map((c, i) => (
                          <div key={i} className="flex items-start gap-2.5 rounded-xl border border-[#e4ddd0] bg-white p-3 text-xs text-[#1c1a17]">
                            <MessageSquareText className="size-4 mt-0.5 text-[#e24b2c] shrink-0" />
                            <span className="leading-snug">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Slide Deck Interactive Viewer */}
            <div className="flex flex-col p-7 lg:col-span-7 bg-[#faf7f2]/60">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="font-[Fraunces,serif] text-base font-bold text-[#1c1a17]">Generated Slides Preview</h4>
                  <p className="text-xs text-[#5c574e]">
                    Slide {activeSlide + 1} of {data.slides.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                    disabled={activeSlide === 0}
                    className="flex size-9 items-center justify-center rounded-xl border border-[#e4ddd0] bg-white text-[#1c1a17] hover:bg-[#faf7f2] disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="size-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => Math.min(data.slides.length - 1, prev + 1))}
                    disabled={activeSlide === data.slides.length - 1}
                    className="flex size-9 items-center justify-center rounded-xl border border-[#e4ddd0] bg-white text-[#1c1a17] hover:bg-[#faf7f2] disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="size-4.5" />
                  </button>
                </div>
              </div>

              {/* Slide Card View */}
              {currentSlide ? (
                <div className="flex-1 flex flex-col justify-between rounded-2xl border border-[#e4ddd0] bg-white p-7 shadow-md min-h-[340px] transition-all">
                  <div className="flex justify-center items-center py-4 bg-[#f1ece3] rounded-xl overflow-hidden border border-[#e4ddd0]">
                    <div className="relative w-full max-w-[300px]">
                      <SlideCanvas
                        slide={{
                          type: currentSlide.type,
                          title: (currentSlide as any).heading || currentSlide.hook || "",
                          description: (currentSlide as any).body || currentSlide.content || "",
                        }}
                        index={activeSlide}
                        template={
                          ({
                            template_1: "bold-accent",
                            template_2: "minimalist",
                            template_3: "data-focused",
                            template_4: "timedoor",
                          } as any)[data.template] || "bold-accent"
                        }
                        preview
                      />
                    </div>
                  </div>

                  {/* Numbered slide pills */}
                  <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#e4ddd0] pt-4">
                    {data.slides.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`size-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeSlide === idx
                            ? "bg-[#e24b2c] text-white shadow-sm shadow-[#e24b2c]/30 scale-105"
                            : "bg-[#faf7f2] text-[#5c574e] border border-[#e4ddd0] hover:bg-[#f1ece3] hover:text-[#1c1a17]"
                        }`}
                      >
                        {s.slideNumber}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-[#5c574e]">No slides available for this carousel.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
