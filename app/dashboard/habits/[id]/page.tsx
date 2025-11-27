"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { store } from "@/lib/store"
import type { Habit } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Flame, TrendingUp, Calendar, Trash2 } from "lucide-react"
import Link from "next/link"

export default function HabitDetailPage() {
  const router = useRouter()
  const params = useParams()
  const habitId = params.id as string
  const [habit, setHabit] = useState<Habit | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const h = store.getHabit(habitId)
    setHabit(h || null)
  }, [habitId])

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this habit?")) {
      store.deleteHabit(habitId)
      router.push("/dashboard/today")
    }
  }

  const handleSave = (updates: Partial<Habit>) => {
    const updated = store.updateHabit(habitId, updates)
    if (updated) {
      setHabit(updated)
      setIsEditing(false)
    }
  }

  if (!habit) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard/today">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </Link>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Habit not found</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/today">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{habit.name}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-foreground mt-1">{habit.currentStreak} days</p>
            </div>
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
              <p className="text-2xl font-bold text-foreground mt-1">{habit.longestStreak} days</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-foreground mt-1">{habit.successRate}%</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Details */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="mt-1 text-foreground">{habit.description || "No description"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="mt-1 text-foreground">{habit.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Frequency</label>
                <p className="mt-1 text-foreground capitalize">{habit.frequency}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Priority</label>
                <p className="mt-1 text-foreground">{habit.priority}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                <p className="mt-1 text-foreground">{new Date(habit.startDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </Card>
    </div>
  )
}
