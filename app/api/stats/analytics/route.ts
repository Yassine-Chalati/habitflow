import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/api/auth"
import { prisma } from "@/lib/api/db"

export async function GET(request: NextRequest) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "week"

  const days = period === "month" ? 30 : period === "year" ? 365 : 7
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const [logs, habits] = await Promise.all([
    prisma.habitLog.findMany({
      where: {
        userId: user.id,
        date: { gte: startDate },
        status: "done",
      },
      include: { habit: true },
    }),
    prisma.habit.findMany({ where: { userId: user.id } }),
  ])

  // Daily completions
  const dailyMap = new Map<string, number>()
  logs.forEach((log) => {
    const date = log.date.toISOString().split("T")[0]
    dailyMap.set(date, (dailyMap.get(date) || 0) + 1)
  })
  const dailyCompletions = Array.from(dailyMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // Category breakdown
  const categoryMap = new Map<string, number>()
  habits.forEach((habit) => {
    categoryMap.set(habit.category, (categoryMap.get(habit.category) || 0) + 1)
  })
  const categoryBreakdown = Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))

  // Streak history
  const streakHistory = habits.map((h) => ({
    date: h.updatedAt.toISOString().split("T")[0],
    streak: h.currentStreak,
  }))

  return NextResponse.json({
    dailyCompletions,
    categoryBreakdown,
    streakHistory,
  })
}



