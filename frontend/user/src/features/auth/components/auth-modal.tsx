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

function AuthModal({
  open,
  onClose,
}: AuthModalProps) {
  const {
    authenticate,
    error,
    isLoading,
    clearError,
    closeAuthModal,
    openAuthModal,
    authModal: { onSuccess },
  } = useAuthContext()

  const [mode, setMode] = useState<AuthMode>("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmationPassword, setConfirmationPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setMode("login")
      setUsername("")
      setPassword("")
      setConfirmationPassword("")
      setShowPassword(false)
      setShowConfirmationPassword(false)
      setValidationError(null)
      clearError()
    }
  }, [clearError, open])

  function handleClose() {
    setUsername("")
    setPassword("")
    setConfirmationPassword("")
    setShowPassword(false)
    setShowConfirmationPassword(false)
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
      await authenticate(
        {
          username: username.trim(),
          password,
        },
        mode
      )

      closeAuthModal()
      onSuccess?.()

      window.location.href = "/generate"
    } catch {
      // The hook exposes the API error below the form.
    }
  }

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-[#1C1A17]/40 p-6 backdrop-blur-sm font-['Inter',ui-sans-serif,system-ui,sans-serif]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="w-full max-w-md rounded-2xl border border-[#E4DDD0] bg-[#FFFFFF] p-6 shadow-[0_30px_70px_-28px_rgba(28,26,23,0.45)] md:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="auth-modal-title"
              className="font-['Fraunces',ui-serif,Georgia,serif] text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#1C1A17]"
            >
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>

            <p className="mt-1.5 text-[15px] leading-[1.6] text-[#5C574E]">
              {mode === "login"
                ? "Sign in to generate your carousel."
                : "Register to start creating carousels."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close authentication modal"
            className="grid size-8 cursor-pointer place-items-center rounded-full text-[#5C574E] transition-colors hover:bg-[#F1ECE3] hover:text-[#1C1A17]"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            <Label
              htmlFor="auth-username"
              className="font-medium text-[#1C1A17]"
            >
              Username
            </Label>

            <Input
              id="auth-username"
              className="rounded-xl border-[#E4DDD0] bg-[#FFFFFF] text-[#1C1A17] focus-visible:ring-[#E24B2C]"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label
              htmlFor="auth-password"
              className="font-medium text-[#1C1A17]"
            >
              Password
            </Label>

            <div className="relative">
              <Input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                disabled={isLoading}
                className="rounded-xl border-[#E4DDD0] bg-[#FFFFFF] pr-10 text-[#1C1A17] focus-visible:ring-[#E24B2C]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-0 grid w-11 cursor-pointer place-items-center text-[#5C574E] hover:text-[#1C1A17]"
              >
                {showPassword ? (
                  <EyeOff className="size-4" strokeWidth={2} />
                ) : (
                  <Eye className="size-4" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div className="flex flex-col gap-2.5">
              <Label
                htmlFor="auth-confirmation-password"
                className="font-medium text-[#1C1A17]"
              >
                Confirmation Password
              </Label>

              <div className="relative">
                <Input
                  id="auth-confirmation-password"
                  type={
                    showConfirmationPassword ? "text" : "password"
                  }
                  value={confirmationPassword}
                  onChange={(event) =>
                    setConfirmationPassword(event.target.value)
                  }
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="rounded-xl border-[#E4DDD0] bg-[#FFFFFF] pr-10 text-[#1C1A17] focus-visible:ring-[#E24B2C]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmationPassword((visible) => !visible)
                  }
                  aria-label={
                    showConfirmationPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                  className="absolute inset-y-0 right-0 grid w-11 cursor-pointer place-items-center text-[#5C574E] hover:text-[#1C1A17]"
                >
                  {showConfirmationPassword ? (
                    <EyeOff className="size-4" strokeWidth={2} />
                  ) : (
                    <Eye className="size-4" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
          )}

          {(validationError || error) && (
            <p
              role="alert"
              className="mt-1 text-[14px] font-medium text-[#B3261E]"
            >
              {validationError || error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full cursor-pointer rounded-full bg-[#E24B2C] py-6 text-[15px] font-medium text-[#FFFDF9] transition-all hover:-translate-y-[1px] hover:bg-[#C93D21] hover:shadow-sm"
          >
            {isLoading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Sign Up"}
          </Button>
        </form>

        <p className="mt-6 text-center text-[15px] text-[#5C574E]">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}

          <button
            type="button"
            onClick={() =>
              switchMode(mode === "login" ? "register" : "login")
            }
            className="cursor-pointer font-medium text-[#1C1A17] transition-colors hover:text-[#E24B2C] hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </section>
    </div>
  )
}

export { AuthModal }
