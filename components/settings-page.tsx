"use client"

import { useState } from "react"
import { Mail, Lock, Bell, Moon, Globe, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: Mail },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-slide-down">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 shadow-lg shadow-slate-500/30">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-md"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card className="p-4 sm:p-6 glass border-0 shadow-xl">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
                  <Input type="text" placeholder="John Doe" className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 sm:py-3 border-0 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md text-sm"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6 glass border-0 shadow-xl">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6">Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">Current Password</label>
                    <Input type="password" placeholder="••••••••" className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11" />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">New Password</label>
                    <Input type="password" placeholder="••••••••" className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11" />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium block mb-2 text-slate-700 dark:text-slate-300">Confirm Password</label>
                    <Input type="password" placeholder="••••••••" className="bg-white dark:bg-slate-800 border-0 shadow-md h-10 sm:h-11" />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25">
                      Update Password
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 glass border-0 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">Two-Factor Authentication</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Secure your account with 2FA</p>
                  </div>
                  <Button variant="outline" className="bg-white dark:bg-slate-800 border-0 shadow-md">Enable</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-3 sm:space-y-4">
              {[
                { title: "Daily Reminders", description: "Get reminded to check your habits daily" },
                { title: "Streak Milestones", description: "Celebrate when you hit 7, 30, 100 day streaks" },
                { title: "Weekly Summary", description: "Receive a weekly summary of your progress" },
                { title: "Product Updates", description: "Learn about new features and improvements" },
              ].map((item, i) => (
                <Card key={i} className="p-4 sm:p-6 flex items-center justify-between glass border-0 shadow-xl">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-purple-600" />
                </Card>
              ))}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-3 sm:space-y-4">
              <Card className="p-4 sm:p-6 glass border-0 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Use dark theme across the app</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-purple-600" />
                </div>
              </Card>

              <Card className="p-4 sm:p-6 glass border-0 shadow-xl">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4" />
                    Language
                  </h3>
                  <select className="w-full px-3 py-2 sm:py-2.5 border-0 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">Danger Zone</h2>
          <Card className="p-4 sm:p-6 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-red-600 dark:text-red-400">Delete Account</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" className="w-full sm:w-auto">Delete</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
