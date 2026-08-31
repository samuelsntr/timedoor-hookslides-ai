import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  HelpCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import "@/styles/landing.css"

import ctaPhoto from "@/assets/landing/cta.jpg"
import logo from "@/assets/logohs.png"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/features/auth/auth-context"
import { cn } from "@/lib/utils"
import { Reveal } from "../landing/reveal"

const plans = [
  {
    name: "Free",
    price: "$0",
    numericPrice: 0,
    description: "Try HookSlides and create your first carousels.",
    features: [
      "5 carousels/month",
      "Basic templates",
      "AI content generation",
      "Standard export",
      "HookSlides watermark",
    ],
    cta: "Start Creating",
    popular: false,
  },
  {
    name: "Creator",
    price: "$12",
    numericPrice: 12,
    description: "Create consistently without spending hours designing.",
    features: [
      "50 carousels/month",
      "All templates",
      "AI Strategy suggestions",
      "Canvas Editor",
      "HD export",
      "No watermark",
    ],
    cta: "Start Creating",
    popular: true,
  },
  {
    name: "Pro",
    price: "$29",
    numericPrice: 29,
    description: "For creators and businesses serious about content.",
    features: [
      "200 carousels/month",
      "Everything in Creator",
      "Advanced AI strategies",
      "Brand Kit",
      "Custom fonts & colors",
      "Priority generation",
      "Priority support",
    ],
    cta: "Go Pro",
    popular: false,
  },
]

const comparisonFeatures = [
  {
    name: "Monthly Carousels",
    free: "5 carousels",
    creator: "50 carousels",
    pro: "200 carousels",
  },
  {
    name: "Template Access",
    free: "Basic templates",
    creator: "All templates",
    pro: "All + Pro templates",
  },
  {
    name: "AI Content & Hooks",
    free: "Standard generation",
    creator: "AI Strategy suggestions",
    pro: "Advanced AI strategies",
  },
  {
    name: "Canvas Editor",
    free: false,
    creator: true,
    pro: true,
  },
  {
    name: "Export Quality",
    free: "Standard (PNG)",
    creator: "HD (PNG & PDF)",
    pro: "Ultra HD (PNG & PDF)",
  },
  {
    name: "Watermark",
    free: "HookSlides watermark",
    creator: "No watermark",
    pro: "No watermark",
  },
  {
    name: "Brand Kit (Colors & Fonts)",
    free: false,
    creator: false,
    pro: true,
  },
  {
    name: "Priority Generation & Queue",
    free: false,
    creator: false,
    pro: true,
  },
  {
    name: "Customer Support",
    free: "Community support",
    creator: "Standard support",
    pro: "Priority support",
  },
]

const faqs = [
  {
    question: "Can I cancel or change my subscription at any time?",
    answer:
      "Yes, you can easily upgrade, downgrade, or cancel your subscription at any time directly from your account settings. If you cancel, you will maintain access to your plan's benefits until the end of your billing cycle.",
  },
  {
    question: "What are AI Strategy suggestions?",
    answer:
      "Our AI analyzes viral social media patterns and automatically structures your slides with battle-tested frameworks (like Hook-Problem-Solution, Story Arc, or Step-by-Step Guide) so your carousels drive maximum engagement.",
  },
  {
    question: "What is included in the Brand Kit feature?",
    answer:
      "The Pro plan's Brand Kit lets you save your brand colors, custom font selections, logos, and creator handle so that every generated carousel matches your personal or company identity automatically.",
  },
  {
    question: "What happens if I reach my monthly carousel limit?",
    answer:
      "You can easily upgrade to the next tier at any time to instantly unlock more monthly generations, or wait until your monthly cycle refreshes.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day satisfaction guarantee on paid plans. If you are not satisfied with HookSlides AI, reach out to our support team and we will be happy to assist you.",
  },
]

