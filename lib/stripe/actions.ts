"use server"

import { createClient } from "@/lib/supabase/server"
import { PLANS, PlanType } from "./plans"

export async function getUserSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_plan, subscription_status")
    .eq("id", user.id)
    .single()

  const plan = (profile?.subscription_plan || "free") as PlanType

  return {
    plan,
    status: profile?.subscription_status || "active",
    ...PLANS[plan],
  }
}

export async function checkPremiumAccess() {
  const subscription = await getUserSubscription()
  return subscription?.plan !== "free" && subscription?.status === "active"
}

export async function checkFeatureAccess(feature: "ai_coach" | "advanced_analytics" | "unlimited_habits") {
  const subscription = await getUserSubscription()
  if (!subscription) return false

  const premiumFeatures = ["ai_coach", "advanced_analytics", "unlimited_habits"]
  
  if (premiumFeatures.includes(feature)) {
    return subscription.plan !== "free" && subscription.status === "active"
  }

  return true
}

export async function getHabitLimit() {
  const subscription = await getUserSubscription()
  return subscription?.limits.maxHabits || 3
}

