export type HabitFrequency = "daily" | "weekly" | "monthly"
export type HabitCategory = "Work" | "Home" | "Gym" | "Health" | "Study" | "Personal" | string
export type PriorityLevel = "Low" | "Medium" | "High"
export type HabitStatus = "done" | "skipped" | "failed" | "pending"

export interface Habit {
  id: string
  name: string
  description: string
  category: HabitCategory
  frequency: HabitFrequency
  frequencyDays?: number[] // For weekly (0-6), monthly (1-31)
  startDate: Date
  endDate?: Date
  reminders: Reminder[]
  color: string
  icon: string
  priority: PriorityLevel
  currentStreak: number
  longestStreak: number
  successRate: number
  createdAt: Date
  updatedAt: Date
}

export interface Reminder {
  id: string
  habitId: string
  time: string
  type: "time" | "location" | "event"
  enabled: boolean
}

export interface HabitLog {
  id: string
  habitId: string
  date: Date
  status: HabitStatus
  note?: string
  completedAt?: Date
}

export interface UserStats {
  totalHabits: number
  completedToday: number
  streakCounter: number
  weeklyProgress: number
  successRate: number
}

export interface Subscription {
  plan: "free" | "pro" | "team"
  status: "active" | "cancelled" | "expired"
  renewalDate?: Date
  stripeId?: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: Subscription
  theme: "light" | "dark" | "auto"
  language: string
  createdAt: Date
  updatedAt: Date
}
