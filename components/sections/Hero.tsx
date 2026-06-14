import Link from "next/link";
import { Shield, CheckCircle2, ArrowRight, Star } from "lucide-react";

const WA_ADMIN = process.env.NEXT_PUBLIC_WA_ADMIN ?? "6281234567890";

const TRUST_POINTS = [
  "Lebih dari 5.000 pesanan selesai",
  "Rating 4.9/5 dari pelanggan",
  "Garansi uang kembali",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgb(255,255,255) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Blue glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur mb-6">
            <Shield className="h-3.5 w-3.5 text-blue-400" />
            Jasa Bypass & Unblock IMEI iPhone Terpercaya
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-tight">
            iPhone Kena Lock?{" "}
            <span className="text-blue-400">Kami Atasin.</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
            Bypass & unblock IMEI iPhone profesional. Dari iPhone 6 hingga iPhone 17 Pro.
            Proses transparan, harga jelas, hasil bergaransi.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pesan"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Pesan Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${WA_ADMIN}?text=Halo%20iUnlock.id%2C%20saya%20mau%20tanya%20tentang%20layanan%20bypass%20IMEI`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Tanya via WhatsApp
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400" />
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-16 max-w-2xl grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/10">
          {[
            { value: "5.000+", label: "Order Selesai" },
            { value: "4.9/5", label: "Rating Pelanggan", icon: Star },
            { value: "< 24 jam", label: "Rata-rata Selesai" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-5 px-4 bg-white/5 backdrop-blur"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="mt-0.5 text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
