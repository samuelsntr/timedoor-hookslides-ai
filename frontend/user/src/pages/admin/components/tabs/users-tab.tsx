import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, User, RefreshCw, Layers, ShieldCheck } from "lucide-react"
import { adminApi, type AdminUserItem } from "@/services/admin-api"

interface UsersTabProps {
  secret: string
  onSelectUser: (userId: string) => void
}

export function UsersTab({ secret, onSelectUser }: UsersTabProps) {
  const [users, setUsers] = useState<AdminUserItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [plan, setPlan] = useState("")

  const fetchUsers = async (currentPage = page) => {
    setLoading(true)
    try {
      const res = await adminApi.getUsers(secret, {
        page: currentPage,
        limit: 12,
        q: search || undefined,
        plan: plan || undefined,
      })
      setUsers(res.items)
      setTotalPages(res.pagination.totalPages || 1)
      setTotalItems(res.pagination.total || 0)
    } catch (err) {
      console.error("Failed to fetch users:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(1)
    setPage(1)
  }, [search, plan])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    fetchUsers(newPage)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Controls Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#e4ddd0] bg-white p-5 shadow-[0_4px_20px_rgb(0_0_0/2%)]">
        <div className="flex flex-1 items-center gap-3 max-w-md">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5c574e]" />
            <input
              placeholder="Search by username or user ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] pl-10 pr-4 text-sm text-[#1c1a17] outline-none transition-all placeholder:text-[#5c574e]/60 focus:border-[#e24b2c] focus:bg-white focus:ring-2 focus:ring-[#e24b2c]/20"
            />
          </div>
        </div>

        {/* Plan Filter & Refresh */}
        <div className="flex items-center gap-2.5">
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="h-10 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] px-3.5 py-1 text-sm font-medium text-[#1c1a17] outline-none transition-all focus:border-[#e24b2c] focus:bg-white cursor-pointer"
          >
            <option value="">All Account Plans</option>
            <option value="free">Free Tier</option>
            <option value="premium">Premium Pro</option>
          </select>

          <button
            type="button"
            onClick={() => fetchUsers(page)}
            disabled={loading}
            className="h-10 px-4 flex items-center gap-1.5 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] text-sm font-semibold text-[#1c1a17] hover:bg-[#f1ece3] transition-all cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin text-[#e24b2c]" : "text-[#5c574e]"}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-[#e4ddd0] bg-white shadow-[0_4px_20px_rgb(0_0_0/2%)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e4ddd0] bg-[#faf7f2] text-xs font-bold uppercase tracking-wider text-[#5c574e]">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Subscription Plan</th>
                <th className="px-6 py-4">Carousels Created</th>
                <th className="px-6 py-4">Session Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4">Registered Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4ddd0]/70">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#5c574e]">
                    <RefreshCw className="mx-auto size-6 animate-spin text-[#e24b2c] mb-3" />
                    <p className="font-medium">Loading user accounts...</p>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#5c574e]">
                    <p className="font-medium">No user accounts found matching your query.</p>
                  </td>
                </tr>
              ) : (
                users.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-[#faf7f2]/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-[#faf7f2] border border-[#e4ddd0] font-[Fraunces,serif] font-bold text-sm text-[#e24b2c] uppercase">
                          {item.username.slice(0, 2)}
                        </div>
                        <div>
                          <span className="font-bold text-[#1c1a17] block">{item.username}</span>
                          <span className="font-mono text-[11px] text-[#5c574e]">ID: {item.id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                        item.plan === "premium"
                          ? "bg-[#f6d9cf] text-[#e24b2c]"
                          : "bg-[#f1ece3] text-[#5c574e]"
                      }`}>
                        {item.plan === "premium" && <ShieldCheck className="size-3.5" />}
                        {item.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#faf7f2] border border-[#e4ddd0] px-2.5 py-1 text-xs font-bold text-[#1c1a17]">
                        <Layers className="size-3 text-[#e24b2c]" />
                        {item.carousels_count}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.active_sessions_count > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active Session</span>
                        </span>
                      ) : (
                        <span className="text-xs text-[#5c574e]">Idle</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#5c574e]">
                      {item.last_active_at ? new Date(item.last_active_at).toLocaleDateString() : "Never"}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#5c574e] whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectUser(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] px-3 py-1.5 text-xs font-bold text-[#e24b2c] hover:bg-[#f6d9cf] transition-all cursor-pointer"
                      >
                        <User className="size-3.5" />
                        <span>Profile</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#e4ddd0] bg-[#faf7f2]/50 px-6 py-4 text-xs font-medium text-[#5c574e]">
          <span>
            Showing <strong className="text-[#1c1a17]">{users.length}</strong> of{" "}
            <strong className="text-[#1c1a17]">{totalItems}</strong> registered users
          </span>
          <div className="flex items-center gap-3">
            <span>Page {page} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page <= 1 || loading}
                className="flex size-8 items-center justify-center rounded-lg border border-[#e4ddd0] bg-white text-[#1c1a17] hover:bg-[#faf7f2] disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages || loading}
                className="flex size-8 items-center justify-center rounded-lg border border-[#e4ddd0] bg-white text-[#1c1a17] hover:bg-[#faf7f2] disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
