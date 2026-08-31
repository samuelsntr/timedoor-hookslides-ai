import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Check,
  Copy,
  Download,
  LogOut,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react"

import "@/styles/landing.css"

import logo from "@/assets/logohs.png"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, copyToClipboard } from "@/lib/utils"
import { useAuthContext } from "@/features/auth/auth-context"
import { apiClient } from "@/services/api-client"

import {
  contentSources,
  dummyCarousel,
  strategies,
  templateIds,
  templateNames,
} from "@/features/generation/data"
import { SlideCanvas } from "@/features/generation/components/slide-canvas"
import { useGenerateCarousel } from "@/features/generation/hooks/use-generate-carousel"
import { exportCarousel } from "@/features/generation/services/carousel-export-service"
import type { Template } from "@/features/generation/types"

type StrategyId = (typeof strategies)[number]["id"]

function GenerateCarouselPage() {
  const [strategy, setStrategy] =
    useState<StrategyId>("viral_hook")

  const [template, setTemplate] =
    useState<Template>("bold-accent")

  const [input, setInput] = useState("")

  const {
    carousel,
    isGenerating,
    error,
    setError,
    limitModalOpen,
    setLimitModalOpen,
    generate,
  } = useGenerateCarousel()

  const [copied, setCopied] =
    useState<string | null>(null)

  const [isExporting, setIsExporting] =
    useState(false)

  const [inputError, setInputError] =
    useState<string | null>(null)

  const [userMenuOpen, setUserMenuOpen] =
    useState(false)

  const [signOutModalOpen, setSignOutModalOpen] =
    useState(false)

  const userMenuRef =
    useRef<HTMLDivElement | null>(null)

  const navigate = useNavigate()

  const auth = useAuthContext()

  const { user, openAuthModal } = auth

  const authActions = auth as typeof auth & {
    signOut?: () => Promise<void> | void
    logout?: () => Promise<void> | void
  }

  const userInfo = user as
    | {
      username?: string | null
      email?: string | null
    }
    | null
    | undefined

  const displayName =
    userInfo?.username ||
    userInfo?.email ||
    "Account"

  const avatarInitial = displayName
    .trim()
    .charAt(0)
    .toUpperCase()

  useEffect(() => {
    function handlePointerDown(
      event: MouseEvent,
    ) {
      if (
        !userMenuRef.current ||
        !userMenuRef.current.contains(
          event.target as Node,
        )
      ) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handlePointerDown,
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown,
      )
    }
  }, [])

  function handleSignOut() {
    setUserMenuOpen(false)
    setSignOutModalOpen(true)
  }

  async function handleConfirmSignOut() {
    setSignOutModalOpen(false)

    if (authActions.signOut) {
      await authActions.signOut()
      navigate("/")
      return
    }

    if (authActions.logout) {
      await authActions.logout()
      navigate("/")
      return
    }

    try {
      await apiClient.post("/auth/logout")
    } finally {
      navigate("/")
    }
  }

  async function handleCopy(text: string) {
    if (await copyToClipboard(text)) {
      setCopied(text)

      setTimeout(
        () => setCopied(null),
        2000,
      )
    }
  }

  async function handleGenerate() {
    if (!user) {
      return openAuthModal("login")
    }

    if (!input.trim()) {
      setInputError(
        "Content source is required.",
      )
      return
    }

    setInputError(null)

    await generate({
      input,
      sourceType: "topic",
      strategy,
      template: templateIds[template],
    })
  }

  async function handleExport() {
    if (isExporting) return

    setIsExporting(true)
    setError(null)

    try {
      await exportCarousel(carousel, template)
    } catch (caughtError) {
      console.error(
        "Carousel export failed:",
        caughtError,
      )

      setError(
        "Export failed. No incomplete ZIP was downloaded.",
      )
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="landing flex min-h-screen flex-col bg-[#faf7f2] font-sans text-[#1c1a17]">
      <header className="sticky top-0 z-50 border-b border-[#e4ddd0] bg-[#faf7f2]/85 backdrop-blur-md">
        <nav
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10"
          aria-label="Main"
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 font-[Fraunces,serif] text-lg font-semibold tracking-tight text-[#1c1a17]"
          >
            <img
              src={logo}
              alt="HookSlides Logo"
              className="size-7 object-contain"
            />

            <span>
              HookSlides
              <span className="text-[#e24b2c]">
                .
              </span>
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
              className="rounded-full px-3 py-2 text-sm font-medium text-[#5c574e] transition-colors hover:text-[#1c1a17]"
            >
              Pricing
            </Link>

            {user && (
              <div
                ref={userMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  aria-label="Open account menu"
                  aria-expanded={
                    userMenuOpen
                  }
                  onClick={() =>
                    setUserMenuOpen(
                      (current) =>
                        !current,
                    )
                  }
                  className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#1c1a17] text-sm font-semibold text-[#faf7f2] transition-colors hover:bg-[#e24b2c] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a17]"
                >
                  {avatarInitial}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-[#e4ddd0] bg-white p-2 shadow-xl">
                    <div className="border-b border-[#e4ddd0] px-3 py-3">
                      <p className="truncate text-sm font-semibold text-[#1c1a17]">
                        {displayName}
                      </p>

                      {userInfo?.email &&
                        userInfo.email !==
                        displayName && (
                          <p className="mt-0.5 truncate text-xs text-[#5c574e]">
                            {
                              userInfo.email
                            }
                          </p>
                        )}
                    </div>

                    <button
                      type="button"
                      onClick={
                        handleSignOut
                      }
                      className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#5c574e] transition-colors hover:bg-[#f1ece3] hover:text-[#e24b2c]"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-6 pt-8 md:p-8 lg:flex-row">
        <section className="flex flex-1 basis-0 flex-col gap-8 rounded-3xl border border-[#e4ddd0] bg-white p-6 shadow-sm md:p-8">
          <div>
            <h1 className="mb-2 font-heading text-3xl font-bold text-[#1c1a17]">
              Create New Carousel
            </h1>

            <p className="text-[#5c574e]">
              Transform your ideas into
              high-converting visual stories.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#5c574e]">
              Content Source
            </h2>

            <div className="flex flex-wrap gap-3 text-sm font-medium text-[#5c574e]">
              {contentSources.map(
                ({
                  label,
                  icon: Icon,
                }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-[#e4ddd0] bg-[#f1ece3] px-4 py-2"
                  >
                    <Icon className="size-4 text-[#e24b2c]" />
                    {label}
                  </span>
                ),
              )}
            </div>

            <textarea
              value={input}
              onChange={(event) => {
                setInput(
                  event.target.value,
                )

                if (
                  event.target.value.trim()
                ) {
                  setInputError(null)
                }
              }}
              aria-invalid={Boolean(
                inputError,
              )}
              aria-describedby={
                inputError
                  ? "content-source-error"
                  : undefined
              }
              className={cn(
                "h-40 w-full resize-none rounded-xl bg-[#f1ece3] p-5 text-[#1c1a17] outline-none placeholder:text-[#5c574e]/70 focus:ring-2 focus:ring-[#e24b2c]",
                inputError &&
                "border border-[#b3261e]",
              )}
              placeholder="Write a topic, paste an article URL, or a YouTube link..."
            />

            {inputError && (
              <p
                id="content-source-error"
                role="alert"
                className="text-sm text-[#b3261e]"
              >
                {inputError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#5c574e]">
              Content Strategy
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {strategies.map(
                ({
                  id,
                  label,
                  body,
                  icon: Icon,
                }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setStrategy(id)
                    }
                    className={cn(
                      "flex cursor-pointer flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
                      strategy === id
                        ? "border-[#e24b2c] bg-[#f6d9cf]"
                        : "border-[#e4ddd0] bg-[#f1ece3] hover:border-[#e24b2c]/40",
                    )}
                  >
                    <Icon className="size-5 text-[#e24b2c]" />

                    <span
                      className={cn(
                        "font-medium",
                        strategy === id
                          ? "text-[#e24b2c]"
                          : "text-[#1c1a17]",
                      )}
                    >
                      {label}
                    </span>

                    <p
                      className={cn(
                        "mt-1 text-xs leading-relaxed",
                        strategy === id
                          ? "text-[#e24b2c]/80"
                          : "text-[#5c574e]",
                      )}
                    >
                      {body}
                    </p>
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#5c574e]">
              Select Layout Template
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {(
                Object.keys(
                  templateNames,
                ) as Template[]
              ).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() =>
                    setTemplate(name)
                  }
                  className={cn(
                    "flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 p-2",
                    template === name
                      ? "border-[#e24b2c] bg-[#f6d9cf]/40"
                      : "border-[#e4ddd0] bg-[#f1ece3] hover:border-[#e24b2c]/40",
                  )}
                >
                  <SlideCanvas
                    slide={
                      dummyCarousel
                        .slides[0]
                    }
                    index={0}
                    template={name}
                    thumbnail
                  />

                  <span
                    className={cn(
                      "py-3 text-center text-sm font-medium",
                      template === name
                        ? "text-[#e24b2c]"
                        : "text-[#5c574e]",
                    )}
                  >
                    {
                      templateNames[
                      name
                      ]
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-[#b3261e]"
            >
              {error}
            </p>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#e24b2c] py-6 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#c93d21]"
          >
            <WandSparkles className="size-5" />

            {isGenerating
              ? "Generating..."
              : "Generate My Carousel"}
          </Button>
        </section>

        <section className="flex flex-1 basis-0 flex-col gap-6 lg:min-h-0">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-heading text-xl font-semibold text-[#1c1a17]">
              Carousel Preview
            </h2>

            <span className="flex items-center gap-2 rounded-full bg-[#f6d9cf] px-3 py-1 text-sm font-medium text-[#e24b2c]">
              <Sparkles className="size-3.5" />
              6 Slides Drafted
            </span>
          </div>

          <ScrollArea className="relative max-h-125 min-h-0 flex-1 overflow-hidden rounded-2xl bg-[#f1ece3]">
            <div className="flex flex-col items-center gap-8 py-8">
              {carousel.slides
                .slice(0, 6)
                .map(
                  (
                    slide,
                    index,
                  ) => (
                    <div
                      key={`${slide.title}-${index}`}
                      className="relative mx-auto w-full max-w-sm"
                    >
                      <SlideCanvas
                        slide={slide}
                        index={index}
                        template={
                          template
                        }
                        preview
                      />
                    </div>
                  ),
                )}
            </div>
          </ScrollArea>

          <div className="mt-4 flex gap-4">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 cursor-pointer gap-2 rounded-xl bg-[#e24b2c] py-3 font-medium text-white hover:bg-[#c93d21]"
            >
              <Download className="size-4" />

              {isExporting
                ? "Exporting..."
                : "Export Images"}
            </Button>

            <Button
              variant="secondary"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 cursor-pointer gap-2 rounded-xl bg-white py-3 font-medium text-[#1c1a17] hover:bg-[#f1ece3]"
            >
              <RotateCcw className="size-4" />

              {isGenerating
                ? "Regenerating..."
                : "Regenerate"}
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-lg font-semibold text-[#1c1a17]">
                Recommended Captions
              </h3>

              <div className="flex flex-col gap-3">
                {carousel.captionIdeas.map(
                  (caption) => (
                    <div
                      key={caption}
                      className="flex items-start justify-between gap-4 rounded-xl border border-[#e4ddd0] bg-white p-4 shadow-sm"
                    >
                      <p className="text-sm leading-relaxed text-[#5c574e]">
                        {caption}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            caption,
                          )
                        }
                        aria-label="Copy caption"
                        className="relative grid shrink-0 cursor-pointer place-items-center self-center p-1 text-[#e24b2c] hover:text-[#c93d21]"
                      >
                        <Check
                          className={cn(
                            "col-start-1 row-start-1 size-4 transition-opacity",
                            copied ===
                              caption
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />

                        <Copy
                          className={cn(
                            "col-start-1 row-start-1 size-4 transition-opacity",
                            copied ===
                              caption
                              ? "opacity-0"
                              : "opacity-100",
                          )}
                        />
                      </button>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-[#1c1a17]">
                  Recommended Tags
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      carousel.hashtags.join(
                        " ",
                      ),
                    )
                  }
                  className="flex cursor-pointer items-center gap-1 text-sm font-medium text-[#e24b2c] hover:text-[#c93d21]"
                >
                  {copied ===
                    carousel.hashtags.join(
                      " ",
                    ) ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}

                  {copied ===
                    carousel.hashtags.join(
                      " ",
                    )
                    ? "Copied!"
                    : "Copy All"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {carousel.hashtags.map(
                  (tag) => (
                    <span
                      key={tag}
                      className="cursor-pointer rounded-full border border-[#e24b2c]/20 bg-[#f6d9cf] px-3 py-1 text-xs font-medium text-[#e24b2c] transition-colors hover:bg-[#f6d9cf]/80"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e4ddd0] bg-[#faf7f2]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="HookSlides Logo"
              className="size-5.5 object-contain"
            />

            <span className="font-[Fraunces,serif] text-sm font-semibold text-[#1c1a17]">
              HookSlides AI © 2026
            </span>
          </div>

          <div className="flex gap-6 text-sm text-[#5c574e]">
            <a
              href="#privacy"
              className="transition-colors hover:text-[#e24b2c]"
            >
              Privacy
            </a>

            <a
              href="#terms"
              className="transition-colors hover:text-[#e24b2c]"
            >
              Terms
            </a>

            <a
              href="#support"
              className="transition-colors hover:text-[#e24b2c]"
            >
              Support
            </a>
          </div>
        </div>
      </footer>

      {limitModalOpen && (
        <div
          role="presentation"
          onMouseDown={(event) =>
            event.target ===
            event.currentTarget &&
            setLimitModalOpen(false)
          }
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="generation-limit-title"
            className="w-full max-w-md cursor-default rounded-2xl bg-white p-8 shadow-xl"
          >
            <h2
              id="generation-limit-title"
              className="mb-3 font-heading text-xl font-semibold text-[#1c1a17]"
            >
              Monthly generation limit
              reached
            </h2>

            <p className="mb-8 text-sm text-[#5c574e]">
              You have used all 5 free
              carousel generations this
              month.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() =>
                  setLimitModalOpen(false)
                }
                className="grow cursor-pointer rounded-xl border-[#e4ddd0] py-4 text-[#5c574e] hover:bg-[#f1ece3]"
              >
                Close
              </Button>

              <Button
                onClick={() =>
                  navigate(
                    "/pricing?upgrade=1",
                  )
                }
                className="grow cursor-pointer rounded-xl bg-[#e24b2c] py-4 font-semibold text-white hover:bg-[#c93d21]"
              >
                Upgrade to Premium
              </Button>
            </div>
          </section>
        </div>
      )}

      {signOutModalOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSignOutModalOpen(false)
            }
          }}
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="sign-out-title"
            aria-describedby="sign-out-description"
            className="w-full max-w-md cursor-default rounded-2xl border border-[#e4ddd0] bg-white p-8 shadow-xl"
          >
            <h2
              id="sign-out-title"
              className="mb-3 font-heading text-xl font-semibold tracking-tight text-[#1c1a17]"
            >
              Sign out?
            </h2>

            <p
              id="sign-out-description"
              className="mb-8 text-sm leading-relaxed text-[#5c574e]"
            >
              Are you sure you want to sign
              out of your HookSlides account?
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() =>
                  setSignOutModalOpen(false)
                }
                className="grow cursor-pointer rounded-xl border-[#e4ddd0] py-4 text-[#5c574e] hover:bg-[#f1ece3]"
              >
                No, Stay Signed In
              </Button>

              <Button
                onClick={
                  handleConfirmSignOut
                }
                className="grow cursor-pointer rounded-xl bg-[#e24b2c] py-4 font-semibold text-white hover:bg-[#c93d21]"
              >
                Yes, Sign Out
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export { GenerateCarouselPage }
