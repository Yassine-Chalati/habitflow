const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

interface ApiOptions {
  token?: string | null
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & ApiOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...fetchOptions.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API Error" }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// Habits API
export const habitsApi = {
  getAll: (token: string | null) =>
    apiRequest<Habit[]>("/habits", { token }),

  getById: (id: string, token: string | null) =>
    apiRequest<Habit>(`/habits/${id}`, { token }),

  create: (data: CreateHabitDto, token: string | null) =>
    apiRequest<Habit>("/habits", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),

  update: (id: string, data: UpdateHabitDto, token: string | null) =>
    apiRequest<Habit>(`/habits/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      token,
    }),

  delete: (id: string, token: string | null) =>
    apiRequest<void>(`/habits/${id}`, { method: "DELETE", token }),

  log: (id: string, data: LogHabitDto, token: string | null) =>
    apiRequest<HabitLog>(`/habits/${id}/log`, {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),

  getLogs: (id: string, token: string | null, days = 30) =>
    apiRequest<HabitLog[]>(`/habits/${id}/logs?days=${days}`, { token }),
}

// Stats API
export const statsApi = {
  getDashboard: (token: string | null) =>
    apiRequest<DashboardStats>("/stats/dashboard", { token }),

  getAnalytics: (token: string | null, period = "week") =>
    apiRequest<AnalyticsData>(`/stats/analytics?period=${period}`, { token }),
}

// User API
export const userApi = {
  getProfile: (token: string | null) =>
    apiRequest<UserProfile>("/users/profile", { token }),

  updateProfile: (data: UpdateProfileDto, token: string | null) =>
    apiRequest<UserProfile>("/users/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
      token,
    }),
}

// Types
export interface Habit {
  id: string
  userId: string
  name: string
  description: string | null
  category: string
  frequency: "daily" | "weekly" | "monthly"
  frequencyDays: number[] | null
  startDate: string
  endDate: string | null
  color: string
  icon: string
  priority: "Low" | "Medium" | "High"
  currentStreak: number
  longestStreak: number
  successRate: number
  createdAt: string
  updatedAt: string
}

export interface HabitLog {
  id: string
  habitId: string
  userId: string
  date: string
  status: "done" | "skipped" | "failed" | "pending"
  note: string | null
  completedAt: string | null
  createdAt: string
}

export interface CreateHabitDto {
  name: string
  description?: string
  category?: string
  frequency?: "daily" | "weekly" | "monthly"
  frequencyDays?: number[]
  color?: string
  icon?: string
  priority?: "Low" | "Medium" | "High"
}

export interface UpdateHabitDto extends Partial<CreateHabitDto> {}

export interface LogHabitDto {
  status: "done" | "skipped" | "failed"
  note?: string
  date?: string
}

export interface DashboardStats {
  totalHabits: number
  completedToday: number
  currentStreak: number
  weeklyProgress: number
  successRate: number
}

export interface AnalyticsData {
  dailyCompletions: { date: string; count: number }[]
  categoryBreakdown: { category: string; count: number }[]
  streakHistory: { date: string; streak: number }[]
}

export interface UserProfile {
  id: string
  email: string
  name: string
  avatarUrl: string | null
  subscriptionPlan: "free" | "pro" | "team"
  theme: "light" | "dark" | "auto"
  language: string
  createdAt: string
}

export interface UpdateProfileDto {
  name?: string
  avatarUrl?: string
  theme?: "light" | "dark" | "auto"
  language?: string
}



