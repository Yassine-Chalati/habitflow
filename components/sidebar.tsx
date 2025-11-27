"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  Sparkles,
  Zap,
  Loader2,
  Crown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser({
          email: user.email || "",
          name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        })
      }
    })
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: CheckSquare, label: "Habits", href: "/dashboard/habits" },
    { icon: Calendar, label: "Today", href: "/dashboard/today" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Sparkles, label: "AI Coach", href: "/dashboard/ai-coach", premium: true },
    { icon: Zap, label: "Templates", href: "/dashboard/templates" },
  ]

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setOpen(!open)} 
          className="h-11 w-11 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border-0 rounded-xl"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:sticky lg:top-0 inset-y-0 left-0 z-40 w-[280px] lg:w-72 transition-transform duration-300 ease-out lg:translate-x-0 h-screen",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-purple-950 overflow-y-auto">
          {/* Logo */}
          <div className="px-5 py-6 lg:px-6 lg:py-8">
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all group-hover:scale-105">
                <span className="text-white font-bold text-lg lg:text-xl">H</span>
              </div>
              <div>
                <span className="font-bold text-lg lg:text-xl text-white">HabitFlow</span>
                <span className="hidden lg:block text-xs text-slate-400">Build better habits</span>
              </div>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 lg:px-4 space-y-1">
            <p className="px-3 mb-3 text-[10px] lg:text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</p>
            {menuItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-200 group",
                      active
                        ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5 active:scale-[0.98]",
                    )}
                  >
                    <div className={cn(
                      "p-1.5 lg:p-2 rounded-lg transition-all",
                      active 
                        ? "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30" 
                        : "bg-slate-800 group-hover:bg-slate-700"
                    )}>
                      <item.icon className={cn("w-4 h-4", active ? "text-white" : "text-slate-400 group-hover:text-white")} />
                    </div>
                    <span className="font-medium text-sm flex-1">{item.label}</span>
                    {item.premium && (
                      <span className="px-1.5 lg:px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[9px] lg:text-[10px] font-bold text-white">
                        PRO
                      </span>
                    )}
                    {active && <ChevronRight className="w-4 h-4 text-purple-400" />}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Upgrade Card - Hidden on small mobile */}
          <div className="hidden sm:block px-3 lg:px-4 mb-4">
            <div className="p-3 lg:p-4 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400" />
                <span className="font-semibold text-white text-xs lg:text-sm">Upgrade to Pro</span>
              </div>
              <p className="text-[10px] lg:text-xs text-slate-300 mb-3">Get AI coaching & more</p>
              <Link href="/dashboard/subscription" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full text-xs bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 border-0 shadow-lg shadow-purple-500/25">
                  Upgrade Now
                </Button>
              </Link>
            </div>
          </div>

          {/* User Section */}
          <div className="border-t border-slate-800 px-3 lg:px-4 py-4 space-y-3">
            <div className="flex items-center gap-3 px-2 lg:px-3 py-2 rounded-xl bg-slate-800/50">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-xs lg:text-sm font-bold text-white">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-white truncate">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-[10px] lg:text-xs text-slate-400 truncate">
                  {user?.email || ""}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard/settings" onClick={() => setOpen(false)}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 h-8 lg:h-9 text-xs text-slate-400 hover:text-white hover:bg-slate-800" 
                  size="sm"
                >
                  <Settings className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  Settings
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 h-8 lg:h-9 text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                size="sm"
                onClick={handleSignOut}
                disabled={signingOut}
              >
                {signingOut ? <Loader2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 animate-spin" /> : <LogOut className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30" 
          onClick={() => setOpen(false)} 
        />
      )}
    </>
  )
}
