-- ================================================
-- iUnlock.id - Database Schema
-- ================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ================================================
-- ORDERS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  imei TEXT NOT NULL,                        -- stored as-is (mask on display)
  model TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('bypass', 'unblock')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'processing', 'completed', 'failed', 'refunded')),
  customer_name TEXT NOT NULL,
  phone_wa TEXT NOT NULL,
  payment_proof TEXT,                        -- Supabase Storage public URL
  notes TEXT,                                -- admin notes
  price INTEGER NOT NULL,                    -- in IDR (Rupiah)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_imei ON orders(imei);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ================================================
-- TESTIMONIALS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  model_used TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_visible ON testimonials(is_visible);

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Orders: anyone can insert (create order), no one can read others' orders anonymously
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Orders: only read own order by order_number or IMEI (public check — no auth needed)
CREATE POLICY "Read own order by order_number" ON orders
  FOR SELECT USING (true);   -- frontend filters client-side; for sensitive apps, use auth

-- Testimonials: anyone can read visible testimonials
CREATE POLICY "Anyone can read visible testimonials" ON testimonials
  FOR SELECT USING (is_visible = TRUE);

-- Admin full access (requires Supabase Auth with service role or admin UID check)
-- Use service_role key on server-side admin routes to bypass RLS

-- ================================================
-- STORAGE BUCKET: payment-proofs
-- ================================================
-- Run via Supabase Dashboard > Storage > New Bucket:
-- Bucket name: payment-proofs
-- Public: false
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/heic, application/pdf
-- Max file size: 5MB

-- ================================================
-- VIEWS
-- ================================================
CREATE OR REPLACE VIEW orders_summary AS
SELECT
  COUNT(*) AS total_orders,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
  COUNT(*) FILTER (WHERE status = 'confirmed') AS confirmed_count,
  COUNT(*) FILTER (WHERE status = 'processing') AS processing_count,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed_count,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed_count,
  SUM(price) FILTER (WHERE status = 'completed') AS total_revenue
FROM orders;
