# HabitFlow - Habit Tracking SaaS MVP

A comprehensive habit tracking application built with Next.js, React, and Tailwind CSS. Track daily habits, maintain streaks, visualize progress, and get AI-powered insights.

## Features

### Core Habit Management
- Create, edit, and delete habits with detailed configuration
- Set habit frequency (daily, weekly, monthly)
- Categorize habits (Work, Home, Gym, Health, Study, Personal)
- Assign priority levels (Low, Medium, High)
- Custom colors and icons for each habit
- Multiple reminders per habit

### Tracking & Streaks
- Daily checklist view with quick mark-as-done
- Weekly calendar grid view
- Monthly calendar overview
- Streak tracking (current and longest)
- Success rate calculation
- Auto-reset functionality

### Dashboard
- Today's view with habit completion status
- Progress rings showing completion percentage
- Weekly heatmap
- Quick-add habit button
- Motivational statistics

### Analytics & Insights
- Weekly completion charts
- Monthly trend analysis
- Category breakdown pie charts
- Success rate tracking
- Best performing habits
- Consistency scoring

### Views
- **Today View**: Daily habit checklist with stats
- **Calendar View**: Monthly calendar with completion markers
- **Weekly View**: Grid view of habits for the week
- **Analytics**: Detailed charts and insights
- **Templates**: Pre-built habit templates (Morning Routine, Gym, etc.)

### AI Features
- AI Habit Coach with chat interface
- Personalized habit recommendations
- Weekly feedback and suggestions
- Pattern detection and optimization

### User Management
- Profile management
- Settings and preferences
- Dark/Light mode toggle
- Language selection
- Privacy settings

### Subscription
- Free tier with unlimited habits
- Pro tier ($9.99/month) with AI Coach and advanced analytics
- Team tier ($19.99/month) with group habits

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                    # Landing page
│   ├── login/
│   │   └── page.tsx               # Login page
│   ├── signup/
│   │   └── page.tsx               # Sign up page
│   ├── onboarding/
│   │   └── page.tsx               # Onboarding flow
│   ├── pricing/
│   │   └── page.tsx               # Pricing page
│   ├── docs/
│   │   └── page.tsx               # Documentation
│   ├── dashboard/
│   │   ├── layout.tsx             # Dashboard layout with sidebar
│   │   ├── page.tsx               # Redirect to today
│   │   ├── today/
│   │   │   └── page.tsx           # Today's view
│   │   ├── habits/
│   │   │   ├── page.tsx           # Habits list
│   │   │   ├── new/
│   │   │   │   └── page.tsx       # Create new habit
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Habit details
│   │   ├── calendar/
│   │   │   └── page.tsx           # Calendar view
│   │   ├── analytics/
│   │   │   ├── page.tsx           # Analytics dashboard
│   │   │   └── analytics-content.tsx
│   │   ├── ai-coach/
│   │   │   └── page.tsx           # AI coach chat
│   │   ├── templates/
│   │   │   └── page.tsx           # Habit templates
│   │   ├── profile/
│   │   │   └── page.tsx           # User profile
│   │   ├── subscription/
│   │   │   └── page.tsx           # Subscription management
│   │   └── settings/
│   │       └── page.tsx           # Settings page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── components/
│   ├── landing.tsx                # Landing page component
│   ├── login-form.tsx             # Login form
│   ├── signup-form.tsx            # Signup form
│   ├── sidebar.tsx                # Dashboard sidebar
│   ├── dashboard-layout.tsx       # Dashboard wrapper
│   ├── dashboard-content.tsx      # Dashboard content
│   ├── habits-page.tsx            # Habits management
│   ├── analytics-page.tsx         # Analytics page
│   ├── settings-page.tsx          # Settings page
│   └── ui/                        # UI components (shadcn/ui)
├── lib/
│   ├── types.ts                   # TypeScript interfaces
│   ├── store.ts                   # In-memory state management
│   └── utils.ts                   # Utility functions
└── public/                        # Static assets
\`\`\`

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React hooks + in-memory store (ready for Firebase/Backend integration)

## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd habitflow

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. **Sign Up/Login**: Create an account or log in
2. **Onboarding**: Complete the setup wizard
3. **Create Habits**: Add your first habit from the Today view
4. **Track Daily**: Mark habits as complete each day
5. **Monitor Progress**: Check analytics and streaks
6. **Get AI Insights**: Chat with the AI coach for recommendations

## Available Routes

- `/` - Landing page
- `/login` - Login page
- `/signup` - Sign up page
- `/onboarding` - Onboarding flow
- `/pricing` - Pricing plans
- `/docs` - Documentation
- `/dashboard/today` - Today's view (main dashboard)
- `/dashboard/habits` - Habits list
- `/dashboard/habits/new` - Create new habit
- `/dashboard/habits/:id` - Habit details
- `/dashboard/calendar` - Calendar view
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/ai-coach` - AI coach chat
- `/dashboard/templates` - Habit templates
- `/dashboard/profile` - User profile
- `/dashboard/subscription` - Subscription management
- `/dashboard/settings` - Settings

## Design System

### Color Palette
- Primary: Purple (#5538E8)
- Accent Colors: Green, Blue, Orange, Red
- Neutrals: White, Grays, Black

### Typography
- Headings: Geist (sans-serif)
- Body: Geist (sans-serif)
- Monospace: Geist Mono

### Components
All components follow shadcn/ui conventions with Tailwind CSS for consistent styling.

## Features Roadmap

### Phase 2
- [ ] Backend integration (Firebase or custom Node.js)
- [ ] User authentication
- [ ] Cloud data sync
- [ ] Push notifications
- [ ] Mobile app (React Native)

### Phase 3
- [ ] Social features (friends, leaderboard)
- [ ] Advanced AI features
- [ ] Integrations (Google Calendar, Apple Health)
- [ ] Export/Import functionality
- [ ] Advanced reporting

### Phase 4
- [ ] Marketplace for templates
- [ ] Community features
- [ ] Teams and group habits
- [ ] Advanced permissions
- [ ] API for third-party integrations

## Development

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Deploy to Vercel

\`\`\`bash
vercel deploy
\`\`\`

## License

MIT License - feel free to use this for your projects!

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact support.
