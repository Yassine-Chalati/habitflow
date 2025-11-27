"use server"

import { createClient } from "./server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/onboarding")
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/dashboard")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return profile
}

// Habits
export async function getHabits() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data: habits } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return habits || []
}

export async function createHabit(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("habits").insert({
    user_id: user.id,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    frequency: formData.get("frequency") as "daily" | "weekly" | "monthly",
    color: formData.get("color") as string || "#6366f1",
    icon: formData.get("icon") as string || "target",
    priority: formData.get("priority") as "Low" | "Medium" | "High" || "Medium",
  })

  if (error) return { error: error.message }

  revalidatePath("/dashboard/habits")
  redirect("/dashboard/habits")
}

export async function logHabit(habitId: string, status: "done" | "skipped" | "failed") {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { error: "Not authenticated" }

  const today = new Date().toISOString().split("T")[0]

  // Upsert to handle if already logged today
  const { error } = await supabase.from("habit_logs").upsert({
    habit_id: habitId,
    user_id: user.id,
    date: today,
    status,
    completed_at: status === "done" ? new Date().toISOString() : null,
  }, {
    onConflict: "habit_id,date",
  })

  if (error) return { error: error.message }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function getTodayLogs() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const today = new Date().toISOString().split("T")[0]

  const { data: logs } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", today)

  return logs || []
}



