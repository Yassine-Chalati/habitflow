import { NextRequest, NextResponse } from "next/server"
import { verifyToken, getUserFromToken } from "@/lib/api/auth"
import { prisma } from "@/lib/api/db"

export async function GET(request: NextRequest) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(habits)
}

export async function POST(request: NextRequest) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const habit = await prisma.habit.create({
    data: {
      userId: user.id,
      name: body.name,
      description: body.description || null,
      category: body.category || "Personal",
      frequency: body.frequency || "daily",
      frequencyDays: body.frequencyDays || null,
      color: body.color || "#6366f1",
      icon: body.icon || "target",
      priority: body.priority || "Medium",
    },
  })

  return NextResponse.json(habit, { status: 201 })
}



