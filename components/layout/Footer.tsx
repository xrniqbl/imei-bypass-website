import Link from "next/link";
import { Shield, MessageCircle, Mail, Clock } from "lucide-react";

const WA_ADMIN = process.env.NEXT_PUBLIC_WA_ADMIN ?? "6281234567890";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-foreground mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-3.5 w-3.5 text-white" />
              </div>
              <span>
                i<span className="text-primary">Unlock</span>.id
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Jasa bypass & unblock IMEI iPhone terpercaya. Cepat, aman, dan bergaransi.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Layanan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/layanan#bypass" className="hover:text-foreground transition-colors">Bypass IMEI</Link></li>
              <li><Link href="/layanan#unblock" className="hover:text-foreground transition-colors">Unblock IMEI</Link></li>
              <li><Link href="/harga" className="hover:text-foreground transition-colors">Cek Harga</Link></li>
              <li><Link href="/pesan" className="hover:text-foreground transition-colors">Pesan Sekarang</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Informasi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cek-order" className="hover:text-foreground transition-colors">Cek Status Order</Link></li>
              <li><Link href="/kontak" className="hover:text-foreground transition-colors">Kontak Kami</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`https://wa.me/${WA_ADMIN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  WhatsApp Admin
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@iunlock.id"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  admin@iunlock.id
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Senin – Sabtu, 08.00 – 21.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} iUnlock.id — Semua hak dilindungi.</p>
          <p>Layanan ini bersifat teknis dan tidak berafiliasi dengan Apple Inc.</p>
        </div>
      </div>
    </footer>
  );
}
