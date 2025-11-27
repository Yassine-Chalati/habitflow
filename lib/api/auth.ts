import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function getUserFromToken(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email || "",
    name: user.user_metadata?.name || user.email?.split("@")[0] || "",
    emailVerified: user.email_confirmed_at != null,
    roles: [] as string[],
  }
}

