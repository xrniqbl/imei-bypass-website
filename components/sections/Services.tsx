import Link from 'next/link';
import { ArrowRight, Zap, Unlock, Check, Clock, Shield } from 'lucide-react';

const SERVICES = [
  {
    icon: Zap,
    id: 'bypass',
    title: 'Bypass IMEI',
    tag: 'iCloud Lock',
    description: 'Bypass activation lock iPhone yang terkunci. Bisa digunakan kembali tanpa Apple ID pemilik lama.',
    features: ['Bypass iCloud Activation Lock', 'Akses semua fitur dasar iPhone', 'Cocok untuk iPhone bekas terkunci', 'Proses 1-24 jam'],
    price: 'Mulai Rp 50.000',
    href: '/layanan#bypass',
    gradient: 'from-blue-600 to-blue-500',
    glow: 'shadow-blue-500/20',
    border: 'border-blue-500/20',
  },
  {
    icon: Unlock,
    id: 'unblock',
    title: 'Unblock IMEI',
    tag: 'Blokir Operator',
    description: 'Buka blokir IMEI dari database operator atau status hilang/dicuri. Kartu SIM aktif kembali.',
    features: ['Unblock IMEI dari operator', 'Hapus status lost/stolen', 'Aktifkan koneksi seluler', 'Proses lebih cepat'],
    price: 'Mulai Rp 45.000',
    href: '/layanan#unblock',
    gradient: 'from-violet-600 to-violet-500',
    glow: 'shadow-violet-500/20',
    border: 'border-violet-500/20',
  },
];

export default function Services() {
  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            2 Solusi untuk iPhone Bermasalah
          </h2>
          <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
            Tidak yakin harus pilih yang mana? Konsultasi gratis via WhatsApp.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className={`group relative flex flex-col rounded-3xl border ${s.border} bg-card p-6 shadow-xl ${s.glow} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.description}</p>

                <ul className="mt-4 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">{s.price}</span>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                  >
                    Selengkapnya <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { icon: Clock, text: 'Proses 1-24 Jam' },
            { icon: Shield, text: 'Bergaransi 100%' },
            { icon: Zap, text: 'Tanpa Kirim HP' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
