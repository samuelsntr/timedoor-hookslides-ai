import { useCallback, useEffect, useState } from "react"

import {
  getAuthUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth-service"
import type { AuthCredentials, AuthUser } from "../types"

function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = error.response
    if (typeof response === "object" && response !== null && "data" in response) {
      const data = response.data
      if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") {
        return data.message
      }
    }
  }
  return error instanceof Error ? error.message : fallback
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const response = await getCurrentUser()
      setUser(getAuthUser(response.data))
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  async function authenticate(credentials: AuthCredentials, mode: "login" | "register") {
    setIsLoading(true)
    setError(null)
    try {
      const response = mode === "login"
        ? await loginUser(credentials)
        : await registerUser(credentials)
      const authenticatedUser = getAuthUser(response.data)
      setUser(authenticatedUser)
      return authenticatedUser
    } catch (error) {
      const message = getErrorMessage(error, "Authentication failed.")
      setError(message)
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    setIsLoading(true)
    setError(null)
    try {
      await logoutUser()
      setUser(null)
    } catch (error) {
      const message = getErrorMessage(error, "Sign out failed.")
      setError(message)
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { user, isLoading, error, authenticate, signOut, refresh, clearError }
}
