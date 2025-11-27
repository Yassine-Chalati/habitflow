export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          subscription_plan: "free" | "pro" | "team"
          subscription_status: "active" | "cancelled" | "expired"
          theme: "light" | "dark" | "auto"
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          subscription_plan?: "free" | "pro" | "team"
          subscription_status?: "active" | "cancelled" | "expired"
          theme?: "light" | "dark" | "auto"
          language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          subscription_plan?: "free" | "pro" | "team"
          subscription_status?: "active" | "cancelled" | "expired"
          theme?: "light" | "dark" | "auto"
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          category: string
          frequency: "daily" | "weekly" | "monthly"
          frequency_days: number[] | null
          start_date: string
          end_date: string | null
          color: string
          icon: string
          priority: "Low" | "Medium" | "High"
          current_streak: number
          longest_streak: number
          success_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          category?: string
          frequency?: "daily" | "weekly" | "monthly"
          frequency_days?: number[] | null
          start_date?: string
          end_date?: string | null
          color?: string
          icon?: string
          priority?: "Low" | "Medium" | "High"
          current_streak?: number
          longest_streak?: number
          success_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          category?: string
          frequency?: "daily" | "weekly" | "monthly"
          frequency_days?: number[] | null
          start_date?: string
          end_date?: string | null
          color?: string
          icon?: string
          priority?: "Low" | "Medium" | "High"
          current_streak?: number
          longest_streak?: number
          success_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      habit_logs: {
        Row: {
          id: string
          habit_id: string
          user_id: string
          date: string
          status: "done" | "skipped" | "failed" | "pending"
          note: string | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          habit_id: string
          user_id: string
          date: string
          status?: "done" | "skipped" | "failed" | "pending"
          note?: string | null
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          habit_id?: string
          user_id?: string
          date?: string
          status?: "done" | "skipped" | "failed" | "pending"
          note?: string | null
          completed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}



