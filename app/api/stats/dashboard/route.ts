import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/api/auth"
import { prisma } from "@/lib/api/db"

export async function GET(request: NextRequest) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [habits, todayLogs] = await Promise.all([
    prisma.habit.findMany({ where: { userId: user.id } }),
    prisma.habitLog.findMany({
      where: {
        userId: user.id,
        date: today,
        status: "done",
      },
    }),
  ])

  const totalHabits = habits.length
  const completedToday = todayLogs.length
  const currentStreak = habits.length > 0 
    ? Math.max(...habits.map(h => h.currentStreak)) 
    : 0
  const weeklyProgress = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100) 
    : 0
  const successRate = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100) 
    : 0

  return NextResponse.json({
    totalHabits,
    completedToday,
    currentStreak,
    weeklyProgress,
    successRate,
  })
}



