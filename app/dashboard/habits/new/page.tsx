"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { HabitFrequency, HabitCategory, PriorityLevel } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Calendar, Flag, Palette, Loader2, Plus } from "lucide-react"
import Link from "next/link"

const CATEGORIES: HabitCategory[] = ["Work", "Home", "Gym", "Health", "Study", "Personal"]
const FREQUENCIES: HabitFrequency[] = ["daily", "weekly", "monthly"]
const PRIORITIES: PriorityLevel[] = ["Low", "Medium", "High"]
const COLORS = ["#6366f1", "#ef4444", "#22c55e", "#3b82f6", "#f97316", "#8b5cf6"]

export default function NewHabitPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Personal" as HabitCategory,
    frequency: "daily" as HabitFrequency,
    priority: "Medium" as PriorityLevel,
    color: COLORS[0],
    icon: "target",
  })

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      alert("Please enter a habit name")
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to create habits")
      router.push("/login")
      return
    }

    const { error } = await supabase.from("habits").insert({
      user_id: user.id,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      frequency: formData.frequency,
      priority: formData.priority,
      color: formData.color,
      icon: formData.icon,
    })

    if (error) {
      alert("Failed to create habit: " + error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        <div className="flex items-center gap-3 sm:gap-4 animate-slide-down">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Create New Habit
            </h1>
          </div>
        </div>

        <Card className="p-4 sm:p-6 space-y-5 sm:space-y-6 glass border-0 shadow-xl">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Habit Name</label>
            <Input
              placeholder="e.g., Morning Meditation"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11 text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <Input
              placeholder="Why is this habit important?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11 text-sm"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    formData.category === cat
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:shadow-lg"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {FREQUENCIES.map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFormData({ ...formData, frequency: freq })}
                  className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-medium capitalize transition-all ${
                    formData.frequency === freq
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:shadow-lg"
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Flag className="w-4 h-4" /> Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((pri) => (
                <button
                  key={pri}
                  onClick={() => setFormData({ ...formData, priority: pri })}
                  className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    formData.priority === pri
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:shadow-lg"
                  }`}
                >
                  {pri}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Palette className="w-4 h-4" /> Color
            </label>
            <div className="flex gap-2 sm:gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-all ${
                    formData.color === color ? "ring-2 ring-offset-2 ring-slate-900 dark:ring-white scale-110" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-white dark:bg-slate-800 border-0 shadow-md">
                Cancel
              </Button>
            </Link>
            <Button
              onClick={handleCreate}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Create Habit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
