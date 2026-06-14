import Link from "next/link";
import { ArrowRight, Zap, Unlock, Clock, Shield } from "lucide-react";

const SERVICES = [
  {
    icon: Zap,
    id: "bypass",
    title: "Bypass IMEI",
    description:
      "Bypass activation lock (iCloud lock) pada iPhone yang terkunci. HP bisa digunakan kembali tanpa perlu Apple ID pemilik sebelumnya.",
    features: [
      "Bypass iCloud Activation Lock",
      "Tetap bisa akses semua fitur dasar",
      "Cocok untuk iPhone bekas yang terkunci",
      "Proses 1-24 jam tergantung model",
    ],
    price: "Mulai Rp 50.000",
    href: "/layanan#bypass",
    accent: "bg-blue-500",
  },
  {
    icon: Unlock,
    id: "unblock",
    title: "Unblock IMEI",
    description:
      "Buka blokir IMEI iPhone yang terblokir oleh operator atau terdaftar sebagai hilang/dicuri di database IMEI nasional.",
    features: [
      "Unblock IMEI dari database operator",
      "Hapus status hilang/dicuri",
      "Aktifkan kembali koneksi seluler",
      "Proses lebih cepat dari bypass",
    ],
    price: "Mulai Rp 45.000",
    href: "/layanan#unblock",
    accent: "bg-violet-500",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Layanan Kami</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            2 Solusi untuk iPhone Bermasalah
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Pilih layanan yang sesuai dengan kondisi iPhone Anda.
            Tidak yakin? Tanya admin WA — gratis konsultasi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${service.accent} mb-4`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <Shield className="h-4 w-4 flex-shrink-0 text-green-500 mt-0.5" />
                      <span className="text-foreground/80">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-semibold text-foreground">
                    {service.price}
                  </span>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Selengkapnya
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {[
            { icon: Clock, text: "Proses 1-24 Jam" },
            { icon: Shield, text: "Bergaransi" },
            { icon: Zap, text: "Responsif 24/7" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-primary" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
