import Link from 'next/link';
import { FileText, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';

const STEPS = [
  { n: '01', icon: FileText, title: 'Isi Form Pesanan', desc: 'Pilih layanan & model iPhone, masukkan IMEI dan data diri. Selesai dalam 2 menit.' },
  { n: '02', icon: CreditCard, title: 'Transfer & Upload Bukti', desc: 'Transfer ke rekening kami, upload foto bukti transfer. Admin konfirmasi via WA.' },
  { n: '03', icon: CheckCircle, title: 'Proses & Notifikasi', desc: 'Tim kami memproses pesanan. Tracking real-time. Notifikasi WA saat selesai.' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950/50">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Cara Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">3 Langkah Mudah</h2>
          <p className="mt-3 text-muted-foreground">Tidak ribet. Tidak perlu kirim HP. Semua online.</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line desktop */}
          <div className="absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-gradient-to-r from-transparent via-border to-transparent hidden md:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="flex flex-col items-center text-center group">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-background border-2 border-border shadow-sm z-10 relative transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10">
                      <Icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-black text-white shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[200px]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pesan"
            className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105"
          >
            Mulai Pesan Sekarang
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
