import { Star } from "lucide-react";

// Static fallback testimonials (also in DB seed)
const TESTIMONIALS = [
  {
    name: "Budi S.",
    model: "iPhone X",
    content: "Prosesnya cepat banget, kurang dari 3 jam langsung selesai. HP saya yang tadinya kena iCloud lock sekarang udah bisa dipake normal. Recommended!",
    rating: 5,
  },
  {
    name: "Rini A.",
    model: "iPhone 11 Pro",
    content: "Awalnya ragu-ragu tapi ternyata legit. CS-nya responsif, ngejelasin prosesnya dengan detail. iPhone 11 Pro saya udah unlocked sekarang.",
    rating: 5,
  },
  {
    name: "Dimas P.",
    model: "iPhone 13",
    content: "Beli iPhone 13 second ternyata kena iCloud activation lock. Hubungi iUnlock, 6 jam kemudian sudah beres. Harganya juga sesuai budget.",
    rating: 5,
  },
  {
    name: "Sinta W.",
    model: "iPhone 8",
    content: "Pelayanan profesional. Saya kirim IMEI, konfirmasi bayar via WA, 2 jam kemudian notif sudah selesai. Sangat memuaskan!",
    rating: 5,
  },
  {
    name: "Arif K.",
    model: "iPhone 12 Pro Max",
    content: "Sudah coba jasa lain sebelumnya tapi gagal. iUnlock berhasil bypass dalam 8 jam. Worth it banget untuk iPhone pro.",
    rating: 4,
  },
  {
    name: "Yoga H.",
    model: "iPhone 14",
    content: "Prosesnya transparan, bisa tracking status order kapan saja. Admin WA juga fast respon. Puas dengan hasilnya.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Testimoni</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pelanggan Kami Bicara
          </h2>
          <p className="mt-3 text-muted-foreground">
            5.000+ pesanan selesai. Rata-rata rating 4.9 dari 5.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-background p-5 shadow-sm"
            >
              <StarRating rating={t.rating} />
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                &quot;{t.content}&quot;
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.model}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
