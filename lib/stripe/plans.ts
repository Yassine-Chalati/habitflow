// Client-safe plans config (no Stripe server SDK)
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceId: null,
    features: ["Up to 3 habits", "Basic analytics", "7-day history"],
    limits: { maxHabits: 3, historyDays: 7 },
  },
  pro: {
    name: "Pro",
    price: 9,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || null,
    features: ["Unlimited habits", "Advanced analytics", "AI Coach", "Unlimited history", "Priority support"],
    limits: { maxHabits: Infinity, historyDays: Infinity },
  },
  team: {
    name: "Team",
    price: 29,
    priceId: process.env.NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID || null,
    features: ["Everything in Pro", "Team collaboration", "Admin dashboard", "API access", "Custom integrations"],
    limits: { maxHabits: Infinity, historyDays: Infinity },
  },
} as const

export type PlanType = keyof typeof PLANS



