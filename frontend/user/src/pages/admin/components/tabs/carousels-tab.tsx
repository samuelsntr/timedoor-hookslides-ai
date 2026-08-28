import { useState, useEffect } from "react"
import { Search, Layers, ChevronLeft, ChevronRight, Eye, RefreshCw } from "lucide-react"
import { adminApi, type AdminCarouselItem } from "@/services/admin-api"

interface CarouselsTabProps {
  secret: string
  onInspectCarousel: (carouselId: string) => void
  onSelectUser: (userId: string) => void
}

export function CarouselsTab({ secret, onInspectCarousel, onSelectUser }: CarouselsTabProps) {
  const [carousels, setCarousels] = useState<AdminCarouselItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState("")
  const [sourceType, setSourceType] = useState("")
  const [strategy, setStrategy] = useState("")

  const fetchCarousels = async (currentPage = page) => {
    setLoading(true)
    try {
      const res = await adminApi.getCarousels(secret, {
        page: currentPage,
        limit: 12,
        q: search || undefined,
        sourceType: sourceType || undefined,
        strategy: strategy || undefined,
      })
      setCarousels(res.items)
      setTotalPages(res.pagination.totalPages || 1)
      setTotalItems(res.pagination.total || 0)
    } catch (err) {
      console.error("Failed to fetch carousels:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCarousels(1)
    setPage(1)
  }, [search, sourceType, strategy])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    fetchCarousels(newPage)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Controls Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#e4ddd0] bg-white p-5 shadow-[0_4px_20px_rgb(0_0_0/2%)]">
        <div className="flex flex-1 items-center gap-3 max-w-md">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5c574e]" />
            <input
              placeholder="Search by title, prompt keyword, author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] pl-10 pr-4 text-sm text-[#1c1a17] outline-none transition-all placeholder:text-[#5c574e]/60 focus:border-[#e24b2c] focus:bg-white focus:ring-2 focus:ring-[#e24b2c]/20"
            />
          </div>
        </div>

        {/* Filters & Refresh */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            className="h-10 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] px-3 py-1 text-sm font-medium text-[#1c1a17] outline-none transition-all focus:border-[#e24b2c] focus:bg-white cursor-pointer"
          >
            <option value="">All Sources</option>
            <option value="topic">Topic</option>
            <option value="article">Article</option>
            <option value="youtube">YouTube</option>
          </select>

          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="h-10 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] px-3 py-1 text-sm font-medium text-[#1c1a17] outline-none transition-all focus:border-[#e24b2c] focus:bg-white cursor-pointer"
          >
            <option value="">All Strategies</option>
            <option value="viral_hook">Viral Hook</option>
            <option value="storytelling">Storytelling</option>
            <option value="actionable_value">Actionable Value</option>
          </select>

          <button
            type="button"
            onClick={() => fetchCarousels(page)}
            disabled={loading}
            className="h-10 px-4 flex items-center gap-1.5 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] text-sm font-semibold text-[#1c1a17] hover:bg-[#f1ece3] transition-all cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin text-[#e24b2c]" : "text-[#5c574e]"}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Carousels Table */}
      <div className="rounded-2xl border border-[#e4ddd0] bg-white shadow-[0_4px_20px_rgb(0_0_0/2%)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e4ddd0] bg-[#faf7f2] text-xs font-bold uppercase tracking-wider text-[#5c574e]">
              <tr>
                <th className="px-6 py-4">Title & Summary</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Strategy</th>
                <th className="px-6 py-4">Slides</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4ddd0]/70">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#5c574e]">
                    <RefreshCw className="mx-auto size-6 animate-spin text-[#e24b2c] mb-3" />
                    <p className="font-medium">Loading carousels...</p>
                  </td>
                </tr>
              ) : carousels.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#5c574e]">
                    <p className="font-medium">No carousels found matching the current filters.</p>
                  </td>
                </tr>
              ) : (
                carousels.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-[#faf7f2]/60">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-bold text-[#1c1a17] line-clamp-1">{item.title}</div>
                      {item.summary && (
                        <div className="mt-0.5 text-xs text-[#5c574e] line-clamp-1">{item.summary}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.userId ? (
                        <button
                          type="button"
                          onClick={() => onSelectUser(item.userId!)}
                          className="font-semibold text-[#e24b2c] hover:underline cursor-pointer"
                        >
                          {item.username}
                        </button>
                      ) : (
                        <span className="text-[#5c574e]">{item.username}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-lg border border-[#e4ddd0] bg-[#faf7f2] px-2.5 py-1 text-xs font-mono font-bold uppercase text-[#1c1a17]">
                        {item.sourceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span className="inline-flex items-center rounded-lg bg-[#f1ece3] px-2.5 py-1 text-xs font-semibold text-[#1c1a17]">
                        {item.strategy.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f6d9cf] px-2.5 py-1 text-xs font-bold text-[#e24b2c]">
                        <Layers className="size-3.5" />
                        {item.slideCount} slides
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#5c574e] text-xs whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onInspectCarousel(item.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] px-3 py-1.5 text-xs font-bold text-[#e24b2c] hover:bg-[#f6d9cf] transition-all cursor-pointer"
                      >
                        <Eye className="size-3.5" />
                        <span>Inspect</span>
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
            Showing <strong className="text-[#1c1a17]">{carousels.length}</strong> of{" "}
            <strong className="text-[#1c1a17]">{totalItems}</strong> carousels
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
