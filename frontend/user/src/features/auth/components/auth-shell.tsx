import { useState } from "react"

import { Button } from "@/components/ui/button"

import { AuthModal } from "./auth-modal"
import { useAuthContext } from "../auth-context"

function AuthShell() {
  const { authModal, closeAuthModal, signOutModal, closeSignOutModal, signOut, isLoading } = useAuthContext()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    await new Promise((resolve) => window.setTimeout(resolve, 300))
    try {
      await signOut()
      closeSignOutModal()
    } finally {
      setIsSigningOut(false)
    }
  }

  const signOutPending = isSigningOut || isLoading

  return (
    <>
      <AuthModal open={authModal.open} mode={authModal.mode} onClose={closeAuthModal} />
      {signOutModal && (
        <div className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-black/50 p-6 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !signOutPending) closeSignOutModal() }}>
          <div role="dialog" aria-modal="true" aria-labelledby="sign-out-title" className="w-full max-w-md cursor-default rounded-xl bg-card p-8 shadow-lg">
            <h2 id="sign-out-title" className="mb-4 font-heading text-xl font-semibold text-foreground">Sign out?</h2>
            <p className="mb-8 text-sm text-muted-foreground">Your current session will be ended.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="button" variant="outline" onClick={closeSignOutModal} disabled={signOutPending} className="grow cursor-pointer rounded-xl py-4 font-medium text-muted-foreground transition-colors hover:bg-muted active:scale-95">No, Stay Signed In</Button>
              <Button type="button" onClick={() => void handleSignOut()} disabled={signOutPending} className="grow cursor-pointer rounded-xl py-4 font-semibold shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95">{signOutPending ? "Signing out..." : "Yes, Sign Out"}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export { AuthShell }
