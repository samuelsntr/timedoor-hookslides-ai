import { Sparkles } from "lucide-react"

function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-6 bg-muted px-6 py-8 md:flex-row md:px-10">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Sparkles className="size-4" />HookSlides AI © 2026</div>
      <div className="flex gap-6 text-xs text-muted-foreground">
        <a href="#privacy" className="hover:text-primary">Privacy Policy</a>
        <a href="#terms" className="hover:text-primary">Terms of Service</a>
        <a href="#support" className="hover:text-primary">Contact Support</a>
      </div>
    </footer>
  )
}

export { SiteFooter }
