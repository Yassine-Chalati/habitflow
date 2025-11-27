"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Flame, 
  Plus, 
  Loader2, 
  Target,
  Sparkles,
  ChevronRight,
  Check
} from "lucide-react"

interface Habit {
  id: string
  name: string
  description: string
  category: string
  color: string
  current_streak: number
  success_rate: number
}

interface HabitLog {
  habit_id: string
  status: string
}

export default function TodayPage() {
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
        }).eq("id", habitId)

        setHabits(habits.map(h => 
          h.id === habitId ? { ...h, current_streak: h.current_streak + 1 } : h
        ))
      }
    }

    setCompleting(null)
  }

  const isCompleted = (habitId: string) => todayLogs.find(l => l.habit_id === habitId)?.status === "done"

  const completedToday = todayLogs.filter(l => l.status === "done").length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0
  const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.current_streak || 0)) : 0

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  const greeting = today.getHours() < 12 ? "Good morning" : today.getHours() < 18 ? "Good afternoon" : "Good evening"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 animate-slide-down">
          <div className="flex items-center gap-2 sm:gap-3 text-purple-600 dark:text-purple-400 mb-2 sm:mb-3">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">{formattedDate}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-4">
            {greeting}, {userName}!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {completedToday === totalHabits && totalHabits > 0 
              ? "🎉 You've crushed all your habits today!" 
              : totalHabits === 0 
                ? "Let's create your first habit!"
                : `${totalHabits - completedToday} habits remaining today`}
          </p>
        </div>

        {/* Progress Ring Card */}
        <Card className="p-5 sm:p-6 lg:p-8 xl:p-10 mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-br from-purple-600 to-indigo-700 border-0 shadow-2xl shadow-purple-500/30 text-white overflow-hidden relative animate-slide-up stagger-1 opacity-0">
          <div className="absolute top-0 right-0 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
            <div className="space-y-3 sm:space-y-4 lg:space-y-5 text-center sm:text-left w-full sm:w-auto">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/90">Today's Progress</h2>
              <div className="flex items-baseline justify-center sm:justify-start gap-1 sm:gap-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">{completionRate}</span>
                <span className="text-xl sm:text-2xl lg:text-3xl text-white/70">%</span>
              </div>
              <p className="text-white/70 text-sm sm:text-base lg:text-lg">{completedToday} of {totalHabits} habits completed</p>
              <Link href="/dashboard/habits/new">
                <Button className="w-full sm:w-auto bg-white text-purple-700 hover:bg-white/90 shadow-xl mt-2 sm:mt-3 btn-press transition-all hover:scale-105">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Add Habit
                </Button>
              </Link>
            </div>
            
            {/* Progress Circle */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52 flex-shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="white"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${completionRate * 2.83} 283`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white/90 animate-pulse" />
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {[
            { icon: Flame, value: maxStreak, label: "Day Streak", gradient: "from-orange-400 to-red-500", shadow: "shadow-orange-500/30", delay: "stagger-2" },
            { icon: TrendingUp, value: completedToday, label: "Done Today", gradient: "from-green-400 to-emerald-500", shadow: "shadow-green-500/30", delay: "stagger-3" },
            { icon: Target, value: totalHabits, label: "Total Habits", gradient: "from-blue-400 to-indigo-500", shadow: "shadow-blue-500/30", delay: "stagger-4" },
          ].map((stat, i) => (
            <Card key={i} className={`p-3 sm:p-4 lg:p-6 xl:p-8 glass border-0 shadow-xl text-center card-interactive opacity-0 animate-slide-up ${stat.delay}`}>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow} flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 animate-float`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-white" />
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground mt-1 sm:mt-2">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Habits List */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          <div className="flex items-center justify-between animate-slide-up stagger-5 opacity-0">
            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-slate-900 dark:text-white">Today's Habits</h2>
            <Link href="/dashboard/habits" className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 flex items-center gap-1 transition-all hover:gap-2">
              View all <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {habits.length === 0 ? (
            <Card className="p-8 sm:p-12 lg:p-16 text-center glass border-0 shadow-xl animate-scale-in">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 animate-float">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-500" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">Start Your Journey</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 lg:mb-10 max-w-md mx-auto">
                Create your first habit and begin building a better you, one day at a time.
              </p>
              <Link href="/dashboard/habits/new">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 btn-press">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create First Habit
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {habits.map((habit, index) => {
                const completed = isCompleted(habit.id)
                return (
                  <Card 
                    key={habit.id} 
                    onClick={() => toggleHabit(habit.id)}
                    className={`p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 border-0 shadow-xl card-interactive opacity-0 animate-slide-up stagger-${Math.min(index + 1, 6)} ${
                      completed 
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 ring-2 ring-green-500/30" 
                        : "glass"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                      {/* Checkbox */}
                      <button 
                        className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 btn-press flex-shrink-0 ${
                          completed 
                            ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30 scale-105" 
                            : "border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:scale-105"
                        }`}
                        disabled={completing === habit.id}
                      >
                        {completing === habit.id ? (
                          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-purple-500" />
                        ) : completed ? (
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white animate-bounce-in" />
                        ) : (
                          <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-base sm:text-lg lg:text-xl transition-all truncate ${completed ? "line-through text-muted-foreground" : "text-slate-900 dark:text-white"}`}>
                          {habit.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 mt-1 sm:mt-2">
                          <span 
                            className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-semibold"
                            style={{ 
                              backgroundColor: `${habit.color}20`, 
                              color: habit.color 
                            }}
                          >
                            {habit.category}
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 sm:gap-2">
                            <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" /> 
                            {habit.current_streak || 0} days
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <Link href={`/dashboard/habits/${habit.id}`} onClick={(e) => e.stopPropagation()} className="hidden sm:block">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-purple-600 transition-all hover:translate-x-1">
                          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                        </Button>
                      </Link>
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
