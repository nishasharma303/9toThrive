export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      calendar_events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          event_type: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          event_type?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          event_type?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      company_rounds: {
        Row: {
          company_name: string
          created_at: string | null
          current_stage: string
          id: string
          job_role: string
          stages: Json | null
          students_qualified: Json | null
          total_applicants: number | null
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          current_stage?: string
          id?: string
          job_role: string
          stages?: Json | null
          students_qualified?: Json | null
          total_applicants?: number | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          current_stage?: string
          id?: string
          job_role?: string
          stages?: Json | null
          students_qualified?: Json | null
          total_applicants?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          applicants: number | null
          company: string
          created_at: string | null
          deadline: string | null
          description: string | null
          flagged: boolean | null
          id: string
          location: string | null
          role: string
          salary: string | null
          scheduled_date: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          applicants?: number | null
          company: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          flagged?: boolean | null
          id?: string
          location?: string | null
          role: string
          salary?: string | null
          scheduled_date?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          applicants?: number | null
          company?: string
          created_at?: string | null
          deadline?: string | null
          description?: string | null
          flagged?: boolean | null
          id?: string
          location?: string | null
          role?: string
          salary?: string | null
          scheduled_date?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          status: string
          student_id: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          status?: string
          student_id?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          status?: string
          student_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      placement_officers: {
        Row: {
          assigned_companies: string[] | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_companies?: string[] | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_companies?: string[] | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recruiters: {
        Row: {
          active_postings: number | null
          average_salary: string | null
          company_name: string
          contact_name: string
          created_at: string | null
          domain: string | null
          email: string
          id: string
          job_roles: string[] | null
          phone: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          active_postings?: number | null
          average_salary?: string | null
          company_name: string
          contact_name: string
          created_at?: string | null
          domain?: string | null
          email: string
          id?: string
          job_roles?: string[] | null
          phone?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          active_postings?: number | null
          average_salary?: string | null
          company_name?: string
          contact_name?: string
          created_at?: string | null
          domain?: string | null
          email?: string
          id?: string
          job_roles?: string[] | null
          phone?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          branch: string
          created_at: string | null
          email: string
          id: string
          name: string
          reg_no: string
          skills: string[] | null
          updated_at: string | null
          verification_status: string
        }
        Insert: {
          branch: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          reg_no: string
          skills?: string[] | null
          updated_at?: string | null
          verification_status?: string
        }
        Update: {
          branch?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          reg_no?: string
          skills?: string[] | null
          updated_at?: string | null
          verification_status?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
