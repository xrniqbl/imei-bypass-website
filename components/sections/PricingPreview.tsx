import Link from "next/link";
import { formatRupiahShort } from "@/lib/utils";
import { PRICING_GROUP_1, PRICING_GROUP_2 } from "@/lib/pricing-data";
import { ArrowRight, Flame } from "lucide-react";

// Show only a subset for preview
const PREVIEW_1 = PRICING_GROUP_1.slice(0, 4);
const PREVIEW_2 = PRICING_GROUP_2.slice(0, 4);

export default function PricingPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Harga Transparan</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Harga Bypass IMEI
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Harga berbeda berdasarkan model iPhone. Tidak ada biaya tersembunyi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Group 1: iPhone 6 - X */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">iPhone 6 – X</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Harga mulai Rp 50.000</p>
            </div>
            <div className="divide-y divide-border">
              {PREVIEW_1.map((item) => (
                <div key={item.model} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">{item.model}</span>
                    {item.isPopular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                        <Flame className="h-3 w-3" />
                        Populer
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {formatRupiahShort(item.priceMin)} – {formatRupiahShort(item.priceMax)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: iPhone XS - 17 Pro */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-4 bg-blue-50 dark:bg-blue-900/20 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">iPhone XS – 17 Pro</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Harga mulai Rp 300.000</p>
            </div>
            <div className="divide-y divide-border">
              {PREVIEW_2.map((item) => (
                <div key={item.model} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">{item.model}</span>
                    {item.isPopular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                        <Flame className="h-3 w-3" />
                        Populer
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {formatRupiahShort(item.priceMin)} – {formatRupiahShort(item.priceMax)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/harga"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Lihat semua harga lengkap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
