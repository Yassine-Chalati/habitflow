import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/config"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      const userId = session.metadata?.supabase_user_id
      const plan = session.metadata?.plan

      if (userId && plan) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_plan: plan,
            subscription_status: "active",
            stripe_subscription_id: session.subscription,
          })
          .eq("id", userId)
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object
      const customerId = subscription.customer as string

      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single()

      if (profile) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_status: subscription.status === "active" ? "active" : "cancelled",
          })
          .eq("id", profile.id)
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object
      const customerId = subscription.customer as string

      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single()

      if (profile) {
        await supabaseAdmin
          .from("profiles")
          .update({
            subscription_plan: "free",
            subscription_status: "expired",
            stripe_subscription_id: null,
          })
          .eq("id", profile.id)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}



