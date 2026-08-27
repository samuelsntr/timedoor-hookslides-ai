import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthContext } from "@/features/auth/auth-context"
import { CheckCircle2, ChevronDown, CreditCard, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/shared/site-footer"
import { SiteHeader } from "@/components/shared/site-header"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      { label: "3 carousels/mo", highlight: false },
      { label: "Basic templates", highlight: false },
      { label: "Standard export", highlight: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "$19",
    features: [
      { label: "Unlimited carousels", highlight: false },
      { label: "All premium templates", highlight: false },
      { label: "AI Strategy suggestions", highlight: true },
      { label: "Priority support", highlight: false },
      { label: "High-res export (4K)", highlight: false },
    ],
    cta: "Upgrade to Premium",
    popular: true,
  },
]

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access to your plan until the end of your current billing period.",
  },
  {
    question: "What's included in AI Strategy suggestions?",
    answer:
      "Our AI analyzes your topic and suggests the most viral \"hook\" formats, optimal slide structures for engagement, and calls-to-action that convert based on current social media trends.",
  },
  {
    question: "Do you offer custom designs for teams?",
    answer:
      "Absolutely. For agencies and larger teams requiring custom brand templates and multi-user access, please contact our support team for a custom Enterprise quote.",
  },
]

function PricingPage() {
  const navigate = useNavigate()
  const { user, openAuthModal } = useAuthContext()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  function handleFreePlan() {
    if (user) {
      navigate("/generate")
      return
    }
    openAuthModal("login", () => navigate("/generate"))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <SiteHeader active="pricing" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-24 md:px-10 md:pt-24">
        <section className="mb-16 text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-5xl">Simple, transparent pricing</h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Stop worrying about design details. Focus on your message and let AI handle the heavy lifting for your social carousels.
          </p>
        </section>

        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex h-full cursor-pointer flex-col rounded-xl border bg-card p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                plan.popular ? "border-2 border-primary" : "border-border",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="mb-2 font-heading text-2xl font-semibold text-foreground">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-foreground md:text-5xl">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </div>
              <ul className="mb-12 grow space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-3 text-sm">
                    {feature.highlight ? (
                      <Sparkles className="size-5 shrink-0 text-secondary" />
                    ) : (
                      <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    )}
                    {feature.label}
                  </li>
                ))}
              </ul>
              {plan.popular ? (
                <Button onClick={() => setUpgradeOpen(true)} className="w-full cursor-pointer rounded-xl bg-linear-to-r from-primary to-secondary py-4 font-semibold shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95">
                  {plan.cta}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleFreePlan}
                  disabled={Boolean(user)}
                  className="w-full cursor-pointer rounded-xl border-primary py-4 font-semibold text-primary hover:bg-primary/10 active:scale-95 disabled:cursor-not-allowed disabled:border-primary disabled:bg-white disabled:text-primary disabled:opacity-100"
                >
                  {user ? "Current Plan" : plan.cta}
                </Button>
              )}
            </div>
          ))}
        </div>

        <section className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="cursor-pointer overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between p-6 text-left font-heading text-lg font-semibold text-foreground select-none"
                >
                  {faq.question}
                  <ChevronDown
                    className={cn("size-5 shrink-0 text-muted-foreground transition-transform duration-300", openFaq === index && "rotate-180")}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: openFaq === index ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-6 pb-6 text-sm text-muted-foreground md:text-base">{faq.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />

      {upgradeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm upgrade"
          onClick={(e) => e.target === e.currentTarget && setUpgradeOpen(false)}
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
        >
          <div className="w-full max-w-md cursor-default rounded-xl bg-card p-8 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              <h3 className="font-heading text-xl font-semibold text-foreground">Confirm Upgrade</h3>
            </div>
            <div className="mb-6 rounded-lg bg-muted p-4">
              <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Plan</span><span className="font-medium text-foreground">Premium Monthly</span></div>
              <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Base Price</span><span className="font-medium text-foreground">$19.00</span></div>
              <div className="mb-2 flex justify-between text-sm text-muted-foreground"><span>Tax (10%)</span><span className="font-medium text-foreground">$1.90</span></div>
              <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-bold"><span className="text-foreground">Total Amount</span><span className="text-primary">$20.90</span></div>
            </div>
            <p className="mb-8 text-sm text-muted-foreground">You will be redirected to Xendit&apos;s secure payment gateway to complete your transaction.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" onClick={() => setUpgradeOpen(false)} className="grow cursor-pointer rounded-xl py-4 font-medium text-muted-foreground transition-colors hover:bg-muted active:scale-95">No, Go Back</Button>
              <Button onClick={() => (window.location.href = "/checkout")} className="grow cursor-pointer rounded-xl py-4 font-semibold shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95">Yes, Proceed to Payment</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { PricingPage }
