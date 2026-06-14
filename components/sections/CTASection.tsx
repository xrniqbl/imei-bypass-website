import Link from 'next/link';
import { ArrowRight, MessageCircle, Zap } from 'lucide-react';

const WA = "placeholder" ?? '6281234567890';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#060d1f] py-20 sm:py-24 text-white">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-[120px]" />

      <div className="container relative text-center">
        <span className="inline-block rounded-full glass px-3 py-1 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-5">
          Siap Mulai?
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-balance leading-tight">
          iPhone Anda Menunggu
          <br />
          <span className="text-shimmer">untuk Dibuka.</span>
        </h2>
        <p className="mt-4 text-white/60 max-w-md mx-auto">
          Pesan sekarang dan tim kami proses dalam hitungan jam. Konsultasi gratis, tanpa komitmen.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pesan"
            className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 hover:scale-105"
          >
            <Zap className="h-4 w-4" />
            Pesan Sekarang
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`https://wa.me/${WA}?text=Halo%20iUnlock.id%2C%20mau%20konsultasi%20gratis`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl glass px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
