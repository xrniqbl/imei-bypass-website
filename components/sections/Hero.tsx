import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star, Lock, Unlock, Shield, Zap } from 'lucide-react';

const WA_ADMIN = "placeholder" ?? '6281234567890';

function IPhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-glow-pulse" />

      {/* Floating badge top */}
      <div className="absolute -top-4 -right-2 z-20 animate-float-delayed">
        <div className="glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-xs font-semibold whitespace-nowrap">Selesai dalam 2 jam</span>
        </div>
      </div>

      {/* Floating badge bottom */}
      <div className="absolute -bottom-2 -left-4 z-20 animate-float">
        <div className="glass rounded-2xl px-3 py-2.5 flex items-center gap-2 shadow-xl">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">iPhone Unlocked!</p>
            <p className="text-white/50 text-[10px]">iCloud bypass berhasil</p>
          </div>
        </div>
      </div>

      {/* iPhone frame */}
      <div className="relative w-52 h-[420px] sm:w-60 sm:h-[480px] rounded-[3rem] border-[7px] border-slate-700/80 bg-slate-950 shadow-2xl shadow-blue-900/40">
        {/* Dynamic island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-950 rounded-full z-10 border border-slate-800" />

        {/* Screen */}
        <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center px-5">
          {/* Lock icon area */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-800/80 border border-slate-700/50">
              <Lock className="h-8 w-8 text-slate-400" />
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">!</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white text-sm font-semibold">iPhone Terkunci</p>
              <p className="text-slate-400 text-xs mt-0.5">iCloud Activation Lock</p>
            </div>

            <div className="w-full mt-2 space-y-2">
              <div className="w-full rounded-xl bg-blue-600 py-2.5 text-center">
                <p className="text-white text-xs font-semibold">Bypass dengan iUnlock.id</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="flex -space-x-1">
                  {['B','R','D'].map((l) => (
                    <div key={l} className="h-5 w-5 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center">
                      <span className="text-[8px] text-slate-300 font-bold">{l}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-[10px]">+5.000 pelanggan puas</p>
              </div>
            </div>
          </div>

          {/* Signal bars decoration */}
          <div className="absolute top-10 right-5 flex items-end gap-0.5">
            {[3,5,7,9].map((h) => (
              <div key={h} className="w-1 rounded-sm bg-slate-600" style={{ height: h }} />
            ))}
          </div>
          <div className="absolute top-10 left-5">
            <span className="text-slate-500 text-[10px] font-medium">9:41</span>
          </div>
        </div>

        {/* Home bar */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-600 rounded-full" />
      </div>

      {/* Floating rating badge */}
      <div className="absolute top-1/3 -right-6 z-20">
        <div className="glass rounded-xl px-2.5 py-2 shadow-xl">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-white text-[10px] font-medium mt-0.5">4.9 / 5.0</p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#060d1f] text-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] animate-glow-pulse delay-300" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px]" />

      <div className="container relative py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-blue-300 mb-6">
              <Shield className="h-3.5 w-3.5" />
              Jasa IMEI iPhone #1 di Indonesia
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-balance">
              iPhone Kena{' '}
              <span className="text-shimmer">Lock?</span>
              <br />
              Kami{' '}
              <span className="relative">
                Atasin.
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="animate-fade-in-up delay-200 mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Bypass & unblock IMEI iPhone profesional.
              iPhone 6 hingga 17 Pro. Proses online, tidak perlu kirim HP,
              hasil bergaransi.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-300 mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/pesan"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 hover:scale-105 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Zap className="h-4 w-4" />
                Pesan Sekarang
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`https://wa.me/${WA_ADMIN}?text=Halo%20iUnlock.id%2C%20saya%20mau%20tanya%20tentang%20layanan%20bypass%20IMEI`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl glass border-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:scale-105"
              >
                Konsultasi Gratis
              </a>
            </div>

            {/* Trust points */}
            <div className="animate-fade-in-up delay-400 mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-5">
              {[
                'Lebih dari 5.000 pesanan selesai',
                'Rating 4.9/5',
                'Garansi uang kembali',
              ].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400" />
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Right: iPhone mockup */}
          <div className="animate-slide-in-right delay-200 flex justify-center lg:justify-end">
            <div className="animate-float">
              <IPhoneMockup />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-3 rounded-2xl overflow-hidden glass border-white/10 divide-x divide-white/10">
          {[
            { value: '5.000+', label: 'Order Selesai' },
            { value: '4.9★', label: 'Rating Pelanggan' },
            { value: '< 24 Jam', label: 'Rata-rata Selesai' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-5 px-4 hover:bg-white/5 transition-colors">
              <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
              <div className="mt-0.5 text-xs text-white/40 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
