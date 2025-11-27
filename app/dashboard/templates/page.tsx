"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Zap } from "lucide-react"

const TEMPLATES = [
  {
    id: 1,
    name: "Morning Routine",
    description: "Start your day right",
    habits: ["Meditation", "Exercise", "Breakfast"],
    icon: "🌅",
    color: "#F59E0B",
  },
  {
    id: 2,
    name: "Night Routine",
    description: "Wind down before bed",
    habits: ["Journal", "Read", "Sleep"],
    icon: "🌙",
    color: "#6366F1",
  },
  {
    id: 3,
    name: "Gym Routine",
    description: "Stay fit and healthy",
    habits: ["Cardio", "Weights", "Stretching"],
    icon: "💪",
    color: "#EF4444",
  },
  {
    id: 4,
    name: "Productivity Routine",
    description: "Maximize your work output",
    habits: ["Deep Work", "Breaks", "Planning"],
    icon: "🚀",
    color: "#8B5CF6",
  },
  {
    id: 5,
    name: "Health Routine",
    description: "Improve your wellness",
    habits: ["Hydration", "Nutrition", "Sleep"],
    icon: "❤️",
    color: "#EC4899",
  },
  {
    id: 6,
    name: "Learning Routine",
    description: "Continuous improvement",
    habits: ["Study", "Practice", "Review"],
    icon: "📚",
    color: "#10B981",
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 animate-slide-down">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Templates
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Start with a pre-built habit template
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {TEMPLATES.map((template, index) => (
            <Card 
              key={template.id} 
              className="p-4 sm:p-5 lg:p-6 glass border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 text-2xl sm:text-3xl lg:text-4xl transition-transform group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${template.color}20, ${template.color}10)`,
                }}
              >
                {template.icon}
              </div>
              
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 dark:text-white">
                {template.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {template.description}
              </p>

              <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Includes:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {template.habits.map((habit, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg font-medium"
                      style={{ 
                        backgroundColor: `${template.color}15`,
                        color: template.color,
                      }}
                    >
                      {habit}
                    </span>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full mt-4 sm:mt-5 lg:mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98]"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Use Template
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
