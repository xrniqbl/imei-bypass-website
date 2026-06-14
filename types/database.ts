export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          order_number: string;
          imei: string;
          model: string;
          service_type: "bypass" | "unblock";
          status:
            | "pending"
            | "confirmed"
            | "processing"
            | "completed"
            | "failed"
            | "refunded";
          customer_name: string;
          phone_wa: string;
          payment_proof: string | null;
          notes: string | null;
          price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          imei: string;
          model: string;
          service_type: "bypass" | "unblock";
          status?:
            | "pending"
            | "confirmed"
            | "processing"
            | "completed"
            | "failed"
            | "refunded";
          customer_name: string;
          phone_wa: string;
          payment_proof?: string | null;
          notes?: string | null;
          price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?:
            | "pending"
            | "confirmed"
            | "processing"
            | "completed"
            | "failed"
            | "refunded";
          notes?: string | null;
          payment_proof?: string | null;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          model_used: string;
          content: string;
          rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          model_used: string;
          content: string;
          rating: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          model_used?: string;
          content?: string;
          rating?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
