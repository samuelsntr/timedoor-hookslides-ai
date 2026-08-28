import { useState, useEffect, useCallback } from "react"
import {
  Layers,
  Users,
  LogOut,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react"
import logo from "@/assets/logohs.png"
import { AdminLogin } from "./components/admin-login"
import { OverviewTab } from "./components/tabs/overview-tab"
import { CarouselsTab } from "./components/tabs/carousels-tab"
import { UsersTab } from "./components/tabs/users-tab"
import { CarouselDetailModal } from "./components/carousel-detail-modal"
import { UserDetailModal } from "./components/user-detail-modal"
import { adminApi, type AdminStats } from "@/services/admin-api"

const ADMIN_STORAGE_KEY = "hookslides_admin_secret"

type TabType = "overview" | "carousels" | "users"

export function AdminPage() {
  const [secret, setSecret] = useState<string | null>(() => {
    return sessionStorage.getItem(ADMIN_STORAGE_KEY)
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(false)

  // Modals state
  const [selectedCarouselId, setSelectedCarouselId] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const fetchStats = useCallback(
    async (adminSecret: string) => {
      setLoadingStats(true)
      try {
        const res = await adminApi.getStats(adminSecret)
        setStats(res)
      } catch (err) {
        console.error("Failed to fetch admin stats:", err)
      } finally {
        setLoadingStats(false)
      }
    },
    []
  )

  const handleAuthenticate = async (enteredSecret: string) => {
    setIsVerifying(true)
    setLoginError(null)
    try {
      const isValid = await adminApi.verify(enteredSecret)
      if (isValid) {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, enteredSecret)
        setSecret(enteredSecret)
        setIsAuthenticated(true)
        fetchStats(enteredSecret)
      } else {
        setLoginError("Invalid admin credentials.")
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error?.message || err?.response?.data?.message || "Failed to authenticate. Please check the secret code."
      setLoginError(msg)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY)
    setSecret(null)
    setIsAuthenticated(false)
    setStats(null)
  }

  // Auto-login if token in sessionStorage
  useEffect(() => {
    if (secret && !isAuthenticated) {
      handleAuthenticate(secret)
    }
  }, [secret])

  if (!isAuthenticated || !secret) {
    return <AdminLogin onAuthenticate={handleAuthenticate} isLoading={isVerifying} error={loginError} />
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1a17] flex flex-col antialiased font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#e4ddd0] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#faf7f2] border border-[#e4ddd0] shadow-xs">
              <img src={logo} alt="HookSlides Logo" className="size-6 object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-[Fraunces,serif] text-lg font-bold tracking-tight text-[#1c1a17]">
                  HookSlides Admin
                </span>
                <span className="rounded-full bg-[#f6d9cf] px-2 py-0.5 text-[10px] font-bold text-[#e24b2c] uppercase">
                  Portal
                </span>
              </div>
              <p className="text-xs text-[#5c574e]">Overview, carousels & user accounts</p>
            </div>
          </div>

          {/* Navigation Tabs (3 simplified tabs) */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-[#faf7f2] p-1.5 border border-[#e4ddd0]">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-white text-[#1c1a17] shadow-xs"
                  : "text-[#5c574e] hover:text-[#1c1a17]"
              }`}
            >
              <LayoutDashboard className="size-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("carousels")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "carousels"
                  ? "bg-white text-[#1c1a17] shadow-xs"
                  : "text-[#5c574e] hover:text-[#1c1a17]"
              }`}
            >
              <Layers className="size-4" />
              <span>Carousels</span>
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "users"
                  ? "bg-white text-[#1c1a17] shadow-xs"
                  : "text-[#5c574e] hover:text-[#1c1a17]"
              }`}
            >
              <Users className="size-4" />
              <span>Users</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => fetchStats(secret)}
              disabled={loadingStats}
              className="h-9 px-3.5 flex items-center gap-1.5 rounded-xl border border-[#e4ddd0] bg-[#faf7f2] text-xs font-bold text-[#1c1a17] hover:bg-[#f1ece3] transition-all cursor-pointer disabled:opacity-50"
              title="Refresh dashboard stats"
            >
              <RefreshCw className={`size-3.5 ${loadingStats ? "animate-spin text-[#e24b2c]" : "text-[#5c574e]"}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="h-9 px-3.5 flex items-center gap-1.5 rounded-xl border border-[#e4ddd0] bg-white text-xs font-bold text-[#5c574e] hover:text-[#e24b2c] hover:bg-[#f6d9cf]/40 transition-all cursor-pointer"
              title="Lock Admin Session"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex border-t border-[#e4ddd0] px-4 py-2 md:hidden overflow-x-auto gap-2">
          {(["overview", "carousels", "users"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-1.5 text-xs font-bold capitalize whitespace-nowrap cursor-pointer ${
                activeTab === tab ? "bg-[#e24b2c] text-white" : "bg-[#faf7f2] text-[#5c574e] border border-[#e4ddd0]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-8 md:px-10">
        {activeTab === "overview" && (
          stats ? (
            <OverviewTab
              stats={stats}
              onNavigateToCarousels={() => setActiveTab("carousels")}
              onNavigateToUsers={() => setActiveTab("users")}
            />
          ) : (
            <div className="flex h-64 items-center justify-center">
              <RefreshCw className="size-7 animate-spin text-[#e24b2c]" />
            </div>
          )
        )}

        {activeTab === "carousels" && (
          <CarouselsTab
            secret={secret}
            onInspectCarousel={(id) => setSelectedCarouselId(id)}
            onSelectUser={(userId) => setSelectedUserId(userId)}
          />
        )}

        {activeTab === "users" && (
          <UsersTab
            secret={secret}
            onSelectUser={(userId) => setSelectedUserId(userId)}
          />
        )}
      </main>

      {/* Modals for Inspection */}
      {selectedCarouselId && (
        <CarouselDetailModal
          carouselId={selectedCarouselId}
          secret={secret}
          onClose={() => setSelectedCarouselId(null)}
          onSelectUser={(userId) => {
            setSelectedCarouselId(null)
            setSelectedUserId(userId)
          }}
        />
      )}

      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          secret={secret}
          onClose={() => setSelectedUserId(null)}
          onSelectCarousel={(carouselId) => {
            setSelectedUserId(null)
            setSelectedCarouselId(carouselId)
          }}
        />
      )}
    </div>
  )
}