function PricingPage() {
  const navigate = useNavigate()
  const { user, openAuthModal } = useAuthContext()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [upgradePlan, setUpgradePlan] = useState<(typeof plans)[number] | null>(null)

  function handleStart(plan?: (typeof plans)[number]) {
    if (!plan || plan.numericPrice === 0) {
      if (user) {
        navigate("/generate")
        return
      }
      openAuthModal("register", () => navigate("/generate"))
      return
    }

    if (!user) {
      openAuthModal("login", () => setUpgradePlan(plan))
      return
    }

    setUpgradePlan(plan)
  }

  const basePrice = upgradePlan?.numericPrice ?? 0
  const tax = Number((basePrice * 0.1).toFixed(2))
  const totalPrice = (basePrice + tax).toFixed(2)

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

          <div className="flex items-center gap-2 sm:gap-5">
            <Link
              to="/"
              className="rounded-full px-3 py-2 text-sm font-medium text-[#5c574e] transition-colors hover:text-[#1c1a17]"
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="rounded-full px-3 py-2 text-sm font-semibold text-[#e24b2c] transition-colors"
            >
              Pricing
            </Link>
            <button
              type="button"
              onClick={() => handleStart()}
              className="h-10 cursor-pointer rounded-full bg-[#1c1a17] px-5 text-sm font-semibold text-[#faf7f2] transition-colors hover:bg-[#e24b2c] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a17]"
            >
              {user ? "Dashboard" : "Try HookSlides"}
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h1 className="mt-6 font-[Fraunces,serif] text-3xl font-bold leading-[1.12] tracking-tight text-[#1c1a17] sm:text-4xl md:text-5xl lg:text-6xl">
                Choose the perfect plan for your <span className="italic text-[#e24b2c]">growth.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5c574e] md:text-lg">
                Stop spending hours wrestling with design templates. Generate viral, high-converting carousels in seconds and scale your audience.
              </p>

              {/* Trust Pill Bar */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#5c574e] sm:gap-6 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-[#e24b2c]" /> Free 5 carousels/mo
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-[#e24b2c]" /> Cancel anytime
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-[#e24b2c]" /> No hidden fees
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="px-6 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, index) => {
              const isPopular = plan.popular
              return (
                <Reveal key={plan.name} delay={index * 120} className="h-full">
                  <div
                    className={cn(
                      "relative flex h-full flex-col justify-between rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2",
                      isPopular
                        ? "border-2 border-[#e24b2c] bg-white shadow-[0_20px_50px_-15px_rgba(226,75,44,0.25)]"
                        : "border border-[#e4ddd0] bg-white shadow-sm hover:shadow-md",
                    )}
                  >
                    {/* Top Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e24b2c] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                          <Sparkles className="size-3.5" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Plan Header */}
                      <div className="mb-6">
                        <h3 className="mt-4 font-[Fraunces,serif] text-2xl font-bold text-[#1c1a17]">
                          {plan.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5c574e]">
                          {plan.description}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="mb-8 flex items-baseline gap-1.5 border-b border-[#e4ddd0] pb-6">
                        <span className="font-[Fraunces,serif] text-4xl font-bold tracking-tight text-[#1c1a17] sm:text-5xl">
                          {plan.price}
                        </span>
                        <span className="text-sm font-medium text-[#5c574e]">/month</span>
                      </div>

                      {/* Features List */}
                      <div className="mb-8 space-y-3.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1c1a17]">
                          What&apos;s included:
                        </p>
                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-[#1c1a17]">
                              <div
                                className={cn(
                                  "mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full",
                                  isPopular
                                    ? "bg-[#e24b2c] text-white"
                                    : "bg-[#f1ece3] text-[#1c1a17]",
                                )}
                              >
                                <Check className="size-3 stroke-[2.5]" />
                              </div>
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      {isPopular ? (
                        <button
                          type="button"
                          onClick={() => handleStart(plan)}
                          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e24b2c] px-6 text-sm font-bold text-white shadow-md shadow-[#e24b2c]/20 transition-all hover:bg-[#c93d21] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e24b2c] active:scale-[0.98]"
                        >
                          <span>{plan.cta}</span>
                          <ArrowRight className="size-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStart(plan)}
                          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#e4ddd0] bg-[#faf7f2] px-6 text-sm font-bold text-[#1c1a17] transition-all hover:border-[#1c1a17] hover:bg-[#1c1a17] hover:text-[#faf7f2] active:scale-[0.98]"
                        >
                          <span>{plan.cta}</span>
                          <ArrowRight className="size-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* Feature Comparison Table Section */}
        <section className="border-t border-[#e4ddd0] bg-[#f1ece3]/50 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="text-center">
                <h2 className="mt-4 font-[Fraunces,serif] text-2xl font-bold text-[#1c1a17] sm:text-3xl md:text-4xl">
                  Detailed feature breakdown
                </h2>
                <p className="mt-3 text-base text-[#5c574e]">
                  Everything you need to compare and select the right tier for your workflow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-12 overflow-hidden rounded-2xl border border-[#e4ddd0] bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#e4ddd0] bg-[#faf7f2]">
                        <th className="p-4 font-[Fraunces,serif] text-base font-semibold text-[#1c1a17] sm:p-5">
                          Features
                        </th>
                        <th className="p-4 font-semibold text-[#5c574e] sm:p-5">Free ($0)</th>
                        <th className="p-4 font-semibold text-[#e24b2c] sm:p-5">Creator ($12)</th>
                        <th className="p-4 font-semibold text-[#1c1a17] sm:p-5">Pro ($29)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e4ddd0]">
                      {comparisonFeatures.map((row) => (
                        <tr key={row.name} className="transition-colors hover:bg-[#faf7f2]/60">
                          <td className="p-4 font-medium text-[#1c1a17] sm:p-5">{row.name}</td>
                          <td className="p-4 text-[#5c574e] sm:p-5">
                            {typeof row.free === "boolean" ? (
                              row.free ? (
                                <Check className="size-4.5 text-[#16a34a]" />
                              ) : (
                                <span className="text-[#5c574e]/50">—</span>
                              )
                            ) : (
                              row.free
                            )}
                          </td>
                          <td className="p-4 font-medium text-[#1c1a17] sm:p-5">
                            {typeof row.creator === "boolean" ? (
                              row.creator ? (
                                <Check className="size-4.5 text-[#e24b2c]" />
                              ) : (
                                <span className="text-[#5c574e]/50">—</span>
                              )
                            ) : (
                              row.creator
                            )}
                          </td>
                          <td className="p-4 font-medium text-[#1c1a17] sm:p-5">
                            {typeof row.pro === "boolean" ? (
                              row.pro ? (
                                <Check className="size-4.5 text-[#16a34a]" />
                              ) : (
                                <span className="text-[#5c574e]/50">—</span>
                              )
                            ) : (
                              row.pro
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="border-t border-[#e4ddd0] bg-[#faf7f2] px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e4ddd0] bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c574e] shadow-sm">
                  <HelpCircle className="size-3.5 text-[#e24b2c]" />
                  Got Questions?
                </span>
                <h2 className="mt-4 font-[Fraunces,serif] text-2xl font-bold text-[#1c1a17] sm:text-3xl md:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-3 text-base text-[#5c574e]">
                  Have more questions? Contact our support team anytime.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 space-y-4">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 80}>
                  <div className="overflow-hidden rounded-2xl border border-[#e4ddd0] bg-white shadow-xs transition-all">
                    <button
                      type="button"
                      aria-expanded={openFaq === index}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between p-6 text-left font-[Fraunces,serif] text-lg font-semibold text-[#1c1a17] select-none hover:text-[#e24b2c] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <div
                        className={cn(
                          "ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f1ece3] text-[#1c1a17] transition-transform duration-300",
                          openFaq === index && "rotate-180 bg-[#f6d9cf] text-[#e24b2c]",
                        )}
                      >
                        <ChevronDown className="size-4" />
                      </div>
                    </button>
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
                      style={{ gridTemplateRows: openFaq === index ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-6 pb-6 text-sm leading-relaxed text-[#5c574e] md:text-base">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="relative overflow-hidden border-t border-[#e4ddd0]">
          <img
            src={ctaPhoto}
            alt="A creator smiling at their laptop in warm evening light"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1c1a17]/75 backdrop-blur-[1px]" aria-hidden="true" />

          <Reveal className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28">
            <h2 className="mt-5 font-[Fraunces,serif] text-3xl font-bold leading-[1.12] text-[#faf7f2] sm:text-4xl lg:text-5xl">
              Turn your best ideas into viral carousels today.
            </h2>
            <p className="mt-4 max-w-xl text-base text-[#faf7f2]/80 md:text-lg">
              Join thousands of creators who produce high-impact carousel posts without spending hours designing.
            </p>
            <button
              type="button"
              onClick={() => handleStart()}
              className="group mt-8 inline-flex h-13 cursor-pointer items-center gap-2.5 rounded-full bg-[#e24b2c] px-8 text-base font-bold text-[#fffdf9] transition-all hover:bg-[#c93d21] shadow-lg shadow-[#e24b2c]/30 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#faf7f2]"
            >
              Start Creating for Free
              <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </Reveal>
        </section>
      </main>

      {/* Warm Editorial Footer */}
      <footer className="border-t border-[#e4ddd0] bg-[#faf7f2]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="HookSlides Logo" className="size-5.5 object-contain" />
            <span className="font-[Fraunces,serif] text-sm font-semibold text-[#1c1a17]">
              HookSlides AI © 2026
            </span>
          </div>
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

      {/* Confirm Upgrade Dialog */}
      {upgradePlan && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm upgrade"
          onClick={(e) => e.target === e.currentTarget && setUpgradePlan(null)}
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-[#1c1a17]/60 p-6 backdrop-blur-xs"
        >
          <div className="w-full max-w-md cursor-default rounded-3xl border border-[#e4ddd0] bg-[#faf7f2] p-8 shadow-2xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#f6d9cf] text-[#e24b2c]">
                <CreditCard className="size-5" />
              </div>
              <div>
                <h3 className="font-[Fraunces,serif] text-xl font-bold text-[#1c1a17]">
                  Upgrade to {upgradePlan.name}
                </h3>
                <p className="text-xs text-[#5c574e]">Secure payment checkout</p>
              </div>
            </div>

            <div className="mb-6 space-y-2 rounded-2xl border border-[#e4ddd0] bg-white p-5">
              <div className="flex justify-between text-sm text-[#5c574e]">
                <span>Selected Plan</span>
                <span className="font-semibold text-[#1c1a17]">{upgradePlan.name} Monthly</span>
              </div>
              <div className="flex justify-between text-sm text-[#5c574e]">
                <span>Base Price</span>
                <span className="font-semibold text-[#1c1a17]">${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#5c574e]">
                <span>Tax (10%)</span>
                <span className="font-semibold text-[#1c1a17]">${tax.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-[#e4ddd0] pt-3 text-base font-bold">
                <span className="text-[#1c1a17]">Total Amount</span>
                <span className="font-[Fraunces,serif] text-lg text-[#e24b2c]">${totalPrice}</span>
              </div>
            </div>

            <p className="mb-6 flex items-center gap-2 text-xs text-[#5c574e]">
              <ShieldCheck className="size-4 shrink-0 text-[#16a34a]" />
              Secure 256-bit encrypted checkout via Xendit payment gateway.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setUpgradePlan(null)}
                className="grow cursor-pointer rounded-full border-[#e4ddd0] bg-white py-3.5 text-sm font-semibold text-[#5c574e] transition-colors hover:bg-[#f1ece3] hover:text-[#1c1a17]"
              >
                No, Go Back
              </Button>
              <Button
                onClick={() => {
                  const planParam = upgradePlan ? upgradePlan.name.toLowerCase() : "creator"
                  navigate(`/checkout?plan=${planParam}`)
                }}
                className="grow cursor-pointer rounded-full bg-[#e24b2c] py-3.5 text-sm font-bold text-white shadow-md shadow-[#e24b2c]/25 transition-all hover:bg-[#c93d21]"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { PricingPage }
