import { createContext, useContext, useState, type ReactNode } from "react"

import { useAuth } from "./hooks/use-auth"

type AuthMode = "login" | "register"
type AuthContextValue = ReturnType<typeof useAuth> & {
  authModal: { open: boolean; mode: AuthMode; onSuccess?: () => void }
  openAuthModal: (mode?: AuthMode, onSuccess?: () => void) => void
  closeAuthModal: () => void
  signOutModal: boolean
  openSignOutModal: () => void
  closeSignOutModal: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: AuthMode; onSuccess?: () => void }>({ open: false, mode: "login" })
  const [signOutModal, setSignOutModal] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        authModal,
        openAuthModal: (mode = "login", onSuccess) => setAuthModal({ open: true, mode, onSuccess }),
        closeAuthModal: () => setAuthModal((current) => ({ ...current, open: false })),
        signOutModal,
        openSignOutModal: () => setSignOutModal(true),
        closeSignOutModal: () => setSignOutModal(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuthContext() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error("useAuthContext must be used inside AuthProvider")
  return auth
}

export { AuthProvider, useAuthContext }
