"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Zap, Target, BarChart3, Check } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const STEPS = [
  {
    title: "Welcome to HabitFlow",
    description: "Build better habits and transform your life",
    icon: Zap,
  },
  {
    title: "Set Your Goals",
    description: "Tell us what you want to achieve",
    icon: Target,
  },
  {
    title: "Track Progress",
    description: "Monitor your habits and celebrate wins",
    icon: BarChart3,
  },
]

const GOALS = ["Health", "Productivity", "Learning", "Fitness", "Mindfulness", "Finance"]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    )
  }

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      // Save user preferences
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user && name) {
        await supabase.from("profiles").update({ name }).eq("id", user.id)
      }
      
      router.push("/dashboard")
    }
  }

  const currentStepData = STEPS[step]
  const CurrentIcon = currentStepData.icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-background dark:to-background">
      <Card className="max-w-md w-full p-8 space-y-8">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex gap-2">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-1 rounded-full transition-colors ${idx <= step ? "bg-purple-600" : "bg-border"}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <CurrentIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{currentStepData.title}</h1>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </div>

          {/* Step 0: Name Input */}
          {step === 0 && (
            <div className="space-y-4">
              <Input
                placeholder="What's your name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-accent border-0"
              />
              <p className="text-xs text-muted-foreground text-center">We'll use this to personalize your experience</p>
            </div>
          )}

          {/* Step 1: Goals */}
          {step === 1 && (
            <div className="space-y-3">
              {GOALS.map((goal) => {
                const isSelected = selectedGoals.includes(goal)
                return (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all font-medium flex items-center justify-between ${
                      isSelected 
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
                        : "border-border hover:border-purple-300"
                    }`}
                  >
                    {goal}
                    {isSelected && <Check className="w-5 h-5 text-purple-600" />}
                  </button>
                )
              })}
              <p className="text-xs text-muted-foreground text-center">Select all that apply</p>
            </div>
          )}

          {/* Step 2: Features */}
          {step === 2 && (
            <div className="space-y-3 text-sm text-foreground">
              <div className="flex gap-3">
                <span className="text-lg">✓</span>
                <span>Track multiple habits simultaneously</span>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">✓</span>
                <span>Get AI-powered insights and recommendations</span>
              </div>
              <div className="flex gap-3">
                <span className="text-lg">✓</span>
                <span>Join a community of habit builders</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <Button
          onClick={handleNext}
          className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          {step === STEPS.length - 1 ? "Get Started" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  )
}
