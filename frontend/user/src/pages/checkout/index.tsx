import { useState, useMemo } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Info,
  Loader2,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  WalletCards,
  Zap,
} from "lucide-react"

import "@/styles/landing.css"

import logo from "@/assets/logohs.png"
import { cn } from "@/lib/utils"

type PaymentMethod = "card" | "virtual-account" | "e-wallet" | "qris"

type PlanType = "creator" | "pro"

interface PlanDetails {
  id: PlanType
  name: string
  price: number
  description: string
  features: string[]
  badge: string
}

const PLANS: Record<PlanType, PlanDetails> = {
  creator: {
    id: "creator",
    name: "Creator",
    price: 12,
    badge: "Most Popular",
    description: "Create consistently without spending hours designing.",
    features: [
      "50 carousels/month",
      "All templates included",
      "AI Strategy suggestions",
      "Canvas Editor",
      "HD export (PNG & PDF)",
      "No watermark",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 29,
    badge: "Power User",
    description: "For creators and businesses serious about content.",
    features: [
      "200 carousels/month",
      "Everything in Creator",
      "Advanced AI strategies",
      "Brand Kit & Custom Fonts",
      "Priority generation",
      "Priority support",
    ],
  },
}

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: CreditCard, subtitle: "Visa, Mastercard, JCB" },
  { id: "qris", label: "QRIS", icon: QrCode, subtitle: "Instant QR Payment" },
  { id: "virtual-account", label: "Virtual Account", icon: WalletCards, subtitle: "BCA, Mandiri, BNI, BRI" },
  { id: "e-wallet", label: "E-Wallet", icon: Smartphone, subtitle: "GoPay, OVO, DANA, ShopeePay" },
] as const

const virtualAccounts = [
  { shortName: "BCA", name: "BCA Virtual Account", desc: "Automatic verification" },
  { shortName: "MDR", name: "Mandiri Virtual Account", desc: "Automatic verification" },
  { shortName: "BNI", name: "BNI Virtual Account", desc: "Automatic verification" },
  { shortName: "BRI", name: "BRI Virtual Account", desc: "Automatic verification" },
]

const eWallets = [
  { shortName: "G", name: "GoPay", color: "bg-[#00AA13] text-white" },
  { shortName: "O", name: "OVO", color: "bg-[#4C3494] text-white" },
  { shortName: "D", name: "DANA", color: "bg-[#118EEA] text-white" },
  { shortName: "S", name: "ShopeePay", color: "bg-[#EE4D2D] text-white" },
]

function CheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const initialPlan = (searchParams.get("plan")?.toLowerCase() === "pro" ? "pro" : "creator") as PlanType
  const [selectedPlanId, setSelectedPlanId] = useState<PlanType>(initialPlan)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [selectedBank, setSelectedBank] = useState<string>("BCA")
  const [selectedWallet, setSelectedWallet] = useState<string>("GoPay")
  const [isPaying, setIsPaying] = useState(false)

  // Card form state
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242")
  const [cardExpiry, setCardExpiry] = useState("12/28")
  const [cardCvv, setCardCvv] = useState("888")
  const [cardName, setCardName] = useState("Alex Morgan")

  const currentPlan = PLANS[selectedPlanId]
  const basePrice = currentPlan.price
  const tax = useMemo(() => Number((basePrice * 0.1).toFixed(2)), [basePrice])
  const total = useMemo(() => (basePrice + tax).toFixed(2), [basePrice, tax])

  function handlePay() {
    setIsPaying(true)
    const transactionData = {
      planName: currentPlan.name,
      planId: selectedPlanId,
      amount: total,
      basePrice: basePrice.toFixed(2),
      tax: tax.toFixed(2),
      method: paymentMethod,
      timestamp: new Date().toISOString(),
      transactionId: `HS-${Math.floor(100000 + Math.random() * 900000)}`,
    }

    try {
      sessionStorage.setItem("hs_last_checkout", JSON.stringify(transactionData))
    } catch {
      // ignore storage error
    }

    window.setTimeout(() => {
      navigate("/checkout/success", { state: transactionData })
    }, 1200)
  }

  return (
    <div className="landing flex min-h-screen flex-col bg-[#faf7f2] font-sans text-[#1c1a17]">
      {/* Warm Editorial Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#e4ddd0] bg-[#faf7f2]/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10" aria-label="Main">
          <Link to="/" className="flex items-center gap-2.5 font-[Fraunces,serif] text-lg font-semibold tracking-tight text-[#1c1a17]">
            <img src={logo} alt="HookSlides Logo" className="size-7 object-contain" />
            <span>
              HookSlides<span className="text-[#e24b2c]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#5c574e] transition-colors hover:text-[#1c1a17]"
            >
              <ArrowLeft className="size-3.5" />
              Back to Pricing
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-6 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e4ddd0] bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e] shadow-xs">
                  <LockKeyhole className="size-3 text-[#e24b2c]" />
                  256-Bit SSL Encrypted Checkout
                </span>
                <h1 className="mt-3 font-[Fraunces,serif] text-3xl font-bold tracking-tight text-[#1c1a17] sm:text-4xl">
                  Complete your subscription
                </h1>
                <p className="mt-1 text-sm text-[#5c574e]">
                  Unlock unlimited potential and elevate your content with HookSlides AI.
                </p>
              </div>

              {/* Plan Switcher Pills */}
              <div className="flex items-center rounded-full border border-[#e4ddd0] bg-white p-1 shadow-xs">
                {(["creator", "pro"] as PlanType[]).map((pId) => {
                  const p = PLANS[pId]
                  const active = selectedPlanId === pId
                  return (
                    <button
                      key={pId}
                      type="button"
                      onClick={() => setSelectedPlanId(pId)}
                      className={cn(
                        "flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all",
                        active
                          ? "bg-[#1c1a17] text-[#faf7f2] shadow-xs"
                          : "text-[#5c574e] hover:text-[#1c1a17]",
                      )}
                    >
                      {p.name} (${p.price}/mo)
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Test Mode Banner */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#e4ddd0] bg-[#f1ece3]/70 px-4 py-3 text-xs font-semibold text-[#5c574e]">
              <TriangleAlert className="size-4 shrink-0 text-[#e24b2c]" />
              <span>
                <strong className="text-[#1c1a17]">Sandbox Test Mode:</strong> No real payment will be deducted. You can test the checkout workflow freely.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Payment Methods & Details */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              {/* Payment Method Selector Card */}
              <section className="rounded-[2rem] border border-[#e4ddd0] bg-white p-6 shadow-sm md:p-8">
                <h2 className="font-[Fraunces,serif] text-xl font-bold text-[#1c1a17]">
                  Select Payment Method
                </h2>
                <p className="mt-1 text-xs text-[#5c574e]">
                  Choose your preferred secure payment gateway option.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {paymentMethods.map(({ id, label, icon: Icon }) => {
                    const isSelected = paymentMethod === id
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={cn(
                          "relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-all cursor-pointer",
                          isSelected
                            ? "border-2 border-[#e24b2c] bg-[#faf7f2] shadow-xs"
                            : "border-[#e4ddd0] bg-white hover:border-[#1c1a17]/40 hover:bg-[#faf7f2]/50",
                        )}
                      >
                        {isSelected && (
                          <span className="absolute top-2.5 right-2.5 flex size-4 items-center justify-center rounded-full bg-[#e24b2c] text-white">
                            <Check className="size-2.5 stroke-[3]" />
                          </span>
                        )}
                        <div
                          className={cn(
                            "flex size-10 items-center justify-center rounded-full",
                            isSelected ? "bg-[#f6d9cf] text-[#e24b2c]" : "bg-[#f1ece3] text-[#5c574e]",
                          )}
                        >
                          <Icon className="size-5" />
                        </div>
                        <span className={cn("text-xs font-bold", isSelected ? "text-[#e24b2c]" : "text-[#1c1a17]")}>
                          {label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Card Form */}
                {paymentMethod === "card" && (
                  <div className="mt-8 space-y-4 rounded-2xl border border-[#e4ddd0] bg-[#faf7f2]/60 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1c1a17]">
                        Credit / Debit Card Details
                      </span>
                      <span className="text-[11px] font-medium text-[#5c574e]">Instant activation</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5c574e] mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#5c574e]" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="h-11 w-full rounded-xl border border-[#e4ddd0] bg-white pl-10 pr-4 text-sm font-medium text-[#1c1a17] shadow-2xs outline-none transition-all focus:border-[#e24b2c] focus:ring-2 focus:ring-[#e24b2c]/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#5c574e] mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="h-11 w-full rounded-xl border border-[#e4ddd0] bg-white px-3.5 text-sm font-medium text-[#1c1a17] shadow-2xs outline-none transition-all focus:border-[#e24b2c] focus:ring-2 focus:ring-[#e24b2c]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5c574e] mb-1">
                          CVV / CVC
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="h-11 w-full rounded-xl border border-[#e4ddd0] bg-white px-3.5 text-sm font-medium text-[#1c1a17] shadow-2xs outline-none transition-all focus:border-[#e24b2c] focus:ring-2 focus:ring-[#e24b2c]/20"
                          />
                          <Info className="absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#5c574e]" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#5c574e] mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="h-11 w-full rounded-xl border border-[#e4ddd0] bg-white px-3.5 text-sm font-medium text-[#1c1a17] shadow-2xs outline-none transition-all focus:border-[#e24b2c] focus:ring-2 focus:ring-[#e24b2c]/20"
                      />
                    </div>
                  </div>
                )}

                {/* QRIS Form */}
                {paymentMethod === "qris" && (
                  <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-[#e4ddd0] bg-[#faf7f2]/60 p-6 text-center">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-white border border-[#e4ddd0] shadow-xs">
                      <QrCode className="size-8 text-[#1c1a17]" />
                    </div>
                    <h3 className="mt-3 font-[Fraunces,serif] text-base font-bold text-[#1c1a17]">
                      QRIS Dynamic Code
                    </h3>
                    <p className="mt-1 max-w-xs text-xs text-[#5c574e]">
                      A dynamic QR code will be generated upon clicking proceed. Scan with BCA, GoPay, OVO, ShopeePay, or any banking app.
                    </p>
                  </div>
                )}

                {/* Virtual Account Form */}
                {paymentMethod === "virtual-account" && (
                  <div className="mt-8 space-y-2.5">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#1c1a17] mb-2">
                      Select Bank for Virtual Account
                    </span>
                    {virtualAccounts.map((account) => {
                      const isSelected = selectedBank === account.shortName
                      return (
                        <button
                          key={account.shortName}
                          type="button"
                          onClick={() => setSelectedBank(account.shortName)}
                          className={cn(
                            "flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all",
                            isSelected
                              ? "border-[#e24b2c] bg-[#faf7f2]"
                              : "border-[#e4ddd0] bg-white hover:bg-[#faf7f2]/50",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-12 items-center justify-center rounded-lg bg-[#f1ece3] font-mono text-xs font-bold text-[#1c1a17]">
                              {account.shortName}
                            </span>
                            <div className="text-left">
                              <p className="text-xs font-bold text-[#1c1a17]">{account.name}</p>
                              <p className="text-[11px] text-[#5c574e]">{account.desc}</p>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex size-5 items-center justify-center rounded-full border",
                              isSelected ? "border-[#e24b2c] bg-[#e24b2c] text-white" : "border-[#e4ddd0]",
                            )}
                          >
                            {isSelected && <Check className="size-3 stroke-[3]" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* E-Wallet Form */}
                {paymentMethod === "e-wallet" && (
                  <div className="mt-8 space-y-2.5">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#1c1a17] mb-2">
                      Select E-Wallet Provider
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {eWallets.map((wallet) => {
                        const isSelected = selectedWallet === wallet.name
                        return (
                          <button
                            key={wallet.name}
                            type="button"
                            onClick={() => setSelectedWallet(wallet.name)}
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all",
                              isSelected
                                ? "border-[#e24b2c] bg-[#faf7f2]"
                                : "border-[#e4ddd0] bg-white hover:bg-[#faf7f2]/50",
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={cn(
                                  "flex size-7 items-center justify-center rounded-full text-xs font-bold",
                                  wallet.color,
                                )}
                              >
                                {wallet.shortName}
                              </span>
                              <span className="text-xs font-bold text-[#1c1a17]">{wallet.name}</span>
                            </div>
                            <div
                              className={cn(
                                "flex size-4.5 items-center justify-center rounded-full border",
                                isSelected ? "border-[#e24b2c] bg-[#e24b2c] text-white" : "border-[#e4ddd0]",
                              )}
                            >
                              {isSelected && <Check className="size-2.5 stroke-[3]" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </section>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 rounded-2xl border border-[#e4ddd0] bg-white p-3.5 text-xs text-[#5c574e]">
                  <ShieldCheck className="size-4 shrink-0 text-[#16a34a]" />
                  <span>Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl border border-[#e4ddd0] bg-white p-3.5 text-xs text-[#5c574e]">
                  <Zap className="size-4 shrink-0 text-[#e24b2c]" />
                  <span>Instant Account Upgrade</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl border border-[#e4ddd0] bg-white p-3.5 text-xs text-[#5c574e]">
                  <LockKeyhole className="size-4 shrink-0 text-[#1c1a17]" />
                  <span>Cancel Anytime in 1-Click</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-5">
              <aside className="sticky top-24 rounded-[2rem] border-2 border-[#e4ddd0] bg-white p-6 shadow-md md:p-8">
                <div className="flex items-center justify-between border-b border-[#e4ddd0] pb-4">
                  <h2 className="font-[Fraunces,serif] text-xl font-bold text-[#1c1a17]">
                    Order Summary
                  </h2>
                  <span className="rounded-full bg-[#f6d9cf] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#e24b2c]">
                    {currentPlan.badge}
                  </span>
                </div>

                {/* Plan Info */}
                <div className="mt-5 rounded-2xl border border-[#e4ddd0] bg-[#faf7f2] p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-[Fraunces,serif] text-base font-bold text-[#1c1a17]">
                        HookSlides AI {currentPlan.name}
                      </h3>
                      <p className="text-xs text-[#5c574e]">Monthly Subscription</p>
                    </div>
                    <span className="font-[Fraunces,serif] text-lg font-bold text-[#1c1a17]">
                      ${basePrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Included features pill */}
                  <ul className="mt-3 space-y-1.5 border-t border-[#e4ddd0]/70 pt-3">
                    {currentPlan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#5c574e]">
                        <Check className="size-3 text-[#e24b2c]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 space-y-2.5 border-b border-[#e4ddd0] pb-5 text-sm text-[#5c574e]">
                  <div className="flex justify-between">
                    <span>Base Subscription</span>
                    <span className="font-semibold text-[#1c1a17]">${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (10%)</span>
                    <span className="font-semibold text-[#1c1a17]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#16a34a]">
                    <span>Setup / Activation Fee</span>
                    <span>FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="font-[Fraunces,serif] text-lg font-bold text-[#1c1a17]">
                    Total Due Today
                  </span>
                  <div className="text-right">
                    <span className="font-[Fraunces,serif] text-2xl font-bold text-[#e24b2c]">
                      ${total}
                    </span>
                    <span className="block text-[11px] text-[#5c574e]">USD / billed monthly</span>
                  </div>
                </div>

                {/* Checkout CTA Button */}
                <button
                  type="button"
                  disabled={isPaying}
                  onClick={handlePay}
                  className="mt-6 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e24b2c] px-6 text-sm font-bold text-white shadow-md shadow-[#e24b2c]/25 transition-all hover:bg-[#c93d21] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e24b2c] active:scale-[0.98] disabled:cursor-wait disabled:opacity-75"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="size-4.5 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="size-4" />
                      <span>Pay ${total} & Activate</span>
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[11px] leading-relaxed text-[#5c574e]">
                  By confirming payment, you agree to HookSlides AI Terms of Service. You can cancel your subscription anytime with no cancellation fees.
                </p>
              </aside>
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
              HookSlides AI Secure Checkout © 2026
            </span>
          </div>
          <div className="flex gap-5 text-xs text-[#5c574e]">
            <Link to="/pricing" className="transition-colors hover:text-[#e24b2c]">
              Change Plan
            </Link>
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

export { CheckoutPage }
