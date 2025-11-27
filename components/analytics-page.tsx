"use client"

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card } from "@/components/ui/card"
import { Calendar, TrendingUp, Target, Flame, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AnalyticsPage() {
  const weeklyData = [
    { day: "Mon", completed: 3, total: 4 },
    { day: "Tue", completed: 4, total: 4 },
    { day: "Wed", completed: 3, total: 4 },
    { day: "Thu", completed: 2, total: 4 },
    { day: "Fri", completed: 4, total: 4 },
    { day: "Sat", completed: 3, total: 4 },
    { day: "Sun", completed: 4, total: 4 },
  ]

  const monthlyData = [
    { week: "Week 1", completion: 85 },
    { week: "Week 2", completion: 78 },
    { week: "Week 3", completion: 92 },
    { week: "Week 4", completion: 88 },
  ]

  const categoryData = [
    { name: "Health", value: 34, fill: "#3B82F6" },
    { name: "Learning", value: 28, fill: "#8B5CF6" },
    { name: "Wellness", value: 23, fill: "#10B981" },
    { name: "Productivity", value: 15, fill: "#F59E0B" },
  ]

  const stats = [
    { label: "Total Habits", value: "6", sub: "Active this week", icon: Target, gradient: "from-blue-400 to-indigo-500", shadow: "shadow-blue-500/30" },
    { label: "Avg Completion", value: "83%", sub: "Up from last week", icon: TrendingUp, gradient: "from-green-400 to-emerald-500", shadow: "shadow-green-500/30" },
    { label: "Longest Streak", value: "24", sub: "Morning Exercise", icon: Flame, gradient: "from-orange-400 to-red-500", shadow: "shadow-orange-500/30" },
    { label: "Total Completions", value: "847", sub: "All time", icon: CheckCircle, gradient: "from-purple-400 to-pink-500", shadow: "shadow-purple-500/30" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10 lg:mb-12 animate-slide-down">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-2">
              Analytics
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Track your progress and insights</p>
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2 bg-white dark:bg-slate-900 border-0 shadow-lg">
            <Calendar className="w-4 h-4" />
            This Week
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="p-4 sm:p-5 lg:p-6 glass border-0 shadow-lg hover-lift card-interactive">
              <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">{stat.label}</p>
                <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow} flex-shrink-0`}>
                  <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2 truncate">{stat.sub}</p>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Weekly Completion */}
          <Card className="p-4 sm:p-5 lg:p-6 glass border-0 shadow-xl">
            <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-slate-900 dark:text-white">Weekly Completion Rate</h3>
            <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <defs>
                    <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E879F9" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#F0ABFC" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="completed" fill="url(#completedGradient)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="total" fill="url(#totalGradient)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card className="p-4 sm:p-5 lg:p-6 glass border-0 shadow-xl">
            <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-slate-900 dark:text-white">Habits by Category</h3>
            <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card className="p-4 sm:p-5 lg:p-6 glass border-0 shadow-xl">
          <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-slate-900 dark:text-white">Monthly Completion Trend</h3>
          <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="completion"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorCompletion)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
