"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, BarChart3, Calendar, Award } from "lucide-react"

export default function AnalyticsContent() {
  const chartData = [
    { name: "Mon", completed: 5, total: 8 },
    { name: "Tue", completed: 6, total: 8 },
    { name: "Wed", completed: 4, total: 8 },
    { name: "Thu", completed: 7, total: 8 },
    { name: "Fri", completed: 8, total: 8 },
    { name: "Sat", completed: 3, total: 8 },
    { name: "Sun", completed: 5, total: 8 },
  ]

  const maxCompleted = Math.max(...chartData.map((d) => d.completed))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your progress and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Weekly Average</p>
              <p className="text-2xl font-bold text-foreground mt-1">5.4/8</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Best Day</p>
              <p className="text-2xl font-bold text-foreground mt-1">Friday</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-foreground mt-1">67%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total Days</p>
              <p className="text-2xl font-bold text-foreground mt-1">142</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Weekly Completion Rate</h2>
        <div className="flex items-end justify-between gap-2 h-48">
          {chartData.map((day) => (
            <div key={day.name} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-40 relative">
                <div
                  className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all hover:from-purple-600 hover:to-purple-500"
                  style={{ height: `${(day.completed / day.total) * 100}%` }}
                />
              </div>
              <p className="text-xs font-medium text-foreground">{day.name}</p>
              <p className="text-xs text-muted-foreground">
                {day.completed}/{day.total}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
        <h2 className="text-lg font-semibold text-foreground mb-4">This Week's Insights</h2>
        <ul className="space-y-2 text-sm text-foreground">
          <li>✓ You're most consistent on Fridays - keep it up!</li>
          <li>✓ Best streak: 8 days (Meditation habit)</li>
          <li>✓ Try adding reminders on Saturdays to improve completion</li>
        </ul>
      </Card>
    </div>
  )
}
