import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

const WA_ADMIN = process.env.NEXT_PUBLIC_WA_ADMIN ?? "6281234567890";

export default function CTASection() {
  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="container text-center">
        <h2 className="text-3xl font-bold sm:text-4xl text-balance">
          Siap Unlock iPhone Anda?
        </h2>
        <p className="mt-4 text-white/70 max-w-md mx-auto">
          Pesan sekarang dan tim kami siap memproses dalam hitungan jam.
          Konsultasi gratis via WhatsApp.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pesan"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Pesan Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`https://wa.me/${WA_ADMIN}?text=Halo%20iUnlock.id%2C%20saya%20mau%20konsultasi%20gratis`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
          >
            <MessageCircle className="h-4 w-4" />
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  );
}
