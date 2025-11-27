"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkPremiumAccess } from "./actions"

interface PremiumGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PremiumGuard({ children, fallback }: PremiumGuardProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkPremiumAccess().then((access) => {
      setHasAccess(access)
      if (!access && !fallback) {
        router.push("/pricing?upgrade=true")
      }
    })
  }, [router, fallback])

  if (hasAccess === null) {
    return <div className="flex items-center justify-center p-8">Loading...</div>
  }

  if (!hasAccess) {
    return fallback || null
  }

  return <>{children}</>
}



