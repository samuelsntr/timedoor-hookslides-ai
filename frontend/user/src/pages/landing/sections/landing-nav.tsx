import { Link } from "react-router-dom"

import logo from "@/assets/logohs.png"

function LandingNav({ onStart }: { onStart: () => void }) {
  return (
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
            to="/pricing"
            className="rounded-full px-3 py-2 text-sm font-medium text-[#5c574e] transition-colors hover:text-[#1c1a17]"
          >
            Pricing
          </Link>
          <button
            type="button"
            onClick={onStart}
            className="h-10 cursor-pointer rounded-full bg-[#1c1a17] px-5 text-sm font-semibold text-[#faf7f2] transition-colors hover:bg-[#e24b2c] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1c1a17]"
          >
            Try HookSlides
          </button>
        </div>
      </nav>
    </header>
  )
}

export { LandingNav }
