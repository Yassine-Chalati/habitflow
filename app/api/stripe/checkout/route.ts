import { NextRequest, NextResponse } from "next/server"
import { stripe, PLANS } from "@/lib/stripe/config"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { priceId, plan } = await request.json()

  if (!priceId || !PLANS[plan as keyof typeof PLANS]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
  }

  // Get or create Stripe customer
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single()

  let customerId = profile?.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id

    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id)
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${request.headers.get("origin")}/dashboard/subscription?success=true`,
    cancel_url: `${request.headers.get("origin")}/pricing?canceled=true`,
    metadata: {
      supabase_user_id: user.id,
      plan,
    },
  })

  return NextResponse.json({ url: session.url })
}



