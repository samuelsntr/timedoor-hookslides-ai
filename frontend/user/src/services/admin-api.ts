import { apiClient } from "./api-client"

export interface AdminStats {
  totalUsers: number
  totalCarousels: number
  activeSessions: number
  planBreakdown: { plan: string; count: number }[]
  sourceTypeBreakdown: { sourceType: string; count: number }[]
  strategyBreakdown: { strategy: string; count: number }[]
  templateBreakdown: { template: string; count: number }[]
  generations7Days: { date: string; count: number }[]
  generations30Days: { date: string; count: number }[]
  recentGenerations: { date: string; count: number }[]
}

export interface AdminUserItem {
  id: string
  username: string
  plan: string
  created_at: string
  carousels_count: number
  last_active_at: string | null
  active_sessions_count: number
}

export interface AdminCarouselItem {
  id: string
  userId: string | null
  username: string
  title: string
  sourceType: string
  strategy: string
  template: string
  summary: string | null
  slideCount: number
  createdAt: string
  updatedAt: string
}

export interface SlideData {
  slideNumber: number
  type: string
  hook?: string
  content: string
  visualPrompt?: string
  engagementPrompt?: string
}

export interface AdminCarouselDetail {
  id: string
  title: string
  sourceType: string
  originalInput: string
  extractedContent: string | null
  strategy: string
  template: string
  slides: SlideData[]
  summary: string | null
  captionIdeas: string[]
  hashtags: string[]
  createdAt: string
  updatedAt: string
  user: {
    id: string | null
    username: string
  }
}

export interface AdminUserDetails {
  id: string
  username: string
  plan: string
  created_at: string
  stats: {
    total_carousels: number
    last_carousel_at: string | null
  }
  recentCarousels: {
    id: string
    title: string
    source_type: string
    strategy: string
    template: string
    created_at: string
    updated_at: string
  }[]
}

const getHeaders = (secret: string) => ({
  "x-admin-password": secret,
})

export const adminApi = {
  async verify(secret: string): Promise<boolean> {
    const res = await apiClient.get("/admin/verify", {
      headers: getHeaders(secret),
    })
    return res.data?.success === true
  },

  async getStats(secret: string): Promise<AdminStats> {
    const res = await apiClient.get<{ success: boolean; data: AdminStats }>("/admin/stats", {
      headers: getHeaders(secret),
    })
    return res.data.data
  },

  async getUsers(
    secret: string,
    params: { page?: number; limit?: number; q?: string; plan?: string } = {}
  ): Promise<{ items: AdminUserItem[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> {
    const res = await apiClient.get("/admin/users", {
      headers: getHeaders(secret),
      params,
    })
    return res.data.data
  },

  async getUserById(secret: string, id: string): Promise<AdminUserDetails> {
    const res = await apiClient.get(`/admin/users/${id}`, {
      headers: getHeaders(secret),
    })
    return res.data.data
  },

  async getCarousels(
    secret: string,
    params: { page?: number; limit?: number; q?: string; sourceType?: string; strategy?: string; userId?: string } = {}
  ): Promise<{ items: AdminCarouselItem[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> {
    const res = await apiClient.get("/admin/carousels", {
      headers: getHeaders(secret),
      params,
    })
    return res.data.data
  },

  async getCarouselById(secret: string, id: string): Promise<AdminCarouselDetail> {
    const res = await apiClient.get(`/admin/carousels/${id}`, {
      headers: getHeaders(secret),
    })
    return res.data.data
  },
}
