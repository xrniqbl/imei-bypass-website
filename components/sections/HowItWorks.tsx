import { ClipboardList, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Isi Form Pesanan",
    description:
      "Pilih layanan & model iPhone, masukkan nomor IMEI, dan data diri Anda. Form mudah, selesai dalam 2 menit.",
  },
  {
    step: 2,
    icon: CreditCard,
    title: "Bayar & Kirim Bukti",
    description:
      "Transfer ke rekening kami, lalu upload foto bukti transfer di halaman yang sama. Admin konfirmasi via WA.",
  },
  {
    step: 3,
    icon: CheckCircle,
    title: "Proses & Selesai",
    description:
      "Tim kami memproses pesanan Anda. Status bisa dipantau real-time. Notifikasi WA dikirim saat selesai.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Cara Kerja</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            3 Langkah Mudah
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Tidak ribet. Tidak perlu kirim HP. Semua dilakukan secara online.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 hidden md:block w-2/3 h-px bg-border" />

          <div className="grid gap-8 md:grid-cols-3 relative">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-background border border-border shadow-sm z-10">
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {step.step}
                    </span>
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pesan"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
          >
            Mulai Pesan Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
