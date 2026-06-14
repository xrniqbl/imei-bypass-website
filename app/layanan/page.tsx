import Link from "next/link";
import {
  Zap,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Detail layanan bypass IMEI dan unblock IMEI iPhone. Perbedaan, keuntungan, estimasi waktu, dan garansi.",
};

const BYPASS_FEATURES = [
  { ok: true, text: "Bypass iCloud Activation Lock (MDM & iCloud)" },
  { ok: true, text: "HP bisa digunakan kembali tanpa Apple ID lama" },
  { ok: true, text: "Akses kamera, foto, browser, dan aplikasi" },
  { ok: true, text: "Berlaku permanen, tidak hilang setelah reset" },
  { ok: false, text: "Tidak restore akun iCloud lama (berbeda dengan unlock)" },
  { ok: false, text: "Beberapa fitur seperti FaceTime mungkin terbatas" },
];

const UNBLOCK_FEATURES = [
  { ok: true, text: "Menghapus status blokir di database operator" },
  { ok: true, text: "Kartu SIM aktif kembali (telepon & data)" },
  { ok: true, text: "Hapus status hilang/dicuri (lost/stolen)" },
  { ok: true, text: "Berlaku untuk semua operator Indonesia & internasional" },
  { ok: false, text: "Tidak bypass iCloud Activation Lock (berbeda layanan)" },
];

export default function LayananPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-slate-950 text-white py-14">
        <div className="container text-center">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-2">Layanan Kami</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Bypass vs Unblock IMEI</h1>
          <p className="mt-3 text-white/70 max-w-md mx-auto text-sm">
            Pahami perbedaan dua layanan kami agar Anda bisa memilih yang tepat.
          </p>
        </div>
      </div>

      <div className="container py-14">
        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Bypass */}
          <div id="bypass" className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="bg-blue-600 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Bypass IMEI</h2>
                  <p className="text-blue-100 text-sm">iCloud Activation Lock</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Bypass digunakan ketika iPhone Anda terkunci di layar aktivasi iCloud dan
                Anda tidak memiliki akses ke Apple ID pemilik sebelumnya. Setelah bypass,
                HP bisa digunakan kembali secara normal.
              </p>

              <div className="space-y-2.5 mb-6">
                {BYPASS_FEATURES.map((f) => (
                  <div key={f.text} className="flex items-start gap-2.5">
                    {f.ok ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${f.ok ? "text-foreground" : "text-muted-foreground"}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>1 – 24 jam</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Bergaransi</span>
                </div>
              </div>

              <Link
                href="/pesan?service=bypass"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500"
              >
                Pesan Bypass
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Unblock */}
          <div id="unblock" className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="bg-violet-600 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Unlock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Unblock IMEI</h2>
                  <p className="text-violet-100 text-sm">Buka Blokir Operator</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Unblock digunakan ketika kartu SIM Anda tidak bisa aktif di iPhone karena
                IMEI terblokir di database operator atau terdeteksi sebagai perangkat
                hilang/dicuri. Setelah unblock, sinyal operator kembali normal.
              </p>

              <div className="space-y-2.5 mb-6">
                {UNBLOCK_FEATURES.map((f) => (
                  <div key={f.text} className="flex items-start gap-2.5">
                    {f.ok ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${f.ok ? "text-foreground" : "text-muted-foreground"}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>30 menit – 4 jam</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Bergaransi</span>
                </div>
              </div>

              <Link
                href="/pesan?service=unblock"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-500"
              >
                Pesan Unblock
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-14 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-center text-foreground mb-6">Perbandingan Singkat</h3>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Aspek</th>
                  <th className="text-center px-5 py-3 font-medium text-blue-600">Bypass</th>
                  <th className="text-center px-5 py-3 font-medium text-violet-600">Unblock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { label: "Masalah", bypass: "iCloud Lock", unblock: "Blokir Operator" },
                  { label: "HP Perlu Dikirim", bypass: "Tidak", unblock: "Tidak" },
                  { label: "Estimasi Waktu", bypass: "1-24 jam", unblock: "30 mnt - 4 jam" },
                  { label: "Mulai Harga", bypass: "Rp 50.000", unblock: "Rp 45.000" },
                  { label: "Garansi", bypass: "Ya", unblock: "Ya" },
                  { label: "Berlaku Permanen", bypass: "Ya", unblock: "Ya" },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-muted/20">
                    <td className="px-5 py-3 text-foreground font-medium">{row.label}</td>
                    <td className="px-5 py-3 text-center text-muted-foreground">{row.bypass}</td>
                    <td className="px-5 py-3 text-center text-muted-foreground">{row.unblock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 max-w-2xl mx-auto rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>
              Layanan ini ditujukan untuk pemilik sah perangkat. Kami tidak bertanggung jawab atas
              penyalahgunaan layanan. Dengan memesan, Anda menyatakan memiliki hak atas
              perangkat yang didaftarkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
