import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/api/auth"
import { prisma } from "@/lib/api/db"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: habitId } = await params
  const body = await request.json()
  const date = body.date || new Date().toISOString().split("T")[0]

  // Verify habit belongs to user
  const habit = await prisma.habit.findFirst({
    where: { id: habitId, userId: user.id },
  })

  if (!habit) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 })
  }

  // Upsert log for the date
  const log = await prisma.habitLog.upsert({
    where: {
      habitId_date: { habitId, date: new Date(date) },
    },
    update: {
      status: body.status,
      note: body.note || null,
      completedAt: body.status === "done" ? new Date() : null,
    },
    create: {
      habitId,
      userId: user.id,
      date: new Date(date),
      status: body.status,
      note: body.note || null,
      completedAt: body.status === "done" ? new Date() : null,
    },
  })

  // Update streak if completed
  if (body.status === "done") {
    await updateStreak(habitId)
  }

  return NextResponse.json(log, { status: 201 })
}

async function updateStreak(habitId: string) {
  const logs = await prisma.habitLog.findMany({
    where: { habitId, status: "done" },
    orderBy: { date: "desc" },
    take: 100,
  })

  let currentStreak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date)
    logDate.setHours(0, 0, 0, 0)

    const expectedDate = new Date(today)
    expectedDate.setDate(expectedDate.getDate() - i)

    if (logDate.getTime() === expectedDate.getTime()) {
      currentStreak++
    } else {
      break
    }
  }

  const habit = await prisma.habit.findUnique({ where: { id: habitId } })
  const longestStreak = Math.max(habit?.longestStreak || 0, currentStreak)

  await prisma.habit.update({
    where: { id: habitId },
    data: { currentStreak, longestStreak },
  })
}



