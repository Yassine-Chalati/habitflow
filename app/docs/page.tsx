import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", id: "introduction" },
        { title: "Installation", id: "installation" },
        { title: "Quick Start", id: "quick-start" },
      ],
    },
    {
      title: "Features",
      items: [
        { title: "Daily Tracking", id: "daily-tracking" },
        { title: "Analytics", id: "analytics" },
        { title: "Goal Setting", id: "goal-setting" },
        { title: "Streaks", id: "streaks" },
      ],
    },
    {
      title: "Account",
      items: [
        { title: "Profile Settings", id: "profile-settings" },
        { title: "Privacy & Security", id: "privacy-security" },
        { title: "Data Export", id: "data-export" },
        { title: "Billing", id: "billing" },
      ],
    },
    {
      title: "API",
      items: [
        { title: "Authentication", id: "api-auth" },
        { title: "Habits Endpoint", id: "habits-endpoint" },
        { title: "Analytics Endpoint", id: "analytics-endpoint" },
        { title: "Rate Limiting", id: "rate-limiting" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-border sticky top-0 bg-background">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">H</span>
          </div>
          <span className="font-semibold text-lg">HabitFlow</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="text-sm font-medium hover:text-primary transition-colors">Sign In</button>
          </Link>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-border p-6 h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px]">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search docs..." className="pl-10 h-9" />
            </div>
          </div>

          {sections.map((section, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-sm font-semibold mb-4 text-foreground">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item, j) => (
                  <a
                    key={j}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors pl-2 py-1 border-l border-transparent hover:border-primary"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold tracking-tight mb-4">Documentation</h1>
              <p className="text-xl text-muted-foreground">Learn how to use HabitFlow to build better habits</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              {/* Getting Started */}
              <section>
                <h2 id="introduction" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Introduction
                </h2>
                <p className="text-muted-foreground mb-4">
                  HabitFlow is a simple yet powerful habit tracking application designed to help you build and maintain
                  positive habits. Track daily habits, visualize your progress, and maintain streaks to stay motivated.
                </p>
              </section>

              <section>
                <h2 id="installation" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Installation
                </h2>
                <p className="text-muted-foreground mb-4">
                  Getting started with HabitFlow is simple. Just visit our website and sign up with your email address.
                  No installation required – everything works in your browser.
                </p>
              </section>

              <section>
                <h2 id="quick-start" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Quick Start
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>1. Sign up for a free HabitFlow account</p>
                  <p>2. Create your first habit by clicking "Add Habit"</p>
                  <p>3. Set your habit details (name, frequency, category)</p>
                  <p>4. Check in daily to mark habits as complete</p>
                  <p>5. Watch your streaks grow and view analytics</p>
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 id="daily-tracking" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Daily Tracking
                </h2>
                <p className="text-muted-foreground mb-4">
                  The dashboard provides a quick overview of all your habits for the day. Simply check off each habit as
                  you complete it. Your streak counter automatically updates to reflect your consistency.
                </p>
              </section>

              <section>
                <h2 id="analytics" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Analytics
                </h2>
                <p className="text-muted-foreground mb-4">
                  View detailed analytics on your habit performance. Track completion rates, identify patterns, and
                  celebrate milestones. Our visual charts make it easy to see your progress over time.
                </p>
              </section>

              <section>
                <h2 id="goal-setting" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Goal Setting
                </h2>
                <p className="text-muted-foreground mb-4">
                  Set specific goals for your habits and track progress toward achieving them. Whether you want a 30-day
                  streak or 100% weekly completion, HabitFlow helps you stay accountable.
                </p>
              </section>

              <section>
                <h2 id="streaks" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Streaks
                </h2>
                <p className="text-muted-foreground mb-4">
                  Build momentum with streaks. Each consecutive day you complete a habit increases your streak counter.
                  Break a streak, and it resets – motivation to get back on track.
                </p>
              </section>

              {/* Account */}
              <section>
                <h2 id="profile-settings" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Profile Settings
                </h2>
                <p className="text-muted-foreground mb-4">
                  Manage your profile information, email preferences, and display settings in the Settings page. Keep
                  your information up to date and customize your experience.
                </p>
              </section>

              <section>
                <h2 id="privacy-security" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Privacy & Security
                </h2>
                <p className="text-muted-foreground mb-4">
                  Your data is encrypted and secure. We never sell your information. You maintain complete control over
                  your data and can delete your account at any time.
                </p>
              </section>

              <section>
                <h2 id="data-export" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Data Export
                </h2>
                <p className="text-muted-foreground mb-4">
                  Export your habit data in CSV or PDF format from your settings. Perfect for backup or analysis in
                  other tools.
                </p>
              </section>

              <section>
                <h2 id="billing" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Billing
                </h2>
                <p className="text-muted-foreground mb-4">
                  Manage your subscription, view invoices, and update payment information in your account settings. All
                  plans include a 14-day free trial.
                </p>
              </section>

              {/* API */}
              <section>
                <h2 id="api-auth" className="text-3xl font-bold mb-6 scroll-mt-24">
                  API Authentication
                </h2>
                <p className="text-muted-foreground mb-4">
                  Use API tokens to authenticate requests. Generate tokens in your settings and include them in the
                  Authorization header of your API requests.
                </p>
              </section>

              <section>
                <h2 id="habits-endpoint" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Habits Endpoint
                </h2>
                <p className="text-muted-foreground mb-4">
                  Access and manage your habits programmatically. Get all habits, create new ones, or update existing
                  habits using our REST API.
                </p>
              </section>

              <section>
                <h2 id="analytics-endpoint" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Analytics Endpoint
                </h2>
                <p className="text-muted-foreground mb-4">
                  Fetch detailed analytics data for your habits. Get completion rates, streak information, and
                  historical data for analysis.
                </p>
              </section>

              <section>
                <h2 id="rate-limiting" className="text-3xl font-bold mb-6 scroll-mt-24">
                  Rate Limiting
                </h2>
                <p className="text-muted-foreground mb-4">
                  API requests are limited to 1000 requests per hour. If you exceed this limit, you'll receive a 429
                  status code.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
