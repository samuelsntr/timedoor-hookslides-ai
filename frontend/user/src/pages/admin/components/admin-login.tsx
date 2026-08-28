import { useState } from "react"
import { Shield, KeyRound, Eye, EyeOff, AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import logo from "@/assets/logohs.png"

interface AdminLoginProps {
  onAuthenticate: (secret: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function AdminLogin({ onAuthenticate, isLoading, error }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim() || isLoading) return
    await onAuthenticate(password.trim())
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#faf7f2] p-6 antialiased font-sans text-[#1c1a17]">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-[#e24b2c]/8 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-[#e4ddd0] bg-white p-8 shadow-[0_8px_30px_rgb(0_0_0/4%)]">
        {/* Header */}
        <div className="text-center space-y-3 pb-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#faf7f2] border border-[#e4ddd0] shadow-xs">
            <img src={logo} alt="HookSlides Logo" className="size-8 object-contain" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6d9cf] px-3 py-0.5 text-xs font-semibold text-[#e24b2c]">
              <Shield className="size-3.5" />
              <span>Admin Access</span>
            </div>
            <h1 className="mt-2 font-[Fraunces,serif] text-2xl font-bold text-[#1c1a17] tracking-tight">
              HookSlides Admin
            </h1>
            <p className="mt-1 text-sm text-[#5c574e]">
              Enter your admin secret key to access dashboard analytics and management.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-[#e24b2c]/20 bg-[#f6d9cf]/50 p-3.5 text-sm text-[#e24b2c]">
              <AlertCircle className="size-4 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="admin-key" className="text-xs font-semibold uppercase tracking-wider text-[#5c574e]">
              Admin Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#5c574e]">
                <KeyRound className="size-4" />
              </div>
              <input
                id="admin-key"
                type={showPassword ? "text" : "password"}
                placeholder="Enter secret key..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoFocus
                className="w-full h-11 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] pl-10 pr-10 text-sm font-mono text-[#1c1a17] outline-none transition-all placeholder:text-[#5c574e]/50 focus:border-[#e24b2c] focus:bg-white focus:ring-2 focus:ring-[#e24b2c]/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#5c574e] hover:text-[#1c1a17] focus:outline-none cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#e24b2c] font-semibold text-white shadow-md shadow-[#e24b2c]/20 transition-all hover:bg-[#c93f24] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Unlocking...</span>
              </>
            ) : (
              <>
                <span>Enter Admin Portal</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
