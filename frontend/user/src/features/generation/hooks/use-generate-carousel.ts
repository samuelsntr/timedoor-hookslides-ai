import { useState } from "react"
import { dummyCarousel } from "../data"
import { generateCarousel } from "../services/generation-service"
import type { Carousel, GenerateCarouselRequest } from "../types"

function useGenerateCarousel() {
  const [carousel, setCarousel] = useState<Carousel>(dummyCarousel)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [limitModalOpen, setLimitModalOpen] = useState(false)

  async function generate(request: GenerateCarouselRequest) {
    setIsGenerating(true)
    setError(null)
    setLimitModalOpen(false)

    try {
      const response = await generateCarousel(request)
      setCarousel({
        slides: response.slides.map((slide) => ({
          type: slide.type,
          title: slide.heading,
          description: slide.body,
        })),
        captionIdeas: response.captionIdeas?.slice(0, 3) ?? dummyCarousel.captionIdeas,
        hashtags: response.hashtags?.slice(0, 10) ?? dummyCarousel.hashtags,
      })
    } catch (caughtError: unknown) {
      const responseData = typeof caughtError === "object" && caughtError !== null && "response" in caughtError
        ? (caughtError as { response?: { data?: unknown } }).response?.data
        : undefined
      const errorCode = typeof responseData === "object" && responseData !== null && "error" in responseData && typeof responseData.error === "object" && responseData.error !== null && "code" in responseData.error
        ? responseData.error.code
        : undefined

      if (errorCode === "GENERATION_LIMIT_REACHED") {
        setLimitModalOpen(true)
      } else {
        setError("Unable to generate carousel. Try again.")
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return { carousel, isGenerating, error, setError, limitModalOpen, setLimitModalOpen, generate }
}

export { useGenerateCarousel }
