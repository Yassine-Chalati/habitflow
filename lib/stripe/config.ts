// Server-only Stripe config
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

// Re-export from plans for server usage
export { PLANS, type PlanType } from "./plans"

