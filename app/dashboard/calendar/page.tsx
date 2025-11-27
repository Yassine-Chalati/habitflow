"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10)) // Nov 2024

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const days = Array(getFirstDayOfMonth(currentDate))
    .fill(null)
    .concat(Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1))

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        <div className="animate-slide-down">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Calendar View
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Track your habits throughout the month</p>
        </div>

        <Card className="p-4 sm:p-6 lg:p-8 glass border-0 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Button variant="ghost" size="icon" onClick={previousMonth} className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-[10px] sm:text-xs font-semibold text-muted-foreground py-2">
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.charAt(0)}</span>
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {days.map((day, idx) => (
                <button
                  key={idx}
                  className={`aspect-square rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-medium transition-all ${
                    day === null 
                      ? "bg-transparent" 
                      : "bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-900 dark:text-white shadow-sm hover:shadow-md active:scale-95"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs">
            {[
              { color: "bg-green-500", label: "Completed" },
              { color: "bg-yellow-500", label: "Skipped" },
              { color: "bg-red-500", label: "Missed" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${item.color}`} />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
