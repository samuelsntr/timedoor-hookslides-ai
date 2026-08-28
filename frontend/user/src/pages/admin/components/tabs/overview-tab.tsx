import { useState } from "react"
import { Users, Layers, Activity, TrendingUp, ArrowUpRight } from "lucide-react"
import type { AdminStats } from "@/services/admin-api"

interface OverviewTabProps {
  stats: AdminStats
  onNavigateToCarousels: () => void
  onNavigateToUsers: () => void
}

export function OverviewTab({ stats, onNavigateToCarousels, onNavigateToUsers }: OverviewTabProps) {
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("30d")

  const premiumCount = stats.planBreakdown.find((p) => p.plan === "premium")?.count || 0
  const freeCount = stats.planBreakdown.find((p) => p.plan === "free")?.count || 0
  const premiumPercent = stats.totalUsers > 0 ? Math.round((premiumCount / stats.totalUsers) * 100) : 0

  const activeSeries = timeRange === "7d" ? stats.generations7Days : stats.generations30Days
  const totalInPeriod = activeSeries.reduce((acc, curr) => acc + curr.count, 0)
  const maxCount = Math.max(1, ...activeSeries.map((s) => s.count))

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="group relative rounded-2xl border border-[#e4ddd0] bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0/2%)] transition-all hover:border-[#e24b2c]/40 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c574e]">Total Registered</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#faf7f2] border border-[#e4ddd0] text-[#e24b2c]">
              <Users className="size-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-[Fraunces,serif] text-4xl font-bold tracking-tight text-[#1c1a17]">
              {stats.totalUsers}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#e4ddd0]/60 pt-3 text-xs text-[#5c574e]">
            <span>{premiumCount} Pro • {freeCount} Free</span>
            <button
              type="button"
              onClick={onNavigateToUsers}
              className="font-semibold text-[#e24b2c] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View users</span>
              <ArrowUpRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Total Carousels */}
        <div className="group relative rounded-2xl border border-[#e4ddd0] bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0/2%)] transition-all hover:border-[#e24b2c]/40 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c574e]">Carousels Created</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#faf7f2] border border-[#e4ddd0] text-[#e24b2c]">
              <Layers className="size-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-[Fraunces,serif] text-4xl font-bold tracking-tight text-[#1c1a17]">
              {stats.totalCarousels}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#e4ddd0]/60 pt-3 text-xs text-[#5c574e]">
            <span>All time total</span>
            <button
              type="button"
              onClick={onNavigateToCarousels}
              className="font-semibold text-[#e24b2c] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Browse decks</span>
              <ArrowUpRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="group relative rounded-2xl border border-[#e4ddd0] bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0/2%)] transition-all hover:border-[#e24b2c]/40 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c574e]">Active Sessions</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#faf7f2] border border-[#e4ddd0] text-emerald-600">
              <Activity className="size-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-[Fraunces,serif] text-4xl font-bold tracking-tight text-[#1c1a17]">
              {stats.activeSessions}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 border-t border-[#e4ddd0]/60 pt-3 text-xs text-emerald-700 font-medium">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Unexpired user sessions</span>
          </div>
        </div>

        {/* Pro Conversion */}
        <div className="group relative rounded-2xl border border-[#e4ddd0] bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0/2%)] transition-all hover:border-[#e24b2c]/40 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c574e]">Pro Ratio</span>
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#faf7f2] border border-[#e4ddd0] text-[#e24b2c]">
              <TrendingUp className="size-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-[Fraunces,serif] text-4xl font-bold tracking-tight text-[#1c1a17]">
              {premiumPercent}%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#e4ddd0]/60 pt-3 text-xs text-[#5c574e]">
            <span>{premiumCount} paid subscribers</span>
            <span className="font-medium text-[#1c1a17]">Plan Tier</span>
          </div>
        </div>
      </div>

      {/* Visual Chart Trends (Last 7 Days vs Last 30 Days) */}
      <div className="rounded-2xl border border-[#e4ddd0] bg-white p-7 shadow-[0_4px_20px_rgb(0_0_0/2%)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#e4ddd0]/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-[Fraunces,serif] text-xl font-bold text-[#1c1a17]">
                Carousel Generation Trends
              </h2>
              <span className="rounded-full bg-[#f6d9cf] px-2.5 py-0.5 text-xs font-bold text-[#e24b2c]">
                {totalInPeriod} Created
              </span>
            </div>
            <p className="mt-1 text-xs text-[#5c574e]">
              Daily volume of AI carousels generated across all accounts
            </p>
          </div>

          {/* Time Range Switcher (7 Days vs 30 Days) */}
          <div className="flex items-center rounded-xl border border-[#e4ddd0] bg-[#faf7f2] p-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTimeRange("7d")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                timeRange === "7d"
                  ? "bg-white text-[#1c1a17] shadow-xs"
                  : "text-[#5c574e] hover:text-[#1c1a17]"
              }`}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => setTimeRange("30d")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                timeRange === "30d"
                  ? "bg-white text-[#1c1a17] shadow-xs"
                  : "text-[#5c574e] hover:text-[#1c1a17]"
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Visual Trend Bars */}
        <div className="pt-8">
          <div className="flex h-56 items-end gap-1.5 sm:gap-2">
            {activeSeries.map((day, idx) => {
              const heightPercent = day.count > 0 ? Math.max(16, Math.round((day.count / maxCount) * 100)) : 6
              const isWeekend = new Date(day.date).getDay() === 0 || new Date(day.date).getDay() === 6

              return (
                <div key={idx} className="group relative flex flex-1 flex-col items-center h-full justify-end">
                  {/* Tooltip on Hover */}
                  <div className="pointer-events-none absolute -top-10 z-20 hidden rounded-lg bg-[#1c1a17] px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg group-hover:block whitespace-nowrap">
                    {day.date}: <strong className="text-[#e24b2c]">{day.count}</strong> {day.count === 1 ? "carousel" : "carousels"}
                  </div>

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      day.count > 0
                        ? "bg-[#e24b2c] group-hover:bg-[#c93f24] group-hover:shadow-md"
                        : "bg-[#f1ece3] group-hover:bg-[#e4ddd0]"
                    }`}
                  />

                  {/* Date label */}
                  <span className={`mt-2 text-[10px] sm:text-[11px] truncate w-full text-center ${
                    isWeekend ? "text-[#e24b2c] font-medium" : "text-[#5c574e]"
                  }`}>
                    {timeRange === "7d" ? day.date.slice(5) : (idx % 3 === 0 || idx === activeSeries.length - 1 ? day.date.slice(8) : "")}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#5c574e] border-t border-[#e4ddd0]/60 pt-3">
            <span>Showing daily distribution ({activeSeries[0]?.date} to {activeSeries[activeSeries.length - 1]?.date})</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="size-2.5 rounded-xs bg-[#e24b2c]" /> Generated
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2.5 rounded-xs bg-[#f1ece3]" /> No Activity
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Breakdowns Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Source Types */}
        <div className="rounded-2xl border border-[#e4ddd0] bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0/2%)]">
          <div className="flex items-center justify-between pb-4 border-b border-[#e4ddd0]/80">
            <div>
              <h3 className="font-[Fraunces,serif] text-base font-bold text-[#1c1a17]">
                Content Sources
              </h3>
              <p className="text-xs text-[#5c574e]">Input channels used for carousel generation</p>
            </div>
            <span className="rounded-full bg-[#faf7f2] border border-[#e4ddd0] px-2.5 py-0.5 text-xs font-semibold text-[#5c574e]">
              {stats.sourceTypeBreakdown.length} Sources
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {stats.sourceTypeBreakdown.length > 0 ? (
              stats.sourceTypeBreakdown.map((item) => {
                const percent = stats.totalCarousels > 0 ? Math.round((item.count / stats.totalCarousels) * 100) : 0
                return (
                  <div key={item.sourceType} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold capitalize text-[#1c1a17]">{item.sourceType}</span>
                      <span className="font-medium text-[#5c574e]">{item.count} decks ({percent}%)</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#faf7f2] border border-[#e4ddd0]/60">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full rounded-full bg-[#e24b2c] transition-all duration-500"
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-6 text-center text-xs text-[#5c574e]">No source data recorded yet</div>
            )}
          </div>
        </div>

        {/* Copywriting Strategies */}
        <div className="rounded-2xl border border-[#e4ddd0] bg-white p-6 shadow-[0_4px_20px_rgb(0_0_0/2%)]">
          <div className="flex items-center justify-between pb-4 border-b border-[#e4ddd0]/80">
            <div>
              <h3 className="font-[Fraunces,serif] text-base font-bold text-[#1c1a17]">
                Copywriting Strategies
              </h3>
              <p className="text-xs text-[#5c574e]">Frameworks chosen by users</p>
            </div>
            <span className="rounded-full bg-[#faf7f2] border border-[#e4ddd0] px-2.5 py-0.5 text-xs font-semibold text-[#5c574e]">
              {stats.strategyBreakdown.length} Strategies
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {stats.strategyBreakdown.length > 0 ? (
              stats.strategyBreakdown.map((item) => {
                const percent = stats.totalCarousels > 0 ? Math.round((item.count / stats.totalCarousels) * 100) : 0
                return (
                  <div key={item.strategy} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold capitalize text-[#1c1a17]">{item.strategy.replace("_", " ")}</span>
                      <span className="font-medium text-[#5c574e]">{item.count} decks ({percent}%)</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#faf7f2] border border-[#e4ddd0]/60">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full rounded-full bg-[#1c1a17] transition-all duration-500"
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-6 text-center text-xs text-[#5c574e]">No strategy data recorded yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
