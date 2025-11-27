import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, BarChart3, Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/20">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-white font-bold text-base sm:text-lg">H</span>
          </div>
          <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">HabitFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Features
          </a>
          <a href="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Pricing
          </a>
          <a href="/docs" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Docs
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-purple-600">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Start building better habits today</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-balance bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
            Build the habits that build your future
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 max-w-2xl text-balance">
            HabitFlow helps you track daily habits, maintain streaks, and visualize your progress. Built for people who
            want to level up their life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40">
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-balance text-slate-900 dark:text-white">
            Everything you need to succeed
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Built with the essential tools for habit tracking
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Daily Check-ins",
              description: "Quick and simple daily tracking. Mark habits complete in seconds.",
              gradient: "from-yellow-400 to-orange-500",
              shadow: "shadow-yellow-500/30",
            },
            {
              icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Beautiful Analytics",
              description: "Visualize your progress with intuitive charts and streak counters.",
              gradient: "from-blue-400 to-indigo-500",
              shadow: "shadow-blue-500/30",
            },
            {
              icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Goal Tracking",
              description: "Set specific goals and track your completion rates over time.",
              gradient: "from-green-400 to-emerald-500",
              shadow: "shadow-green-500/30",
            },
            {
              icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Private & Secure",
              description: "Your data is encrypted and always under your control.",
              gradient: "from-purple-400 to-pink-500",
              shadow: "shadow-purple-500/30",
            },
            {
              icon: <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Sync Everywhere",
              description: "Access your habits on any device, anytime, anywhere.",
              gradient: "from-cyan-400 to-blue-500",
              shadow: "shadow-cyan-500/30",
            },
            {
              icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Habit Stacking",
              description: "Chain habits together to build momentum and consistency.",
              gradient: "from-orange-400 to-red-500",
              shadow: "shadow-orange-500/30",
            },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.shadow} flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl shadow-purple-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Ready to transform your habits?</h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">Join thousands building better lives</p>
            <Link href="/login">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-white/90 shadow-xl">
                Start Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-12 sm:mt-20 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">HabitFlow</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">© 2025 HabitFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
