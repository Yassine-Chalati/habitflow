"use client"

import { useState } from "react"
import { BarChart3, Zap, CheckCircle2, Flame, Plus, Check, RotateCcw, Target, TrendingUp, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const DEMO_HABITS = [
  { id: "1", name: "Morning Exercise", streak: 24, completion: 89, color: "#6366f1", category: "Health", completed: false },
  { id: "2", name: "Reading 30 mins", streak: 12, completion: 73, color: "#8b5cf6", category: "Learning", completed: false },
  { id: "3", name: "Meditation", streak: 8, completion: 65, color: "#22c55e", category: "Wellness", completed: true },
  { id: "4", name: "Learn Programming", streak: 5, completion: 45, color: "#f97316", category: "Learning", completed: false },
]

export default function DemoPage() {
  const [habits, setHabits] = useState(DEMO_HABITS)

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed, streak: h.completed ? h.streak : h.streak + 1 } : h
    ))
  }

  const resetDemo = () => {
    setHabits(DEMO_HABITS)
  }

  const completedToday = habits.filter(h => h.completed).length
  const totalHabits = habits.length
  const completionRate = Math.round((completedToday / totalHabits) * 100)
  const maxStreak = Math.max(...habits.map(h => h.streak))

  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", { 
    weekday: "long", 
    month: "long", 
    day: "numeric" 
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white px-4 py-4 animate-gradient bg-[length:200%_200%]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold">Demo Mode</span>
              <span className="hidden sm:inline text-white/80 ml-2">— Click habits to mark them complete!</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="secondary" onClick={resetDemo} className="gap-2 btn-press">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
            <Link href="/signup">
              <Button size="sm" className="bg-white text-purple-700 hover:bg-white/90 btn-press">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 animate-slide-down">
          <div className="space-y-3">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400 tracking-wide">{formattedDate}</p>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Hey, Demo User! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              {completedToday === totalHabits 
                ? "Amazing! You've completed all habits today! 🎉" 
                : `You've completed ${completedToday} of ${totalHabits} habits today`}
            </p>
          </div>
          <Link href="/signup">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:-translate-y-1 btn-press">
              <Plus className="w-5 h-5" />
              New Habit
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 mb-12">
          {[
            { label: "Current Streak", value: maxStreak, unit: "days", icon: Flame, gradient: "from-orange-400 to-red-500", shadow: "shadow-orange-500/30", delay: "stagger-1" },
            { label: "Today's Progress", value: completionRate, unit: "%", sub: `${completedToday}/${totalHabits} done`, icon: TrendingUp, gradient: "from-green-400 to-emerald-500", shadow: "shadow-green-500/30", delay: "stagger-2" },
            { label: "Total Habits", value: totalHabits, unit: "", sub: "tracking", icon: Target, gradient: "from-blue-400 to-indigo-500", shadow: "shadow-blue-500/30", delay: "stagger-3" },
            { label: "This Week", value: 23, unit: "", sub: "completions", icon: Calendar, gradient: "from-purple-400 to-pink-500", shadow: "shadow-purple-500/30", delay: "stagger-4" },
          ].map((stat, i) => (
            <Card key={i} className={`p-6 lg:p-8 glass border-0 shadow-xl hover-lift card-interactive opacity-0 animate-slide-up ${stat.delay}`}>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">{stat.value}<span className="text-lg text-muted-foreground ml-1">{stat.unit}</span></p>
                  {stat.sub && <p className="text-xs text-muted-foreground">{stat.sub}</p>}
                </div>
                <div className={`p-3 lg:p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow} animate-float`}>
                  <stat.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Habits Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between animate-slide-up stagger-5 opacity-0">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Today's Habits</h2>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Click to complete →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
            {habits.map((habit, index) => (
              <Card 
                key={habit.id} 
                onClick={() => toggleHabit(habit.id)}
                className={`group p-6 lg:p-8 cursor-pointer transition-all duration-300 border-0 shadow-xl card-interactive opacity-0 animate-slide-up stagger-${Math.min(index + 1, 6)} ${
                  habit.completed 
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 ring-2 ring-green-500/50" 
                    : "glass"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
                      style={{ 
                        background: `linear-gradient(135deg, ${habit.color}, ${habit.color}dd)`,
                        boxShadow: `0 8px 24px ${habit.color}40`
                      }} 
                    >
                      {habit.completed ? (
                        <Check className="w-7 h-7 lg:w-8 lg:h-8 text-white animate-bounce-in" />
                      ) : (
                        <Target className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg lg:text-xl transition-all ${habit.completed ? "line-through text-muted-foreground" : "text-slate-900 dark:text-white"}`}>
                        {habit.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{habit.category}</p>
                    </div>
                  </div>
                  <Button 
                    variant={habit.completed ? "default" : "outline"} 
                    size="sm"
                    className={`transition-all btn-press ${habit.completed ? "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30" : "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300"}`}
                  >
                    {habit.completed ? <Check className="w-4 h-4" /> : "Done"}
                  </Button>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{habit.completion}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 progress-animate" 
                        style={{ 
                          width: `${habit.completion}%`,
                          background: `linear-gradient(90deg, ${habit.color}, ${habit.color}cc)`
                        }} 
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                      <Flame className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {habit.streak} day streak
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-16 p-10 lg:p-14 text-center bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-purple-600/10 border-0 shadow-xl animate-slide-up opacity-0 stagger-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-500/30 animate-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Ready to build real habits?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">Create your free account and start tracking your habits today. No credit card required.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 btn-press px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="btn-press px-8">
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
