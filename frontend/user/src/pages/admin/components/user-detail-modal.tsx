import { useState, useEffect } from "react"
import { X, User, Calendar, Layers, ShieldCheck, ArrowUpRight, Loader2 } from "lucide-react"
import { adminApi, type AdminUserDetails } from "@/services/admin-api"

interface UserDetailModalProps {
  userId: string | null
  secret: string
  onClose: () => void
  onSelectCarousel: (carouselId: string) => void
}

export function UserDetailModal({ userId, secret, onClose, onSelectCarousel }: UserDetailModalProps) {
  const [user, setUser] = useState<AdminUserDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    let isMounted = true
    setLoading(true)
    adminApi
      .getUserById(secret, userId)
      .then((res) => {
        if (isMounted) setUser(res)
      })
      .catch((err) => {
        console.error("Failed to fetch user detail:", err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [userId, secret])

  if (!userId) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1a17]/50 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#e4ddd0] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e4ddd0] bg-[#faf7f2] px-7 py-5">
          <div className="flex items-center gap-3.5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#f6d9cf] text-[#e24b2c]">
              <User className="size-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-[Fraunces,serif] text-xl font-bold text-[#1c1a17]">
                  {loading ? "Loading User..." : user?.username || "User Account"}
                </h3>
                {user && (
                  <span className={`rounded-lg px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                    user.plan === "premium"
                      ? "bg-[#f6d9cf] text-[#e24b2c]"
                      : "bg-[#f1ece3] text-[#5c574e]"
                  }`}>
                    {user.plan}
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-[#5c574e]">ID: {userId}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl border border-[#e4ddd0] bg-white text-[#5c574e] hover:bg-[#f1ece3] hover:text-[#1c1a17] transition-all cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-[#e24b2c]" />
          </div>
        ) : !user ? (
          <div className="p-12 text-center text-[#5c574e]">User not found or error loading profile.</div>
        ) : (
          <div className="overflow-y-auto p-7 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-[#e4ddd0] bg-[#faf7f2] p-4">
                <span className="text-xs text-[#5c574e] block mb-1">Total Carousels</span>
                <span className="font-[Fraunces,serif] text-2xl font-bold text-[#1c1a17]">{user.stats?.total_carousels ?? 0}</span>
              </div>
              <div className="rounded-xl border border-[#e4ddd0] bg-[#faf7f2] p-4">
                <span className="text-xs text-[#5c574e] block mb-1">Account Plan</span>
                <span className="font-bold text-sm capitalize text-[#e24b2c] flex items-center gap-1">
                  <ShieldCheck className="size-4" />
                  {user.plan}
                </span>
              </div>
              <div className="rounded-xl border border-[#e4ddd0] bg-[#faf7f2] p-4">
                <span className="text-xs text-[#5c574e] block mb-1">Registered</span>
                <span className="font-semibold text-xs text-[#1c1a17] flex items-center gap-1">
                  <Calendar className="size-3.5 text-[#5c574e]" />
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Recent Carousels created by this user */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-[Fraunces,serif] text-base font-bold text-[#1c1a17] flex items-center gap-2">
                  <Layers className="size-4.5 text-[#e24b2c]" />
                  <span>Carousels Generated ({user.recentCarousels?.length || 0})</span>
                </h4>
              </div>

              {user.recentCarousels && user.recentCarousels.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {user.recentCarousels.map((carousel) => (
                    <div
                      key={carousel.id}
                      onClick={() => onSelectCarousel(carousel.id)}
                      className="group flex cursor-pointer items-center justify-between rounded-xl border border-[#e4ddd0] bg-white p-3.5 transition-all hover:border-[#e24b2c]/60 hover:bg-[#faf7f2]"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-xs text-[#1c1a17] group-hover:text-[#e24b2c] transition-colors">
                          {carousel.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md border border-[#e4ddd0] bg-[#faf7f2] px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-[#1c1a17]">
                            {carousel.source_type}
                          </span>
                          <span className="text-[11px] text-[#5c574e] capitalize">
                            {carousel.strategy.replace("_", " ")}
                          </span>
                          <span className="text-[11px] text-[#5c574e]">
                            {new Date(carousel.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-xl bg-[#faf7f2] text-[#5c574e] group-hover:bg-[#e24b2c] group-hover:text-white transition-colors">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#e4ddd0] p-8 text-center text-xs text-[#5c574e]">
                  This user has not generated any carousels yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
