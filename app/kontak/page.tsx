import type { Metadata } from "next";
import { MessageCircle, Mail, Clock, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi iUnlock.id via WhatsApp atau email. Layanan senin–sabtu 08.00–21.00 WIB.",
};

const WA_ADMIN = process.env.NEXT_PUBLIC_WA_ADMIN ?? "6281234567890";

export default function KontakPage() {
  return (
    <div>
      <div className="bg-slate-950 text-white py-14">
        <div className="container text-center">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-2">Hubungi Kami</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Kontak & Bantuan</h1>
          <p className="mt-3 text-white/70 text-sm max-w-md mx-auto">
            Punya pertanyaan? Kami siap membantu via WhatsApp atau email.
          </p>
        </div>
      </div>

      <div className="container py-14 max-w-3xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* WhatsApp */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/10 mb-4">
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
            </div>
            <h3 className="font-semibold text-foreground">WhatsApp Admin</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4 flex-1">
              Cara tercepat untuk mendapatkan bantuan. Admin aktif senin–sabtu 08.00–21.00 WIB.
            </p>
            <a
              href={`https://wa.me/${WA_ADMIN}?text=Halo%20iUnlock.id%2C%20saya%20butuh%20bantuan`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#25D366]/90"
            >
              <MessageCircle className="h-4 w-4" />
              Chat di WhatsApp
            </a>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-4">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Email</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4 flex-1">
              Untuk pertanyaan non-urgent atau komplain. Respons dalam 1×24 jam kerja.
            </p>
            <a
              href="mailto:admin@iunlock.id"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              <Mail className="h-4 w-4" />
              admin@iunlock.id
            </a>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6">
          <h3 className="font-semibold text-foreground mb-5">Informasi Layanan</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Jam Operasional</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Senin – Sabtu<br />08.00 – 21.00 WIB
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Respons Waktu</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  WhatsApp: &lt; 30 menit<br />Email: &lt; 24 jam
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Wilayah Layanan</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Seluruh Indonesia<br />(Online, tidak perlu kirim HP)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8">
          <p className="text-sm font-medium text-foreground mb-3">Pertanyaan Umum</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/harga", label: "Cek Harga Layanan" },
              { href: "/pesan", label: "Pesan Sekarang" },
              { href: "/cek-order", label: "Cek Status Order" },
              { href: "/#faq", label: "Lihat FAQ Lengkap" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm text-foreground hover:bg-muted transition-all group"
              >
                {link.label}
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
