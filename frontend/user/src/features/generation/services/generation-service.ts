import { apiClient } from "@/services/api-client"
import type { GenerateCarouselRequest, GenerateCarouselResponse } from "../types"

async function generateCarousel(request: GenerateCarouselRequest): Promise<GenerateCarouselResponse> {
  const { data } = await apiClient.post<{ data: GenerateCarouselResponse }>("/generate", request)
  return data.data
}

export { generateCarousel }
