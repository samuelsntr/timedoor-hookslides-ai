import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthContext } from "@/features/auth/auth-context"

import "@/styles/landing.css"

import { BeforeAfter } from "./sections/before-after"
import { FinalCta } from "./sections/final-cta"
import { Hero } from "./sections/hero"
import { HowItWorks } from "./sections/how-it-works"
import { LandingNav } from "./sections/landing-nav"
import { Problem } from "./sections/problem"
import { Showcase } from "./sections/showcase"
import { Solution } from "./sections/solution"
import { Strategies } from "./sections/strategies"
import { WhoItsFor } from "./sections/who-its-for"

function LandingPage() {
  const navigate = useNavigate()
  const { user, openAuthModal } = useAuthContext()

  // Signed in already? Skip the modal and go straight to the tool.
  const handleStart = useCallback(() => {
    if (user) {
      navigate("/generate")
      return
    }
    openAuthModal("register", () => navigate("/generate"))
  }, [user, navigate, openAuthModal])

  return (
    <div className="landing flex min-h-screen flex-col">
      <LandingNav onStart={handleStart} />

      <main className="flex-1">
        <Hero onStart={handleStart} />
        <Problem />
        <Solution />
        <HowItWorks />
        <Strategies />
        <Showcase />
        <BeforeAfter />
        <WhoItsFor />
        <FinalCta onStart={handleStart} />
      </main>

      <footer className="border-t border-[#e4ddd0] bg-[#faf7f2]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
          <span className="font-[Fraunces,serif] text-sm font-semibold text-[#1c1a17]">HookSlides AI © 2026</span>
          <div className="flex gap-6 text-sm text-[#5c574e]">
            <a href="#privacy" className="transition-colors hover:text-[#e24b2c]">
              Privacy
            </a>
            <a href="#terms" className="transition-colors hover:text-[#e24b2c]">
              Terms
            </a>
            <a href="#support" className="transition-colors hover:text-[#e24b2c]">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { LandingPage }
