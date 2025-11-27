"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Trophy, Zap } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8">
        <div className="animate-slide-down">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your profile and statistics</p>
        </div>

        {/* Profile Header */}
        <Card className="p-4 sm:p-6 glass border-0 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">John Doe</h2>
              <p className="text-sm sm:text-base text-muted-foreground">john@example.com</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3 sm:mt-4">
                <span className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium">
                  Premium Member
                </span>
                <span className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
                  Streak: 42 days
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: Trophy, label: "Achievements", value: "8", color: "from-yellow-400 to-orange-500", shadow: "shadow-yellow-500/30" },
            { icon: Zap, label: "Habits Created", value: "12", color: "from-purple-400 to-pink-500", shadow: "shadow-purple-500/30" },
            { icon: Mail, label: "Joined", value: "Aug 2024", color: "from-blue-400 to-indigo-500", shadow: "shadow-blue-500/30" },
          ].map((stat, i) => (
            <Card key={i} className="p-4 sm:p-5 glass border-0 shadow-lg hover-lift">
              <div className="flex items-center gap-3">
                <div className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg ${stat.shadow}`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Edit Profile */}
        <Card className="p-4 sm:p-6 space-y-4 sm:space-y-5 glass border-0 shadow-xl">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Edit Profile</h2>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
            <Input defaultValue="John Doe" className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11" />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <Input type="email" defaultValue="john@example.com" className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11" />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label>
            <textarea
              defaultValue="Passionate about building better habits and productivity"
              className="w-full px-3 py-2 sm:py-3 border-0 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md text-sm"
              rows={3}
            />
          </div>
          <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25">
            Save Changes
          </Button>
        </Card>
      </div>
    </div>
  )
}
