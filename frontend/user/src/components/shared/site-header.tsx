import { Menu, Sparkles, X } from "lucide-react"
import { useEffect, useState } from "react"

import { AuthControls } from "@/features/auth/components/auth-controls"
import { useAuthContext } from "@/features/auth/auth-context"
import { cn } from "@/lib/utils"

type SiteHeaderProps = { active?: "features" | "pricing" | "about"; showMenuToggle?: boolean; showSignIn?: boolean }

const links = [
  ["pricing", "Pricing"],
] as const

function SiteHeader({ active, showMenuToggle = true, showSignIn = true }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openAuthModal } = useAuthContext()

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const close = () => setMenuOpen(false)
    mq.addEventListener("change", close)
    return () => mq.removeEventListener("change", close)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 shadow-[0_1px_8px_rgb(0_0_0/4%)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 items-center justify-between px-6 md:px-10" aria-label="Main navigation">
        <div className="flex items-center gap-8 md:gap-10">
          <a href="/" className="flex items-center gap-2 text-primary">
            <Sparkles className="size-8" aria-hidden="true" />
            <span className="font-heading text-xl font-semibold tracking-tight">HookSlides AI</span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {links.map(([id, label]) => <a key={id} href={`/${id}`} className={cn("text-sm font-semibold underline-offset-8 transition-colors hover:underline", active === id ? "text-primary underline" : "text-muted-foreground hover:text-foreground")}>{label}</a>)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showSignIn && <div className="hidden md:inline-flex"><AuthControls onSignIn={() => openAuthModal("login")} /></div>}
          {showMenuToggle && (
            <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="grid size-9 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          )}
        </div>
      </nav>
      {showMenuToggle && menuOpen && (
        <div className="flex flex-col gap-1 border-t border-border bg-background px-6 py-4 md:hidden">
          {links.map(([id, label]) => (
            <a key={id} href={`/${id}`} onClick={() => setMenuOpen(false)} className={cn("rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors", active === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground")}>{label}</a>
          ))}
          {showSignIn && (
            <div className="mt-2 flex items-center justify-end gap-2 border-t border-border pt-3">
              <AuthControls onSignIn={() => { setMenuOpen(false); openAuthModal("login") }} />
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export { SiteHeader }
