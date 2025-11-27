"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UpgradeBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-4 text-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5" />
          <div>
            <p className="font-semibold">Upgrade to Pro</p>
            <p className="text-sm text-white/80">Unlock AI Coach, unlimited habits & more</p>
          </div>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href="/pricing">Upgrade</Link>
        </Button>
      </div>
    </div>
  )
}



