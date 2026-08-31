import { cn } from "@/lib/utils"
import type { Slide } from "./types"
import logoBlack from "@/assets/td-logo-black.png"
import logoWhite from "@/assets/td-logo-white.png"

// Slide 1, 4, 6: Hijau Timedoor (#10af13)
// Slide 2, 5: Biru Dominan (#112233)
// Slide 3: Putih (#ffffff) dengan teks utama gelap dan aksen hijau Timedoor
const SLIDE_BACKGROUNDS = [
  "bg-[#10af13] text-[#ffffff]", // Slide 1 (Hijau)
  "bg-[#112233] text-[#faf7f2]", // Slide 2 (Biru)
  "bg-[#ffffff] text-[#1c1a17]", // Slide 3 (Putih)
  "bg-[#10af13] text-[#ffffff]", // Slide 4 (Hijau)
  "bg-[#112233] text-[#faf7f2]", // Slide 5 (Biru)
  "bg-[#10af13] text-[#ffffff]", // Slide 6 (Hijau)
]

/** Template Four — 6 jenis slide dengan penyesuaian khusus pada slide terakhir (CTA) tanpa bar/garis progress */
function TemplateFour({ slide, index, className }: { slide: Slide; index: number; className?: string }) {
  const isOpener = slide.type === "hook"
  const isLastSlide = index === 5 // Slide ke-6 (indeks 5) sebagai slide penutup/CTA
  const bgClass = SLIDE_BACKGROUNDS[index % SLIDE_BACKGROUNDS.length]
  const isWhiteBg = index === 2

  return (
    <div
      className={cn(
        "slide-card relative flex w-full flex-col overflow-hidden rounded-[4%] p-[8%] font-sans",
        bgClass,
        className,
      )}
    >
      {/* Timedoor Branding Kit Header — Ukuran cqw conditional */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <img
            src={isWhiteBg ? logoBlack : logoWhite}
            alt="Timedoor Logo"
            className={cn(
              "w-auto object-contain",
              isWhiteBg ? "h-[5cqw]" : "h-[4cqw]"
            )}
          />
        </div>

        <div className="opacity-95">
          <span className={cn("font-mono text-[4cqw] font-bold tracking-wider", isWhiteBg ? "text-[#1c1a17]" : "text-[#ffffff]")}>
            www.timedoor.net
          </span>
        </div>
      </div>

      {/* Slide Kicker / Number */}
      <div className="mt-[6%]">
        {isOpener ? (
          <span className={cn("slide-kicker font-bold uppercase", isWhiteBg ? "text-[#10af13]" : "text-[#ffeb3b]")}>Start here</span>
        ) : (
          <span className={cn("slide-numeral font-[Fraunces,serif] font-semibold", isWhiteBg ? "text-[#10af13]" : "text-[#ffeb3b]")}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <h3
        className={cn(
          "mt-[4%] font-[Fraunces,serif] font-semibold",
          isOpener ? "slide-heading-lg" : "slide-heading",
          isWhiteBg ? "text-[#1c1a17]" : "text-[#ffffff]",
        )}
      >
        {slide.heading}
      </h3>

      <p className={cn("slide-body mt-[6%]", isWhiteBg ? "text-[#1c1a17]/80" : "text-[#ffffff]/90")}>
        {slide.body}
      </p>

      {/* Footer Conditional: Slide terakhir menggunakan format teks bawah ala gambar terakhir, slide lain menggunakan progress dots */}
      {isLastSlide ? (
        <div className="mt-auto flex w-full items-center justify-between pt-[4%]">
          <span className="font-sans text-[5cqw] font-medium tracking-wide text-[#ffffff]">
            Visit our Web →
          </span>
          <span className="font-mono text-[4cqw] font-bold tracking-wider text-[#ffeb3b]">
            timedoor.net
          </span>
        </div>
      ) : (
        <div className="mt-auto flex gap-[1.5%]" aria-hidden="true">
          {Array.from({ length: 6 }, (_, dot) => (
            <span
              key={dot}
              className={cn(
                "h-[1.2cqw] flex-1 rounded-full",
                dot === index ? (isWhiteBg ? "bg-[#10af13]" : "bg-[#ffeb3b]") : isWhiteBg ? "bg-[#1c1a17]/20" : "bg-[#ffffff]/30",
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { TemplateFour }