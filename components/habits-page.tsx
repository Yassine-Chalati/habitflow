"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Filter, MoreVertical, Flame, Check, Edit, Trash2, Loader2, Target, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Habit {
  id: string
  name: string
  description: string
  current_streak: number
  longest_streak: number
  success_rate: number
  color: string
  category: string
  frequency: string
}

const categories = ["All", "Health", "Productivity", "Mindfulness", "Fitness", "Learning", "Other"]

export function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [deleting, setDeleting] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadHabits()
  }, [])

  async function loadHabits() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setHabits(data || [])
    setLoading(false)
  }

  async function deleteHabit(id: string) {
    setDeleting(id)
    await supabase.from("habits").delete().eq("id", id)
    setHabits(habits.filter(h => h.id !== id))
    setDeleting(null)
  }

  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || habit.category === selectedCategory
    return matchesSearch && matchesCategory
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
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-2">
              My Habits
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              {habits.length} habits • {filteredHabits.length} showing
            </p>
          </div>
          <Link href="/dashboard/habits/new" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 active:scale-[0.98]">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>New Habit</span>
            </Button>
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search habits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 sm:h-12 bg-white dark:bg-slate-900 border-0 shadow-lg rounded-xl text-sm sm:text-base"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-9 rounded-full transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-0 shadow-lg shadow-purple-500/25"
                    : "bg-white dark:bg-slate-800 border-0 shadow-md hover:shadow-lg"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length === 0 ? (
          <Card className="p-8 sm:p-12 lg:p-16 text-center glass border-0 shadow-xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              {searchQuery || selectedCategory !== "All" ? "No habits found" : "No habits yet"}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== "All" 
                ? "Try adjusting your filters" 
                : "Create your first habit and start your journey!"}
            </p>
            {!searchQuery && selectedCategory === "All" && (
              <Link href="/dashboard/habits/new">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create Habit
                </Button>
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredHabits.map((habit, index) => (
              <Card 
                key={habit.id} 
                className="group p-4 sm:p-5 lg:p-6 glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 50}ms` }}
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
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate text-slate-900 dark:text-white">
                        {habit.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">{habit.category}</p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <Link href={`/dashboard/habits/${habit.id}/edit`}>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="w-4 h-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem 
                        className="gap-2 text-red-600 cursor-pointer"
                        onClick={() => deleteHabit(habit.id)}
                        disabled={deleting === habit.id}
                      >
                        {deleting === habit.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {habit.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">
                    {habit.description}
                  </p>
                )}

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">Success Rate</span>
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
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                        {habit.current_streak || 0} days
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground capitalize">
                      {habit.frequency || "daily"}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
