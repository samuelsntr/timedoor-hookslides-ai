import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import "@/styles/landing.css"

import logo from "@/assets/logohs.png"

const COUNTDOWN_SECONDS = 5
const PROGRESS_SECONDS = COUNTDOWN_SECONDS - 1
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 16

function getStrokeDashoffset(secondsLeft: number) {
  const progress = Math.min(Math.max(secondsLeft - 1, 0), PROGRESS_SECONDS)
  return CIRCLE_CIRCUMFERENCE - (progress / PROGRESS_SECONDS) * CIRCLE_CIRCUMFERENCE
}

interface TransactionState {
  planName?: string
  planId?: string
  amount?: string
  basePrice?: string
  tax?: string
  method?: string
  transactionId?: string
  timestamp?: string
}

function CheckoutSuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)

  // Retrieve state or sessionStorage fallback
  const txData: TransactionState = (() => {
    if (location.state && typeof location.state === "object") {
      return location.state as TransactionState
    }
    try {
      const saved = sessionStorage.getItem("hs_last_checkout")
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return {
      planName: "Creator",
      planId: "creator",
      amount: "13.20",
      basePrice: "12.00",
      tax: "1.20",
      method: "card",
      transactionId: "#HS-8842-AB",
      timestamp: new Date().toISOString(),
    }
  })()

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate("/generate")
      return
    }
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [secondsLeft, navigate])

  const strokeDashoffset = getStrokeDashoffset(secondsLeft)

  return (
    <div className="landing flex min-h-screen flex-col bg-[#faf7f2] font-sans text-[#1c1a17]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-[#e4ddd0] bg-[#faf7f2]/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10" aria-label="Main">
          <Link to="/" className="flex items-center gap-2.5 font-[Fraunces,serif] text-lg font-semibold tracking-tight text-[#1c1a17]">
            <img src={logo} alt="HookSlides Logo" className="size-7 object-contain" />
            <span>
              HookSlides<span className="text-[#e24b2c]">.</span>
            </span>
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e4ddd0] bg-white px-3 py-1 text-xs font-semibold text-[#16a34a]">
            <ShieldCheck className="size-3.5" />
            Payment Verified
          </span>
        </nav>
      </header>

      {/* Main Success Container */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-12 md:py-16">
        {/* Soft background ambient gradient */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40">
          <div className="size-150 rounded-full bg-gradient-to-tr from-[#f6d9cf] via-[#faf7f2] to-[#f1ece3] blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-xl">
          <div className="flex flex-col items-center rounded-[2.5rem] border border-[#e4ddd0] bg-white p-8 text-center shadow-xl sm:p-10">
            {/* Animated Success Badge Icon */}
            <div className="relative mb-6 flex size-24 items-center justify-center">
              <div
                className="absolute inset-0 animate-ping rounded-full border-2 border-[#e24b2c]/30"
                style={{ animationDuration: "2s" }}
              />
              <div
                className="absolute inset-2 animate-ping rounded-full border-2 border-[#f6d9cf]"
                style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
              />
              <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#e24b2c] to-[#f6836c] text-white shadow-lg shadow-[#e24b2c]/30">
                <Check className="size-10 stroke-[3]" />
              </div>
            </div>

            {/* Title & Subtitle */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6d9cf] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#e24b2c]">
              <Sparkles className="size-3.5" />
              Subscription Activated
            </span>

            <h1 className="mt-4 font-[Fraunces,serif] text-3xl font-bold tracking-tight text-[#1c1a17] sm:text-4xl">
              Welcome to HookSlides {txData.planName || "Creator"}!
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#5c574e] sm:text-base">
              Your payment was successful and your account tier has been updated immediately. Start generating high-converting carousels.
            </p>

            {/* Transaction Receipt Card */}
            <div className="mt-8 w-full rounded-2xl border border-[#e4ddd0] bg-[#faf7f2] p-5 text-left text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-[#e4ddd0] pb-3">
                <span className="font-semibold uppercase tracking-wider text-[#5c574e]">
                  Transaction Reference
                </span>
                <span className="font-mono font-bold text-[#1c1a17]">
                  {txData.transactionId || "#HS-8842-AB"}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-[#5c574e]">
                <div className="flex items-center justify-between">
                  <span>Subscribed Plan</span>
                  <span className="font-semibold text-[#1c1a17]">
                    HookSlides AI {txData.planName || "Creator"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Billing Interval</span>
                  <span className="font-semibold text-[#1c1a17]">Monthly Auto-Renew</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment Gateway</span>
                  <span className="font-semibold capitalize text-[#1c1a17]">
                    {txData.method === "card"
                      ? "Credit Card (Xendit)"
                      : txData.method === "qris"
                        ? "QRIS Dynamic"
                        : txData.method === "virtual-account"
                          ? "Virtual Account"
                          : "E-Wallet"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#e4ddd0] pt-2 text-base font-bold">
                  <span className="text-[#1c1a17]">Amount Paid</span>
                  <span className="font-[Fraunces,serif] text-lg text-[#e24b2c]">
                    ${txData.amount || "13.20"} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Unlocked Benefits Banner */}
            <div className="mt-5 flex w-full items-center justify-between rounded-xl border border-[#16a34a]/20 bg-[#16a34a]/5 p-3.5 text-xs text-[#16a34a]">
              <div className="flex items-center gap-2">
                <Zap className="size-4 shrink-0" />
                <span className="font-semibold">
                  {txData.planId === "pro"
                    ? "200 monthly carousels & Brand Kit unlocked"
                    : "50 monthly carousels & HD export unlocked"}
                </span>
              </div>
              <span className="font-mono font-bold">Active</span>
            </div>

            {/* Countdown Ring */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="relative flex size-12 items-center justify-center">
                <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    className="stroke-[#e4ddd0]"
                    cx="18"
                    cy="18"
                    fill="none"
                    r="16"
                    strokeWidth="3"
                  />
                  <circle
                    className="stroke-[#e24b2c] transition-all duration-1000 ease-linear"
                    cx="18"
                    cy="18"
                    fill="none"
                    r="16"
                    strokeWidth="3"
                    strokeDasharray={`${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <span className="relative z-10 text-sm font-bold text-[#e24b2c]">
                  {secondsLeft}
                </span>
              </div>
              <span className="text-xs text-[#5c574e]">
                Redirecting you to the studio in {secondsLeft}s...
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/generate")}
                className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e24b2c] py-3.5 text-sm font-bold text-white shadow-md shadow-[#e24b2c]/25 transition-all hover:bg-[#c93d21] active:scale-[0.98]"
              >
                <span>Start Creating Carousels</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Warm Editorial Footer */}
      <footer className="border-t border-[#e4ddd0] bg-[#faf7f2]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HookSlides Logo" className="size-5 object-contain" />
            <span className="font-[Fraunces,serif] text-xs font-semibold text-[#1c1a17]">
              HookSlides AI © 2026
            </span>
          </div>
          <div className="flex gap-5 text-xs text-[#5c574e]">
            <Link to="/generate" className="transition-colors hover:text-[#e24b2c]">
              Studio
            </Link>
            <a href="#support" className="transition-colors hover:text-[#e24b2c]">
              Need Help?
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { CheckoutSuccessPage }
