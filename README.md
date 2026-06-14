# iUnlock.id — Website Jasa Bypass & Unblock IMEI iPhone

Website jasa bypass & unblock IMEI iPhone profesional, dibangun dengan Next.js 15, Supabase, dan shadcn/ui.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Storage)
- **UI**: shadcn/ui + Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Fitur

- Landing page lengkap (Hero, Layanan, Cara Kerja, Harga Preview, Testimoni, FAQ, CTA)
- Halaman harga lengkap dengan toggle bypass/unblock
- Halaman layanan dengan perbandingan bypass vs unblock
- Form pesanan multi-step (4 langkah)
- Upload bukti pembayaran ke Supabase Storage
- Tracking status order (by nomor order atau IMEI)
- Admin panel dengan auth Supabase
- WhatsApp float button
- Mobile-first, responsive

## Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd imei-bypass-website
npm install
```

### 2. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Masuk ke **SQL Editor**, jalankan file `supabase/schema.sql`
3. Lalu jalankan `supabase/seed.sql` untuk data awal
4. Buat Storage bucket bernama `payment-proofs` (non-public)

### 3. Setup shadcn/ui

```bash
npx shadcn@latest init
npx shadcn@latest add button card badge table input select accordion dialog toast progress
```

### 4. Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi semua nilai:

```bash
cp .env.local.example .env.local
```

| Variable | Keterangan |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase Anda |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key dari Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (untuk admin) |
| `NEXT_PUBLIC_WA_ADMIN` | Nomor WA admin (format: 62xxx, tanpa +) |
| `NEXT_PUBLIC_BANK_NAME` | Nama bank untuk pembayaran |
| `NEXT_PUBLIC_BANK_NUMBER` | Nomor rekening bank |
| `NEXT_PUBLIC_BANK_HOLDER` | Nama pemilik rekening |
| `NEXT_PUBLIC_SITE_NAME` | Nama website |
| `NEXT_PUBLIC_SITE_URL` | URL website (untuk SEO) |

### 5. Setup Admin Account

1. Di Supabase Dashboard → Authentication → Users
2. Klik "Invite User" atau "Add User" 
3. Masukkan email admin
4. Gunakan email + password tersebut untuk login di `/admin/login`

### 6. Run Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Struktur File

```
├── app/
│   ├── layout.tsx          # Root layout (Navbar, Footer, WA Button)
│   ├── page.tsx            # Landing page
│   ├── harga/page.tsx      # Halaman harga
│   ├── layanan/page.tsx    # Halaman layanan
│   ├── pesan/page.tsx      # Form pesanan multi-step
│   ├── cek-order/page.tsx  # Tracking order
│   ├── kontak/page.tsx     # Halaman kontak
│   └── admin/
│       ├── layout.tsx      # Auth guard
│       ├── page.tsx        # Admin dashboard
│       └── login/page.tsx  # Admin login
├── components/
│   ├── layout/             # Navbar, Footer, WhatsAppButton
│   └── sections/           # Hero, Services, HowItWorks, dll
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── utils.ts            # Helper functions
│   └── pricing-data.ts     # Data harga lengkap
├── types/
│   ├── index.ts            # TypeScript types
│   └── database.ts         # Supabase DB types
└── supabase/
    ├── schema.sql          # SQL schema + RLS policies
    └── seed.sql            # Data awal (testimoni + contoh order)
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables di Vercel Dashboard → Settings → Environment Variables.

### Other

```bash
npm run build
npm start
```

## Kustomisasi

- **Harga**: Edit `lib/pricing-data.ts`
- **Nomor WA & Bank**: Edit `.env.local`
- **Warna/Theme**: Edit `app/globals.css` (CSS variables)
- **Konten FAQ**: Edit `components/sections/FAQSection.tsx`
- **Testimoni**: Edit `components/sections/Testimonials.tsx` atau tambah via `supabase/seed.sql`
- **Nama Brand**: Ganti `iUnlock.id` → nama Anda di `app/layout.tsx` dan `.env.local`

## Catatan Keamanan

- IMEI disimpan as-is tapi di-mask saat ditampilkan ke customer
- RLS Supabase aktif — anon user hanya bisa INSERT order, tidak bisa read semua order
- Admin panel menggunakan Supabase Auth (email/password)
- Service role key hanya digunakan server-side (tidak exposed ke client)
