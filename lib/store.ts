// Simple in-memory store for MVP (replace with Firebase/Backend later)
import type { Habit, HabitLog, User, UserStats } from "./types"

const habits: Map<string, Habit> = new Map()
const logs: Map<string, HabitLog[]> = new Map()
let currentUser: User | null = null

export const store = {
  // User operations
  setCurrentUser: (user: User) => {
    currentUser = user
  },
  getCurrentUser: () => currentUser,

  // Habit operations
  addHabit: (habit: Habit) => {
    habits.set(habit.id, habit)
    return habit
  },
  getHabits: () => Array.from(habits.values()),
  getHabit: (id: string) => habits.get(id),
  updateHabit: (id: string, updates: Partial<Habit>) => {
    const habit = habits.get(id)
    if (habit) {
      const updated = { ...habit, ...updates }
      habits.set(id, updated)
      return updated
    }
    return null
  },
  deleteHabit: (id: string) => {
    habits.delete(id)
    logs.delete(id)
  },

  // Logging operations
  logHabit: (habitId: string, log: HabitLog) => {
    if (!logs.has(habitId)) {
      logs.set(habitId, [])
    }
    logs.get(habitId)!.push(log)
    return log
  },
  getHabitLogs: (habitId: string, days = 30) => {
    return logs.get(habitId) || []
  },
  getTodayStats: (): UserStats => {
    const today = new Date().toDateString()
    const completed = Array.from(habits.values()).filter((h) => {
      const habitLogs = logs.get(h.id) || []
      return habitLogs.some((log) => new Date(log.date).toDateString() === today && log.status === "done")
    })

    return {
      totalHabits: habits.size,
      completedToday: completed.length,
      streakCounter: completed.length > 0 ? Math.max(...completed.map((h) => h.currentStreak)) : 0,
      weeklyProgress: Math.round((completed.length / (habits.size || 1)) * 100),
      successRate: habits.size > 0 ? Math.round((completed.length / habits.size) * 100) : 0,
    }
  },
}
