"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles, Lightbulb, Lock } from "lucide-react"
import { PremiumGuard } from "@/lib/stripe/guard"
import { UpgradeBanner } from "@/components/upgrade-banner"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

function LockedContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        <div className="animate-slide-down">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              AI Habit Coach
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Get personalized guidance and recommendations</p>
        </div>

        <Card className="p-8 sm:p-12 text-center glass border-0 shadow-xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-slate-900 dark:text-white">Premium Feature</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
            AI Habit Coach is available on Pro and Team plans. Get personalized guidance, habit recommendations, and weekly plans.
          </p>
          <Link href="/pricing">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25">
              Upgrade to Pro
            </Button>
          </Link>
        </Card>

        <UpgradeBanner />
      </div>
    </div>
  )
}

function AiCoachContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI habit coach. I can help you build better habits, analyze your progress, and provide personalized recommendations. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Great question! Based on your habits, I recommend starting with 5-10 minutes daily and gradually increasing duration. Would you like a personalized plan?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        <div className="animate-slide-down">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              AI Habit Coach
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Get personalized guidance and recommendations</p>
        </div>

        <Card className="p-4 sm:p-6 h-[350px] sm:h-96 md:h-[500px] flex flex-col glass border-0 shadow-xl">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 sm:pr-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
                      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-[10px] sm:text-xs mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ask your AI coach anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11 text-sm"
            />
            <Button onClick={handleSend} size="icon" className="h-10 w-10 sm:h-11 sm:w-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 space-y-4 glass border-0 shadow-xl">
          <h2 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            Quick Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {[
              "How can I build a consistent morning routine?",
              "What habits should I track?",
              "How do I overcome habit failure?",
              "Can you generate a weekly plan for me?",
            ].map((question, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(question)
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: Date.now().toString(),
                      role: "user",
                      content: question,
                      timestamp: new Date(),
                    },
                  ])
                }}
                className="text-left text-xs sm:text-sm p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-all shadow-md hover:shadow-lg"
              >
                {question}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function AiCoachPage() {
  return (
    <PremiumGuard fallback={<LockedContent />}>
      <AiCoachContent />
    </PremiumGuard>
  )
}
