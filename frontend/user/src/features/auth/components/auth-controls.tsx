import { LogIn, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { useAuthContext } from "../auth-context"

type AuthControlsProps = {
  onSignIn: () => void
}

function AuthControls({ onSignIn }: AuthControlsProps) {
  const { user, isLoading, openSignOutModal } = useAuthContext()
  const avatarUrl = `https://i.pravatar.cc/96?img=${(Number(user?.id) || 1) % 70 + 1}`

  if (!user) {
    return <Button variant="ghost" onClick={onSignIn} className="cursor-pointer gap-1.5 px-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><LogIn className="size-4" />Sign In</Button>
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm" className="hidden sm:flex">
        <AvatarImage src={avatarUrl} alt={`${user.username} avatar`} />
        <AvatarFallback>{user.username.slice(0, 1).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="hidden max-w-28 truncate text-sm font-medium text-foreground sm:inline">{user.username}</span>
      <Button variant="ghost" onClick={openSignOutModal} disabled={isLoading} className="cursor-pointer gap-1.5 px-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><LogOut className="size-4" />Sign Out</Button>
    </div>
  )
}

export { AuthControls }
