"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap, Crown, Users, Loader2 } from "lucide-react"
import { PLANS, PlanType } from "@/lib/stripe/plans"
import { getUserSubscription } from "@/lib/stripe/actions"

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    getUserSubscription().then((sub) => {
      setSubscription(sub)
      setLoading(false)
    })
  }, [])

  const handleCheckout = async (plan: "pro" | "team") => {
    setActionLoading(plan)
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
      if (url) window.location.href = url
      else if (error) alert(error)
    } finally {
      setActionLoading(null)
    }
  }

  const handleManage = async () => {
    setActionLoading("manage")
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const { url, error } = await res.json()
      if (url) window.location.href = url
      else if (error) alert(error)
    } finally {
      setActionLoading(null)
    }
  }

  const planIcons = { free: Zap, pro: Crown, team: Users }
  const planColors = { 
    free: { gradient: "from-slate-400 to-slate-500", shadow: "shadow-slate-500/30" },
    pro: { gradient: "from-purple-500 to-indigo-600", shadow: "shadow-purple-500/30" },
    team: { gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/30" },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  const currentPlan = subscription?.plan || "free"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        <div className="animate-slide-down">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-2">
            Subscription
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Choose the plan that works for you</p>
        </div>

        {/* Current Plan */}
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Current Plan</h2>
              <p className="text-sm text-muted-foreground">
                {PLANS[currentPlan as PlanType].name} Plan
                {currentPlan === "free" && " - Upgrade to unlock premium features"}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                ${PLANS[currentPlan as PlanType].price}
              </p>
              <p className="text-xs text-muted-foreground">per month</p>
            </div>
          </div>
          {currentPlan !== "free" && (
            <Button
              variant="outline"
              className="mt-4 bg-white dark:bg-slate-800"
              onClick={handleManage}
              disabled={actionLoading === "manage"}
            >
              {actionLoading === "manage" ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Manage Subscription
            </Button>
          )}
        </Card>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {(Object.keys(PLANS) as PlanType[]).map((planKey) => {
            const plan = PLANS[planKey]
            const Icon = planIcons[planKey]
            const colors = planColors[planKey]
            const isCurrent = currentPlan === planKey

            return (
              <Card
                key={planKey}
                className={`p-4 sm:p-6 transition-all glass border-0 shadow-xl hover-lift ${
                  isCurrent ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <div className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${colors.gradient} shadow-lg ${colors.shadow}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                </div>

                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  ${plan.price}
                  {plan.price > 0 && <span className="text-xs sm:text-sm text-muted-foreground">/month</span>}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                  {planKey === "free" && "Get started with the basics"}
                  {planKey === "pro" && "Advanced features for serious builders"}
                  {planKey === "team" && "Collaborate and grow together"}
                </p>

                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : planKey === "free" ? (
                  <Button variant="outline" className="w-full" disabled>
                    Free Forever
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25"
                    onClick={() => handleCheckout(planKey as "pro" | "team")}
                    disabled={actionLoading === planKey}
                  >
                    {actionLoading === planKey ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {currentPlan === "free" ? "Upgrade" : "Switch"} to {plan.name}
                  </Button>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
