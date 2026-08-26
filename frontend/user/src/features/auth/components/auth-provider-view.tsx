import { AuthModal } from "./auth-modal"
import { useAuthContext } from "../auth-context"

function AuthProviderView() {
  const { authModal, closeAuthModal } = useAuthContext()

  return <AuthModal open={authModal.open} mode={authModal.mode} onClose={closeAuthModal} />
}

export { AuthProviderView }
