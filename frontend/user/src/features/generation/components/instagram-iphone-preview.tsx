import { useState } from "react"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Home,
  Search,
  PlusSquare,
  Film,
  CheckCircle2,
} from "lucide-react"
import { SlideCanvas } from "./slide-canvas"
import type { Carousel, Template } from "../types"
import { cn } from "@/lib/utils"

interface InstagramIphonePreviewProps {
  carousel: Carousel
  template: Template
  displayName?: string
  avatarInitial?: string
}

export function InstagramIphonePreview({
  carousel,
  template,
  displayName = "yourbrand.ai",
  avatarInitial = "H",
}: InstagramIphonePreviewProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const slides = carousel.slides.slice(0, 6)
  const totalSlides = slides.length
  const currentSlide = slides[activeSlide] || slides[0]

  const cleanUsername = displayName
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_.]/g, "")
    .slice(0, 20) || "hookslides.hq"

  const captionText =
    carousel.captionIdeas?.[0] ||
    "Turn your insights into viral social carousels in seconds. Swipe through to see the full breakdown 👉"

  const hashtagsText = carousel.hashtags?.length
    ? carousel.hashtags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)).join(" ")
    : "#CreatorEconomy #SocialMediaMarketing #Carousels"

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev))
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      {/* iPhone 16 Pro Frame */}
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] select-none">
        {/* Outer Frame */}
        <div className="relative rounded-[48px] bg-[#1a1918] p-[9px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.1)]">
          {/* Inner Screen Bezel */}
          <div className="relative flex flex-col overflow-hidden rounded-[40px] bg-white text-[#1c1a17]">
            {/* iOS Status Bar & Dynamic Island */}
            <div className="relative z-20 flex h-11 w-full items-center justify-between px-6 pt-2 bg-white">
              {/* Time */}
              <span className="text-[12px] font-semibold tracking-tight text-black">
                9:41
              </span>

              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-2 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black flex items-center justify-end px-2">
                <div className="size-2 rounded-full bg-[#121826]/80 ring-1 ring-white/10" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-black">
                <span className="text-[10px] font-bold">5G</span>
                <Wifi className="size-3 stroke-[2.5]" />
                <Battery className="size-3.5 stroke-[2.5]" />
              </div>
            </div>

            {/* Instagram Header */}
            <div className="flex items-center justify-between border-b border-[#f0ece5] px-3.5 py-2 bg-white">
              <div className="flex items-center gap-1">
                <span className="font-[Fraunces,serif] text-base font-extrabold tracking-tight text-[#1c1a17]">
                  Instagram
                </span>
                <span className="text-[10px] text-[#5c574e]">⌄</span>
              </div>
              <div className="flex items-center gap-3.5 text-[#1c1a17]">
                <button
                  type="button"
                  className="transition-transform active:scale-90"
                  aria-label="Notifications"
                >
                  <Heart className="size-5 stroke-[1.8]" />
                </button>
                <button
                  type="button"
                  className="relative transition-transform active:scale-90"
                  aria-label="Direct Messages"
                >
                  <Send className="size-5 -rotate-12 stroke-[1.8]" />
                  <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-[#e24b2c] text-[8px] font-bold text-white">
                    1
                  </span>
                </button>
              </div>
            </div>

            {/* Instagram Post Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-white">
              <div className="flex items-center gap-2.5">
                {/* Gradient Story Avatar */}
                <div className="rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px]">
                  <div className="flex size-7 items-center justify-center rounded-full bg-white p-[1px]">
                    <div className="flex size-full items-center justify-center rounded-full bg-[#e24b2c] text-[10px] font-bold text-white">
                      {avatarInitial}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold leading-tight text-[#1c1a17]">
                      {cleanUsername}
                    </span>
                    <CheckCircle2 className="size-2.5 fill-[#0095f6] text-white" />
                  </div>
                  <span className="text-[9px] text-[#8e887f]">Sponsored • Carousel</span>
                </div>
              </div>

              <button
                type="button"
                className="text-[#5c574e] hover:text-black"
                aria-label="More options"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>

            {/* Carousel Slide Media Container (4:5 Aspect Ratio) */}
            <div className="relative w-full overflow-hidden bg-[#1c1a17]">
              {/* Active Slide Canvas */}
              <div className="relative w-full">
                {currentSlide && (
                  <SlideCanvas
                    slide={currentSlide}
                    index={activeSlide}
                    template={template}
                    preview
                    dataExportSlide={false}
                  />
                )}
              </div>

              {/* Instagram Slide Counter Badge */}
              <div className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full bg-black/65 px-2 py-0.5 text-[9px] font-medium tracking-wide text-white backdrop-blur-md">
                <span>{activeSlide + 1}</span>
                <span>/</span>
                <span>{totalSlides}</span>
              </div>

              {/* Interactive Left/Right Navigation Buttons */}
              {activeSlide > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#1c1a17] shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="size-4 stroke-[2.5]" />
                </button>
              )}

              {activeSlide < totalSlides - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#1c1a17] shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="size-4 stroke-[2.5]" />
                </button>
              )}
            </div>

            {/* Instagram Actions Bar */}
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1 bg-white">
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsLiked(!isLiked)}
                  className="transition-transform active:scale-125"
                  aria-label="Like"
                >
                  <Heart
                    className={cn(
                      "size-5 stroke-[1.8] transition-colors",
                      isLiked
                        ? "fill-[#ed4956] stroke-[#ed4956] text-[#ed4956]"
                        : "text-[#1c1a17]",
                    )}
                  />
                </button>
                <button
                  type="button"
                  className="transition-transform active:scale-125 text-[#1c1a17]"
                  aria-label="Comment"
                >
                  <MessageCircle className="size-5 stroke-[1.8]" />
                </button>
                <button
                  type="button"
                  className="transition-transform active:scale-125 text-[#1c1a17]"
                  aria-label="Share"
                >
                  <Send className="size-5 stroke-[1.8]" />
                </button>
              </div>

              {/* Instagram Multi-dot Pagination Indicator */}
              <div className="flex items-center gap-1">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      activeSlide === idx
                        ? "size-1.5 bg-[#0095f6]"
                        : "size-1 bg-[#d0c9be] hover:bg-[#a8a196]",
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Bookmark / Save */}
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="transition-transform active:scale-125 text-[#1c1a17]"
                aria-label="Save"
              >
                <Bookmark
                  className={cn(
                    "size-5 stroke-[1.8] transition-colors",
                    isSaved ? "fill-[#1c1a17]" : "",
                  )}
                />
              </button>
            </div>

            {/* Likes & Caption Preview */}
            <div className="px-3 pb-2 text-[10px] text-[#1c1a17] bg-white">
              <p className="font-bold">
                {isLiked ? "1,429 likes" : "1,428 likes"}
              </p>

              <div className="mt-0.5 leading-snug">
                <span className="font-bold mr-1">{cleanUsername}</span>
                <span>
                  {isExpanded ? captionText : `${captionText.slice(0, 75)}... `}
                </span>
                {!isExpanded && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="font-medium text-[#8e887f] hover:underline"
                  >
                    more
                  </button>
                )}
              </div>

              {/* Hashtags */}
              <p className="mt-1 line-clamp-1 text-[9px] font-medium text-[#00376b]">
                {hashtagsText}
              </p>

              <p className="mt-1 text-[8.5px] uppercase tracking-tight text-[#8e887f]">
                2 hours ago
              </p>
            </div>

            {/* Bottom Instagram Navigation Bar */}
            <div className="flex items-center justify-around border-t border-[#f0ece5] py-2 bg-white text-[#1c1a17]">
              <Home className="size-4.5 stroke-[2]" />
              <Search className="size-4.5 stroke-[2] text-[#8e887f]" />
              <PlusSquare className="size-4.5 stroke-[2] text-[#8e887f]" />
              <Film className="size-4.5 stroke-[2] text-[#8e887f]" />
              <div className="size-4.5 rounded-full bg-[#e24b2c] flex items-center justify-center text-[8px] font-bold text-white">
                {avatarInitial}
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="flex justify-center pb-1 pt-0.5 bg-white">
              <div className="h-1 w-24 rounded-full bg-black/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Slide Selector Pill Below Phone */}
      <div className="mt-4 flex items-center gap-1.5 rounded-full border border-[#e4ddd0] bg-white p-1.5 shadow-xs">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={cn(
              "flex size-7 cursor-pointer items-center justify-center rounded-full text-xs font-semibold transition-all",
              activeSlide === idx
                ? "bg-[#e24b2c] text-white shadow-xs"
                : "text-[#5c574e] hover:bg-[#f1ece3] hover:text-[#1c1a17]",
            )}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
