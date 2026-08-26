import { apiClient } from "@/services/api-client"

import type { AuthCredentials, AuthResponse, AuthUser } from "../types"

export function registerUser(credentials: AuthCredentials) {
  return apiClient.post<AuthResponse>("/auth/register", credentials)
}

export function loginUser(credentials: AuthCredentials) {
  return apiClient.post<AuthResponse>("/auth/login", credentials)
}

export function getCurrentUser() {
  return apiClient.get<AuthResponse>("/auth/me")
}

export function logoutUser() {
  return apiClient.post<AuthResponse>("/auth/logout")
}

export function getAuthUser(response: AuthResponse): AuthUser {
  if (!response.data) throw new Error("Authenticated user is missing")
  return response.data
}
