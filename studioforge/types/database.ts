export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      app_projects: {
        Row: {
          ai_spec: Json;
          created_at: string;
          id: string;
          name: string;
          prompt: string;
          status: "draft" | "processing" | "ready" | "failed";
          updated_at: string;
          user_id: string;
        };
        Insert: {
          ai_spec?: Json;
          created_at?: string;
          id?: string;
          name: string;
          prompt: string;
          status?: "draft" | "processing" | "ready" | "failed";
          updated_at?: string;
          user_id: string;
        };
        Update: {
          ai_spec?: Json;
          created_at?: string;
          id?: string;
          name?: string;
          prompt?: string;
          status?: "draft" | "processing" | "ready" | "failed";
          updated_at?: string;
          user_id?: string;
        };
      };
      bookings: {
        Row: {
          app_id: string;
          created_at: string;
          customer_id: string;
          ends_at: string;
          id: string;
          notes: string | null;
          price_cents: number;
          service_name: string;
          starts_at: string;
          status: "confirmed" | "completed" | "cancelled" | "pending";
          stylist_name: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          app_id: string;
          created_at?: string;
          customer_id: string;
          ends_at: string;
          id?: string;
          notes?: string | null;
          price_cents: number;
          service_name: string;
          starts_at: string;
          status?: "confirmed" | "completed" | "cancelled" | "pending";
          stylist_name?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          app_id?: string;
          created_at?: string;
          customer_id?: string;
          ends_at?: string;
          id?: string;
          notes?: string | null;
          price_cents?: number;
          service_name?: string;
          starts_at?: string;
          status?: "confirmed" | "completed" | "cancelled" | "pending";
          stylist_name?: string | null;
          updated_at?: string;
          user_id?: string;
        };
      };
      customers: {
        Row: {
          app_id: string;
          created_at: string;
          email: string | null;
          full_name: string;
          id: string;
          notes: string | null;
          phone: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          app_id: string;
          created_at?: string;
          email?: string | null;
          full_name: string;
          id?: string;
          notes?: string | null;
          phone?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          app_id?: string;
          created_at?: string;
          email?: string | null;
          full_name?: string;
          id?: string;
          notes?: string | null;
          phone?: string | null;
          updated_at?: string;
          user_id?: string;
        };
      };
      invoices: {
        Row: {
          amount_cents: number;
          app_id: string;
          booking_id: string | null;
          created_at: string;
          currency: string;
          customer_id: string | null;
          due_date: string | null;
          id: string;
          invoice_number: string;
          paid_at: string | null;
          status: "draft" | "sent" | "paid" | "overdue";
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount_cents: number;
          app_id: string;
          booking_id?: string | null;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          due_date?: string | null;
          id?: string;
          invoice_number: string;
          paid_at?: string | null;
          status?: "draft" | "sent" | "paid" | "overdue";
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount_cents?: number;
          app_id?: string;
          booking_id?: string | null;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          due_date?: string | null;
          id?: string;
          invoice_number?: string;
          paid_at?: string | null;
          status?: "draft" | "sent" | "paid" | "overdue";
          updated_at?: string;
          user_id?: string;
        };
      };
      profiles: {
        Row: {
          company_name: string | null;
          created_at: string;
          full_name: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          company_name?: string | null;
          created_at?: string;
          full_name?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          company_name?: string | null;
          created_at?: string;
          full_name?: string | null;
          updated_at?: string;
          user_id?: string;
        };
      };
    };
  };
};

export type AppProject = Database["public"]["Tables"]["app_projects"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
