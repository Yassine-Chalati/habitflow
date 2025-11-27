// Supabase database client
import { createClient } from "@/lib/supabase/server"

export async function getDb() {
  return await createClient()
}

// Prisma-like interface using Supabase
export const prisma = {
  habit: {
    findMany: async ({ where, orderBy }: any) => {
      const supabase = await createClient()
      let query = supabase.from("habits").select("*")
      if (where?.userId) query = query.eq("user_id", where.userId)
      if (orderBy?.createdAt) query = query.order("created_at", { ascending: orderBy.createdAt === "asc" })
      const { data } = await query
      return (data || []).map(mapHabitFromDb)
    },
    findFirst: async ({ where }: any) => {
      const supabase = await createClient()
      let query = supabase.from("habits").select("*")
      if (where?.id) query = query.eq("id", where.id)
      if (where?.userId) query = query.eq("user_id", where.userId)
      const { data } = await query.single()
      return data ? mapHabitFromDb(data) : null
    },
    findUnique: async ({ where }: any) => {
      const supabase = await createClient()
      const { data } = await supabase.from("habits").select("*").eq("id", where.id).single()
      return data ? mapHabitFromDb(data) : null
    },
    create: async ({ data }: any) => {
      const supabase = await createClient()
      const { data: habit } = await supabase.from("habits").insert(mapHabitToDb(data)).select().single()
      return habit ? mapHabitFromDb(habit) : null
    },
    update: async ({ where, data }: any) => {
      const supabase = await createClient()
      const { data: habit } = await supabase.from("habits").update(mapHabitToDb(data)).eq("id", where.id).select().single()
      return habit ? mapHabitFromDb(habit) : null
    },
    updateMany: async ({ where, data }: any) => {
      const supabase = await createClient()
      let query = supabase.from("habits").update(mapHabitToDb(data))
      if (where?.id) query = query.eq("id", where.id)
      if (where?.userId) query = query.eq("user_id", where.userId)
      const { count } = await query
      return { count: count || 0 }
    },
    deleteMany: async ({ where }: any) => {
      const supabase = await createClient()
      let query = supabase.from("habits").delete()
      if (where?.id) query = query.eq("id", where.id)
      if (where?.userId) query = query.eq("user_id", where.userId)
      const { count } = await query
      return { count: count || 0 }
    },
  },
  habitLog: {
    findMany: async ({ where, orderBy, include }: any) => {
      const supabase = await createClient()
      let query = supabase.from("habit_logs").select(include?.habit ? "*, habits(*)" : "*")
      if (where?.habitId) query = query.eq("habit_id", where.habitId)
      if (where?.userId) query = query.eq("user_id", where.userId)
      if (where?.date) query = query.eq("date", where.date)
      if (where?.status) query = query.eq("status", where.status)
      if (where?.date?.gte) query = query.gte("date", where.date.gte.toISOString())
      if (orderBy?.date) query = query.order("date", { ascending: orderBy.date === "asc" })
      const { data } = await query
      return (data || []).map((d: any) => ({
        ...mapLogFromDb(d),
        habit: d.habits ? mapHabitFromDb(d.habits) : undefined,
      }))
    },
    upsert: async ({ where, update, create }: any) => {
      const supabase = await createClient()
      const { data } = await supabase.from("habit_logs").upsert({
        habit_id: create.habitId,
        user_id: create.userId,
        date: create.date.toISOString().split("T")[0],
        status: update.status || create.status,
        note: update.note || create.note,
        completed_at: update.completedAt || create.completedAt,
      }, { onConflict: "habit_id,date" }).select().single()
      return data ? mapLogFromDb(data) : null
    },
  },
  user: {
    findUnique: async ({ where }: any) => {
      const supabase = await createClient()
      const { data } = await supabase.from("profiles").select("*").eq("id", where.id).single()
      return data ? mapUserFromDb(data) : null
    },
    create: async ({ data }: any) => {
      const supabase = await createClient()
      const { data: user } = await supabase.from("profiles").insert({
        id: data.id,
        email: data.email,
        name: data.name,
      }).select().single()
      return user ? mapUserFromDb(user) : null
    },
    update: async ({ where, data }: any) => {
      const supabase = await createClient()
      const { data: user } = await supabase.from("profiles").update({
        name: data.name,
        avatar_url: data.avatarUrl,
        theme: data.theme,
        language: data.language,
        updated_at: new Date().toISOString(),
      }).eq("id", where.id).select().single()
      return user ? mapUserFromDb(user) : null
    },
  },
}

// Mappers
function mapHabitFromDb(h: any) {
  return {
    id: h.id,
    userId: h.user_id,
    name: h.name,
    description: h.description,
    category: h.category,
    frequency: h.frequency,
    frequencyDays: h.frequency_days,
    startDate: h.start_date,
    endDate: h.end_date,
    color: h.color,
    icon: h.icon,
    priority: h.priority,
    currentStreak: h.current_streak,
    longestStreak: h.longest_streak,
    successRate: h.success_rate,
    createdAt: h.created_at,
    updatedAt: h.updated_at,
  }
}

function mapHabitToDb(h: any) {
  const mapped: any = {}
  if (h.userId !== undefined) mapped.user_id = h.userId
  if (h.name !== undefined) mapped.name = h.name
  if (h.description !== undefined) mapped.description = h.description
  if (h.category !== undefined) mapped.category = h.category
  if (h.frequency !== undefined) mapped.frequency = h.frequency
  if (h.frequencyDays !== undefined) mapped.frequency_days = h.frequencyDays
  if (h.color !== undefined) mapped.color = h.color
  if (h.icon !== undefined) mapped.icon = h.icon
  if (h.priority !== undefined) mapped.priority = h.priority
  if (h.currentStreak !== undefined) mapped.current_streak = h.currentStreak
  if (h.longestStreak !== undefined) mapped.longest_streak = h.longestStreak
  if (h.updatedAt !== undefined) mapped.updated_at = h.updatedAt
  return mapped
}

function mapLogFromDb(l: any) {
  return {
    id: l.id,
    habitId: l.habit_id,
    userId: l.user_id,
    date: new Date(l.date),
    status: l.status,
    note: l.note,
    completedAt: l.completed_at,
    createdAt: l.created_at,
  }
}

function mapUserFromDb(u: any) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    avatarUrl: u.avatar_url,
    subscriptionPlan: u.subscription_plan,
    subscriptionStatus: u.subscription_status,
    theme: u.theme,
    language: u.language,
    createdAt: u.created_at,
    updatedAt: u.updated_at,
  }
}

