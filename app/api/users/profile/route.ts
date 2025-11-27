import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/api/auth"
import { prisma } from "@/lib/api/db"

export async function GET(request: NextRequest) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let profile = await prisma.user.findUnique({
    where: { id: user.id },
  })

  // Create profile if doesn't exist
  if (!profile) {
    profile = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name || user.email.split("@")[0],
      },
    })
  }

  return NextResponse.json(profile)
}

export async function PATCH(request: NextRequest) {
  const user = await getUserFromToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const profile = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      avatarUrl: body.avatarUrl,
      theme: body.theme,
      language: body.language,
      updatedAt: new Date(),
    },
  })

  return NextResponse.json(profile)
}



