import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  { name: 'Budi S.', model: 'iPhone X', content: 'Prosesnya cepat banget, kurang dari 3 jam langsung selesai. HP saya yang tadinya kena iCloud lock sekarang udah bisa dipake normal!', rating: 5 },
  { name: 'Rini A.', model: 'iPhone 11 Pro', content: 'CS-nya responsif banget, njelasin prosesnya detail. iPhone 11 Pro saya udah unlocked. Recommended!', rating: 5 },
  { name: 'Dimas P.', model: 'iPhone 13', content: 'Beli iPhone 13 second kena activation lock. Hubungi iUnlock, 6 jam kemudian sudah beres. Harganya juga reasonable.', rating: 5 },
  { name: 'Sinta W.', model: 'iPhone 8', content: 'Kirim IMEI, konfirmasi bayar via WA, 2 jam notif sudah selesai. Pelayanan sangat profesional!', rating: 5 },
  { name: 'Arif K.', model: 'iPhone 12 Pro Max', content: 'Sudah coba jasa lain tapi gagal. iUnlock berhasil bypass dalam 8 jam. Worth it banget!', rating: 4 },
  { name: 'Yoga H.', model: 'iPhone 14', content: 'Proses transparan, bisa tracking status kapan saja. Admin WA fast respon. Puas!', rating: 5 },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= n ? 'fill-amber-400 text-amber-400' : 'text-muted/40 fill-muted/20'}`} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">Pelanggan Kami Bicara</h2>
          <p className="mt-3 text-muted-foreground">5.000+ pesanan selesai. Rata-rata rating 4.9 dari 5.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className={`group relative flex flex-col rounded-3xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20`}
            >
              <Quote className="h-7 w-7 text-primary/20 mb-3" />
              <Stars n={r.rating} />
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">&ldquo;{r.content}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-sm font-bold text-white shadow-sm flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.model}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
