"use client"

import { useEffect, useState } from "react"
import { Flame, Plus, Check, Loader2, TrendingUp, Calendar, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Habit {
  id: string
  name: string
  current_streak: number
  success_rate: number
  color: string
  category: string
}

interface HabitLog {
  habit_id: string
  status: string
}

export function DashboardContent() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [todayLogs, setTodayLogs] = useState<HabitLog[]>([])
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState<string | null>(null)
  const [userName, setUserName] = useState("")

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    setUserName(user.user_metadata?.name || user.email?.split("@")[0] || "there")

    const today = new Date().toISOString().split("T")[0]

    const [habitsRes, logsRes] = await Promise.all([
      supabase.from("habits").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("habit_logs").select("*").eq("user_id", user.id).eq("date", today),
    ])

    setHabits(habitsRes.data || [])
    setTodayLogs(logsRes.data || [])
    setLoading(false)
  }

  async function toggleHabit(habitId: string) {
    setCompleting(habitId)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const today = new Date().toISOString().split("T")[0]
    const existingLog = todayLogs.find(l => l.habit_id === habitId)
    const newStatus = existingLog?.status === "done" ? "pending" : "done"

    await supabase.from("habit_logs").upsert({
      habit_id: habitId,
      user_id: user.id,
      date: today,
      status: newStatus,
      completed_at: newStatus === "done" ? new Date().toISOString() : null,
    }, { onConflict: "habit_id,date" })

    if (existingLog) {
      setTodayLogs(todayLogs.map(l => l.habit_id === habitId ? { ...l, status: newStatus } : l))
    } else {
      setTodayLogs([...todayLogs, { habit_id: habitId, status: newStatus }])
    }

    if (newStatus === "done") {
      const habit = habits.find(h => h.id === habitId)
      if (habit) {
        await supabase.from("habits").update({
          current_streak: habit.current_streak + 1,
          longest_streak: Math.max(habit.current_streak + 1, habit.current_streak),
        }).eq("id", habitId)

        setHabits(habits.map(h => 
          h.id === habitId ? { ...h, current_streak: h.current_streak + 1 } : h
        ))
      }
    }

    setCompleting(null)
  }

  const isCompleted = (habitId: string) => {
    return todayLogs.find(l => l.habit_id === habitId)?.status === "done"
  }

  const completedToday = todayLogs.filter(l => l.status === "done").length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0
  const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.current_streak || 0)) : 0

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", { 
    weekday: "long", 
    month: "short", 
    day: "numeric" 
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 animate-slide-down">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 tracking-wide">{formattedDate}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Hey, {userName}! 👋
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              {completedToday === totalHabits && totalHabits > 0 
                ? "Amazing! All habits done! 🎉" 
                : `${completedToday} of ${totalHabits} habits completed`}
            </p>
          </div>
          <Link href="/dashboard/habits/new" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 active:scale-[0.98]">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>New Habit</span>
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {[
            { label: "Streak", value: maxStreak, unit: "days", icon: Flame, gradient: "from-orange-400 to-red-500", shadow: "shadow-orange-500/30" },
            { label: "Progress", value: completionRate, unit: "%", icon: TrendingUp, gradient: "from-green-400 to-emerald-500", shadow: "shadow-green-500/30" },
            { label: "Habits", value: totalHabits, unit: "", icon: Target, gradient: "from-blue-400 to-indigo-500", shadow: "shadow-blue-500/30" },
            { label: "Week", value: "--", unit: "", icon: Calendar, gradient: "from-purple-400 to-pink-500", shadow: "shadow-purple-500/30" },
          ].map((stat, i) => (
            <Card key={i} className="p-4 sm:p-5 lg:p-6 glass border-0 shadow-lg hover-lift card-interactive">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] sm:text-xs font-medium text-muted-foreground truncate">{stat.label}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                    <span className="text-xs sm:text-sm text-muted-foreground ml-0.5">{stat.unit}</span>
                  </p>
                </div>
                <div className={`p-2 sm:p-2.5 lg:p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow} flex-shrink-0`}>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Habits Section */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">Today's Habits</h2>
            <Link href="/dashboard/habits" className="text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">
              View all →
            </Link>
          </div>

          {habits.length === 0 ? (
            <Card className="p-8 sm:p-12 lg:p-16 text-center glass border-0 shadow-xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-slate-900 dark:text-white">No habits yet</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-sm mx-auto">
                Create your first habit and start your journey!
              </p>
              <Link href="/dashboard/habits/new">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create Habit
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {habits.map((habit) => {
                const completed = isCompleted(habit.id)
                return (
                  <Card 
                    key={habit.id} 
                    onClick={() => toggleHabit(habit.id)}
                    className={`group p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 border-0 shadow-lg active:scale-[0.98] ${
                      completed 
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 ring-2 ring-green-500/50" 
                        : "glass hover:shadow-xl"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 flex-shrink-0" 
                          style={{ 
                            background: `linear-gradient(135deg, ${habit.color || "#6366f1"}, ${habit.color || "#6366f1"}dd)`,
                            boxShadow: `0 4px 12px ${habit.color || "#6366f1"}40`
                          }} 
                        >
                          {completed ? (
                            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          ) : (
                            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className={`font-semibold text-sm sm:text-base truncate ${completed ? "line-through text-muted-foreground" : "text-slate-900 dark:text-white"}`}>
                            {habit.name}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">{habit.category}</p>
                        </div>
                      </div>
                      <Button 
                        variant={completed ? "default" : "outline"} 
                        size="sm"
                        className={`flex-shrink-0 h-8 px-3 text-xs ${completed ? "bg-green-500 hover:bg-green-600" : ""}`}
                        disabled={completing === habit.id}
                      >
                        {completing === habit.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : completed ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          "Done"
                        )}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] sm:text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{habit.success_rate || 0}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-700" 
                            style={{ 
                              width: `${habit.success_rate || 0}%`,
                              background: `linear-gradient(90deg, ${habit.color || "#6366f1"}, ${habit.color || "#6366f1"}cc)`
                            }} 
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                          {habit.current_streak || 0} day streak
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
