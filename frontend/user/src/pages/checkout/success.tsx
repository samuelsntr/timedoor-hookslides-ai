import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const COUNTDOWN_SECONDS = 5
const PROGRESS_SECONDS = COUNTDOWN_SECONDS - 1
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 16

function getStrokeDashoffset(secondsLeft: number) {
  const progress = Math.min(Math.max(secondsLeft - 1, 0), PROGRESS_SECONDS)
  return CIRCLE_CIRCUMFERENCE - (progress / PROGRESS_SECONDS) * CIRCLE_CIRCUMFERENCE
}

function CheckoutSuccessPage() {
  const navigate = useNavigate()
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate("/")
      return
    }
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [secondsLeft, navigate])

  const strokeDashoffset = getStrokeDashoffset(secondsLeft)

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-6">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-20">
        <div className="size-200 animate-pulse rounded-full bg-linear-to-br from-primary via-secondary to-background blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-120 flex-col items-center justify-center overflow-hidden rounded-3xl bg-card p-8 text-center shadow-xl">
        <div className="relative mb-6 flex size-32 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-secondary opacity-20" style={{ animationDuration: "1.5s" }} />
          <div className="absolute inset-2 animate-ping rounded-full border-2 border-primary opacity-40" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
          <div className="relative flex size-24 items-center justify-center rounded-full bg-linear-to-tr from-primary to-secondary shadow-md transition-transform duration-500 hover:scale-110">
            <CheckCircle2 className="size-12 text-primary-foreground" />
          </div>
        </div>

        <h1 className="mb-2 font-heading text-4xl font-bold text-foreground">Payment Successful!</h1>
        <p className="mb-8 max-w-80 text-lg text-muted-foreground">Your account has been upgraded to Premium. Get ready to experience the full power of HookSlides AI.</p>

        <div className="mb-8 flex w-full flex-col gap-2 rounded-xl bg-muted p-6 text-left">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Transaction ID</span>
            <span className="font-mono text-base text-foreground">#TXN-8842-AB</span>
          </div>
          <div className="my-1 h-px w-full bg-border" />
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Amount Paid</span>
            <span className="text-base font-semibold text-foreground">$20.90 USD</span>
          </div>
        </div>

        <div className="mb-8 flex w-full flex-col items-center gap-4">
          <p className="text-base text-muted-foreground">Redirecting to the main menu in</p>
          <div className="relative flex size-16 items-center justify-center">
            <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-border" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
              <circle className="stroke-primary transition-all duration-1000 ease-linear" cx="18" cy="18" fill="none" r="16" strokeWidth="3" strokeDasharray={`${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`} strokeDashoffset={strokeDashoffset} />
            </svg>
            <span className="relative z-10 block pt-1 text-3xl font-bold leading-none text-primary">{secondsLeft}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          Go to Main Menu
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </main>
  )
}

export { CheckoutSuccessPage }
