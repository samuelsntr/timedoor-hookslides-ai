import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight, CreditCard, Info, Loader2, LockKeyhole, ShieldCheck, Smartphone, WalletCards, TriangleAlert } from "lucide-react"

import { SiteFooter } from "@/components/shared/site-footer"
import { SiteHeader } from "@/components/shared/site-header"
import { cn } from "@/lib/utils"

type PaymentMethod = "card" | "virtual-account" | "e-wallet"

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: CreditCard },
  { id: "virtual-account", label: "Virtual Account", icon: WalletCards },
  { id: "e-wallet", label: "E-Wallet", icon: Smartphone },
] as const

const virtualAccounts = [
  { shortName: "BCA", name: "BCA Virtual Account" },
  { shortName: "MDR", name: "Mandiri Virtual Account" },
  { shortName: "BNI", name: "BNI Virtual Account" },
]

const eWallets = [
  { shortName: "O", name: "OVO", className: "bg-primary/20 text-primary" },
  { shortName: "D", name: "DANA", className: "bg-secondary/20 text-secondary" },
  { shortName: "S", name: "ShopeePay", className: "bg-destructive/20 text-destructive" },
]

function CheckoutPage() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [isPaying, setIsPaying] = useState(false)

  function handlePay() {
    setIsPaying(true)
    window.setTimeout(() => navigate("/checkout/success"), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <SiteHeader showSignIn={false} />

      <main className="w-full flex-1 bg-background">
        <div className="flex min-h-screen w-full flex-col gap-8 bg-background px-6 pb-8 pt-24 text-foreground md:px-10 md:pb-10 md:pt-24">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-heading text-3xl font-bold md:text-5xl">Secure Checkout</h1>
              <p className="text-lg text-muted-foreground">Complete your subscription for HookSlides AI Pro.</p>
            </div>

            <div className="flex w-full items-center gap-4 rounded-lg bg-destructive/15 p-4 text-destructive shadow-sm">
              <TriangleAlert className="size-5 shrink-0" />
              <span className="text-sm font-semibold">TEST MODE: NO REAL CHARGES WILL BE MADE.</span>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                <section className="flex flex-col gap-6 rounded-xl bg-card p-6 shadow-md md:p-8">
                  <h2 className="font-heading text-2xl font-semibold">Payment Method</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {paymentMethods.map(({ id, label, icon: Icon }) => {
                      const selected = paymentMethod === id
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setPaymentMethod(id)}
                          className={cn(
                            "relative flex cursor-pointer items-center justify-center gap-2 rounded-lg p-4 transition-colors hover:bg-muted",
                            selected ? "bg-primary/10 shadow-sm" : "bg-muted",
                          )}
                        >
                          {selected && (
                            <span className="absolute right-2 top-2 grid size-4 place-items-center rounded-full bg-primary">
                              <span className="size-2 rounded-full bg-primary-foreground" />
                            </span>
                          )}
                          <Icon className={cn("size-5", selected ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("text-sm font-semibold", selected ? "text-primary" : "text-muted-foreground")}>{label}</span>
                        </button>
                      )
                    })}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="flex flex-col gap-4 pt-4">
                      <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Card Number
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                          <input className="h-12 w-full rounded-lg border border-border bg-background pl-12 pr-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" placeholder="0000 0000 0000 0000" type="text" />
                        </div>
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Expiry Date
                          <input className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" placeholder="MM/YY" type="text" />
                        </label>
                        <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          CVV
                          <div className="relative">
                            <input className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" placeholder="123" type="text" />
                            <Info className="absolute right-4 top-1/2 size-4 -translate-y-1/2 cursor-help text-muted-foreground" aria-label="3 digits on back of card" />
                          </div>
                        </label>
                      </div>
                      <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Cardholder Name
                        <input className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:ring-2 focus:ring-primary" placeholder="Name on card" type="text" />
                      </label>
                    </div>
                  )}

                  {paymentMethod === "virtual-account" && (
                    <div className="flex flex-col gap-4 pt-4">
                      <p className="text-base text-muted-foreground">Select your bank to generate a Virtual Account number.</p>
                      <div className="flex flex-col gap-2">
                        {virtualAccounts.map((account) => (
                          <button key={account.name} type="button" className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted">
                            <span className="flex items-center gap-4">
                              <span className="grid h-8 w-12 place-items-center rounded bg-muted font-bold text-primary">{account.shortName}</span>
                              <span className="text-sm font-semibold">{account.name}</span>
                            </span>
                            <ChevronRight className="size-5 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {paymentMethod === "e-wallet" && (
                    <div className="flex flex-col gap-4 pt-4">
                      <p className="text-base text-muted-foreground">Choose your preferred e-wallet for payment.</p>
                      <div className="grid grid-cols-1 gap-2">
                        {eWallets.map((wallet) => (
                          <button key={wallet.name} type="button" className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted">
                            <span className="flex items-center gap-4">
                              <span className={cn("grid size-8 place-items-center rounded-full font-bold", wallet.className)}>{wallet.shortName}</span>
                              <span className="text-sm font-semibold">{wallet.name}</span>
                            </span>
                            <ChevronRight className="size-5 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </div>

              <aside className="w-full lg:w-100">
                <div className="sticky top-24 flex flex-col gap-6 rounded-xl bg-card p-6 shadow-md md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-heading text-2xl font-semibold">Order Summary</h2>
                    <span className="rounded-full bg-secondary/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">Xendit Sandbox</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between border-b border-border pb-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">HookSlides AI Pro</span>
                        <span className="text-sm text-muted-foreground">Monthly Subscription</span>
                      </div>
                      <span className="text-sm font-semibold">$19.00</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground"><span>Subtotal</span><span>$19.00</span></div>
                    <div className="flex items-center justify-between border-b border-border pb-4 text-muted-foreground"><span>Tax (10%)</span><span>$1.90</span></div>
                    <div className="flex items-center justify-between pt-1"><span className="font-heading text-2xl font-semibold">Total</span><span className="font-heading text-2xl font-semibold text-primary">$20.90</span></div>
                  </div>
                  <button type="button" disabled={isPaying} onClick={handlePay} className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground shadow-md transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg disabled:cursor-wait disabled:opacity-70">
                    {isPaying ? <><Loader2 className="size-5 animate-spin" />Processing...</> : <><LockKeyhole className="size-5" />Pay $20.90</>}
                  </button>
                  <p className="flex items-center justify-center gap-1 text-center text-sm text-muted-foreground"><ShieldCheck className="size-4" />Payments are secure and encrypted.</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

export { CheckoutPage }
