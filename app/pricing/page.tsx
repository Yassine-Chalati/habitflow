"use client"

import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/lib/stripe/plans"
import { useState } from "react"

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (plan: "pro" | "team") => {
    setLoading(plan)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: PLANS[plan].priceId,
          plan,
        }),
      })
      const { url, error } = await res.json()
      if (res.status === 401) {
        // Not logged in - redirect to signup with return URL
        window.location.href = `/signup?redirect=/pricing&plan=${plan}`
        return
      }
      if (error) {
        alert(error)
      } else if (url) {
        window.location.href = url
      }
    } catch (err) {
      alert("Something went wrong")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">H</span>
          </div>
          <span className="font-semibold text-lg">HabitFlow</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Choose the perfect plan to build your best habits. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Free */}
          <div className="rounded-lg border border-border p-8 hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-semibold mb-2">{PLANS.free.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">Perfect for getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground ml-2">forever</span>
            </div>
            <Link href="/signup">
              <Button className="w-full mb-8">Get Started</Button>
            </Link>
            <div className="space-y-4">
              {PLANS.free.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro */}
          <div className="rounded-lg border border-primary/50 bg-primary/5 p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold mb-2">{PLANS.pro.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">For serious habit builders</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">${PLANS.pro.price}</span>
              <span className="text-muted-foreground ml-2">/ month</span>
            </div>
            <Button
              className="w-full mb-8"
              onClick={() => handleCheckout("pro")}
              disabled={loading === "pro"}
            >
              {loading === "pro" ? "Loading..." : "Subscribe to Pro"}
            </Button>
            <div className="space-y-4">
              {PLANS.pro.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="rounded-lg border border-border p-8 hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-semibold mb-2">{PLANS.team.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">For organizations</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">${PLANS.team.price}</span>
              <span className="text-muted-foreground ml-2">/ month</span>
            </div>
            <Button
              variant="outline"
              className="w-full mb-8 bg-transparent"
              onClick={() => handleCheckout("team")}
              disabled={loading === "team"}
            >
              {loading === "team" ? "Loading..." : "Subscribe to Team"}
            </Button>
            <div className="space-y-4">
              {PLANS.team.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
              },
              {
                q: "Is there a free trial?",
                a: "All plans include a 14-day free trial. No credit card required to get started.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and digital wallets through Stripe.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. Cancel your subscription anytime without penalties or hidden fees.",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20 border-t border-border mt-20">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start building better habits?</h2>
          <p className="text-lg text-muted-foreground mb-8">Start your 14-day free trial today</p>
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-semibold">HabitFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 HabitFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
