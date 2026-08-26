export interface AuthUser {
  id: number | string
  username: string
}

export interface AuthCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: AuthUser | null
}
