"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Apa perbedaan bypass dan unblock IMEI?",
    a: "Bypass IMEI adalah proses melewati iCloud Activation Lock — HP bisa digunakan tanpa Apple ID pemilik sebelumnya. Unblock IMEI adalah menghapus status blokir pada database IMEI operator/pemerintah, sehingga kartu SIM bisa aktif kembali. Keduanya adalah layanan terpisah.",
  },
  {
    q: "Apakah iPhone saya harus dikirim?",
    a: "Tidak. Semua proses dilakukan secara online hanya dengan nomor IMEI iPhone Anda. Anda tidak perlu mengirimkan fisik HP.",
  },
  {
    q: "Bagaimana cara menemukan nomor IMEI iPhone?",
    a: "IMEI bisa ditemukan dengan menekan *#06# di dialer, atau melihat di Settings > General > About. IMEI juga tertera di box iPhone atau di belakang perangkat (model lama).",
  },
  {
    q: "Berapa lama proses bypass/unblock?",
    a: "Tergantung model iPhone. iPhone 6-X biasanya 1-4 jam. iPhone XS ke atas bisa 4-24 jam. iPhone 16/17 series bisa 1-2 hari. Kami akan memberitahu estimasi setelah pesanan dikonfirmasi.",
  },
  {
    q: "Apakah ada garansi jika gagal?",
    a: "Ya. Kami memberikan garansi uang kembali penuh jika proses gagal. Kami hanya memproses IMEI yang kami yakin bisa berhasil.",
  },
  {
    q: "Metode pembayaran apa yang diterima?",
    a: "Saat ini kami menerima transfer bank (BCA, Mandiri, BNI, BRI). Setelah transfer, upload bukti transfer di form pesanan, dan admin akan mengkonfirmasi via WhatsApp.",
  },
  {
    q: "Apakah layanan ini legal?",
    a: "Layanan ini bersifat teknis dan ditujukan untuk pemilik sah perangkat. Kami tidak bertanggung jawab atas penyalahgunaan layanan. Pastikan Anda memiliki hak atas perangkat sebelum memesan.",
  },
  {
    q: "Bagaimana cara mengecek status pesanan?",
    a: "Buka halaman 'Cek Order' di website ini, masukkan nomor order atau IMEI Anda. Status akan ditampilkan beserta timeline proses. Anda juga akan menerima notifikasi via WhatsApp.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 border-t border-border bg-muted/20">
          <p className="text-sm text-muted-foreground leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Pertanyaan Umum
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
