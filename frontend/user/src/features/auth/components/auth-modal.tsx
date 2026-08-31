import { type FormEvent, useEffect, useState } from "react"
import { Eye, EyeOff, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useAuthContext } from "../auth-context"

type AuthMode = "login" | "register"

type AuthModalProps = {
  open: boolean
  mode?: AuthMode
  onClose: () => void
}

function AuthModal({ open, mode: initialMode = "login", onClose }: AuthModalProps) {
  const { authenticate, error, isLoading, clearError, closeAuthModal, openAuthModal, authModal: { onSuccess } } = useAuthContext()
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmationPassword, setConfirmationPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setUsername("")
      setPassword("")
      setConfirmationPassword("")
      setShowPassword(false)
      setValidationError(null)
      clearError()
    }
  }, [clearError, initialMode, open])

  function handleClose() {
    setUsername("")
    setPassword("")
    setShowPassword(false)
    setValidationError(null)
    clearError()
    onClose()
  }

  if (!open) return null

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode)
    setValidationError(null)
    openAuthModal(nextMode)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!username.trim() || !password) {
      setValidationError("Username and password are required.")
      return
    }
    if (mode === "register" && password.length < 12) {
      setValidationError("Password must be at least 12 characters.")
      return
    }
    if (mode === "register" && password !== confirmationPassword) {
      setValidationError("Passwords do not match.")
      return
    }
    try {
      await authenticate({ username: username.trim(), password }, mode)
      closeAuthModal()
      onSuccess?.()
    } catch {
      // The hook exposes the API error below the form.
    }
  }

  return (
    <div className="fixed inset-0 z-100 grid place-items-center bg-black/50 p-6 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) handleClose() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="auth-modal-title" className="font-heading text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{mode === "login" ? "Sign in to generate your carousel." : "Register to start creating carousels."}</p>
          </div>
          <button type="button" onClick={handleClose} aria-label="Close authentication modal" className="grid size-8 cursor-pointer place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><X className="size-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="auth-username">Username</Label>
            <Input id="auth-username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" disabled={isLoading} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="auth-password">Password</Label>
            <div className="relative">
              <Input id="auth-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} disabled={isLoading} className="pr-10" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 grid w-10 cursor-pointer place-items-center text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          {mode === "register" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="auth-confirmation-password">Confirmation Password</Label>
              <Input id="auth-confirmation-password" type="password" value={confirmationPassword} onChange={(event) => setConfirmationPassword(event.target.value)} autoComplete="new-password" disabled={isLoading} />
            </div>
          )}
          {(validationError || error) && <p role="alert" className="text-sm text-destructive">{validationError || error}</p>}
          <Button type="submit" disabled={isLoading} className="mt-2 w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80">{isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Sign Up"}</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => switchMode(mode === "login" ? "register" : "login")} className="cursor-pointer font-medium text-primary hover:underline">{mode === "login" ? "Sign Up" : "Sign In"}</button>
        </p>
      </section>
    </div>
  )
}

export { AuthModal }
