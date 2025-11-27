import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/api/auth"
import { prisma } from "@/lib/api/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: habitId } = await params
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get("days") || "30")

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const logs = await prisma.habitLog.findMany({
    where: {
      habitId,
      userId: user.id,
      date: { gte: startDate },
    },
    orderBy: { date: "desc" },
  })

  return NextResponse.json(logs)
}



