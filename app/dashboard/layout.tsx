import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export const metadata = {
  title: "Dashboard - HabitFlow",
  description: "Track and manage your habits",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
