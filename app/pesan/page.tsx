"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  formatRupiah,
  formatRupiahShort,
  generateOrderNumber,
  validateImei,
  buildWhatsAppUrl,
} from "@/lib/utils";
import { getPricing, ALL_MODELS } from "@/lib/pricing-data";
import type { ServiceType, IPhoneModel } from "@/types";
import {
  ChevronRight,
  Check,
  AlertCircle,
  Upload,
  Copy,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const BANK_NAME = process.env.NEXT_PUBLIC_BANK_NAME ?? "BCA";
const BANK_NUMBER = process.env.NEXT_PUBLIC_BANK_NUMBER ?? "1234567890";
const BANK_HOLDER = process.env.NEXT_PUBLIC_BANK_HOLDER ?? "iUnlock.id";
const WA_ADMIN = process.env.NEXT_PUBLIC_WA_ADMIN ?? "6281234567890";

type Step = 1 | 2 | 3 | 4;

function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => {
        const step = (i + 1) as Step;
        const done = current > step;
        const active = current === step;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                done
                  ? "bg-green-500 text-white"
                  : active
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : step}
            </div>
            {i < total - 1 && (
              <div
                className={`h-px w-8 sm:w-12 transition-all ${
                  current > step ? "bg-green-500" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PesanContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  // Form state
  const [serviceType, setServiceType] = useState<ServiceType>(
    (searchParams.get("service") as ServiceType) ?? "bypass"
  );
  const [model, setModel] = useState<IPhoneModel>(
    (searchParams.get("model") as IPhoneModel) ?? ("" as IPhoneModel)
  );
  const [imei, setImei] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneWa, setPhoneWa] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string>("");

  const pricing = model ? getPricing(model, serviceType) : undefined;

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setProofPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateStep1 = () => {
    if (!serviceType) return "Pilih jenis layanan.";
    if (!model) return "Pilih model iPhone Anda.";
    return "";
  };

  const validateStep2 = () => {
    if (!imei.trim()) return "Masukkan nomor IMEI.";
    if (!validateImei(imei.replace(/\s/g, ""))) return "Format IMEI tidak valid. Pastikan 15 digit dan benar.";
    if (!customerName.trim()) return "Masukkan nama lengkap.";
    if (!phoneWa.trim()) return "Masukkan nomor WhatsApp.";
    const waClean = phoneWa.replace(/\D/g, "");
    if (waClean.length < 10) return "Nomor WhatsApp tidak valid.";
    return "";
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      const err = validateStep1();
      if (err) { setError(err); return; }
    }
    if (step === 2) {
      const err = validateStep2();
      if (err) { setError(err); return; }
    }
    setStep((prev) => (prev + 1) as Step);
  };

  const handleSubmitOrder = async () => {
    if (!proofFile) { setError("Upload bukti transfer terlebih dahulu."); return; }
    setLoading(true);
    setError("");
    try {
      const orderNum = generateOrderNumber();
      let proofUrl = "";

      // Upload proof to Supabase Storage
      const ext = proofFile.name.split(".").pop();
      const fileName = `${orderNum}.${ext}`;
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from("payment-proofs")
        .upload(fileName, proofFile, { cacheControl: "3600" });
      if (uploadErr) throw uploadErr;
      const { data: urlData } = supabase.storage
        .from("payment-proofs")
        .getPublicUrl(fileName);
      proofUrl = urlData?.publicUrl ?? "";

      // Create order in DB
      const { error: dbErr } = await supabase.from("orders").insert({
        order_number: orderNum,
        imei: imei.replace(/\s/g, ""),
        model,
        service_type: serviceType,
        status: "pending",
        customer_name: customerName,
        phone_wa: phoneWa.replace(/\D/g, ""),
        payment_proof: proofUrl,
        price: pricing?.priceMin ?? 0,
      });
      if (dbErr) throw dbErr;

      setOrderNumber(orderNum);

      // Notify admin via WA
      const waMsg = `[ORDER BARU]\nNomor Order: ${orderNum}\nLayanan: ${serviceType.toUpperCase()} IMEI\nModel: ${model}\nIMEI: ${imei}\nNama: ${customerName}\nWA: ${phoneWa}\nBukti: ${proofUrl}`;
      window.open(buildWhatsAppUrl(WA_ADMIN, waMsg), "_blank");

      setStep(4);
    } catch (e: unknown) {
      setError("Gagal mengirim pesanan. Coba lagi atau hubungi admin via WA.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const STEP_LABELS = ["Pilih Layanan", "Data Diri", "Pembayaran", "Konfirmasi"];

  return (
    <div>
      <div className="bg-slate-950 text-white py-14">
        <div className="container text-center">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-2">Form Pesanan</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Pesan Layanan</h1>
          <p className="mt-3 text-white/70 text-sm max-w-md mx-auto">
            Isi form di bawah ini untuk memulai proses bypass atau unblock IMEI iPhone Anda.
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-xl">
        <StepIndicator current={step} total={4} />

        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          {STEP_LABELS[step - 1]}
        </p>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Step 1: Pilih Layanan & Model */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Jenis Layanan <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["bypass", "unblock"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setServiceType(s)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all ${
                      serviceType === s
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="text-base">{s === "bypass" ? "⚡" : "🔓"}</span>
                    {s === "bypass" ? "Bypass IMEI" : "Unblock IMEI"}
                    <span className="text-xs text-muted-foreground font-normal">
                      {s === "bypass" ? "iCloud Lock" : "Blokir Operator"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-foreground mb-2">
                Model iPhone <span className="text-red-500">*</span>
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value as IPhoneModel)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">-- Pilih Model iPhone --</option>
                {ALL_MODELS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {pricing && (
              <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm">
                <p className="text-muted-foreground">Estimasi harga untuk {model}:</p>
                <p className="text-lg font-bold text-foreground mt-1">
                  {formatRupiahShort(pricing.priceMin)} – {formatRupiahShort(pricing.priceMax)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimasi waktu: {pricing.estimatedTime}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Data Diri + IMEI */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="imei" className="block text-sm font-medium text-foreground mb-2">
                Nomor IMEI <span className="text-red-500">*</span>
              </label>
              <input
                id="imei"
                type="text"
                inputMode="numeric"
                placeholder="Contoh: 356938035643809"
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                maxLength={15}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Temukan IMEI: dial *#06# atau Settings &rsaquo; General &rsaquo; About
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nama lengkap Anda"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="wa" className="block text-sm font-medium text-foreground mb-2">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="wa"
                type="tel"
                inputMode="tel"
                placeholder="Contoh: 081234567890"
                value={phoneWa}
                onChange={(e) => setPhoneWa(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Notifikasi selesai akan dikirim ke nomor ini.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Pembayaran */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <p className="text-sm font-semibold text-foreground mb-4">Detail Pembayaran</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Layanan</span>
                  <span className="font-medium capitalize">{serviceType} IMEI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">{model}</span>
                </div>
                {pricing && (
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">Kisaran Harga</span>
                    <span className="font-semibold text-foreground">
                      {formatRupiahShort(pricing.priceMin)} – {formatRupiahShort(pricing.priceMax)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-900 mb-3">Transfer ke Rekening</p>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between items-center">
                  <span>Bank</span>
                  <span className="font-semibold">{BANK_NAME}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nomor Rekening</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">{BANK_NUMBER}</span>
                    <button
                      onClick={() => copyToClipboard(BANK_NUMBER)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Salin nomor rekening"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>A/N</span>
                  <span className="font-semibold">{BANK_HOLDER}</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-blue-700">
                Transfer sesuai kisaran harga. Admin akan konfirmasi harga final via WhatsApp sebelum proses dimulai.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload Bukti Transfer <span className="text-red-500">*</span>
              </label>
              <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/20 px-4 py-8 cursor-pointer hover:border-primary/50 transition-colors">
                {proofPreview ? (
                  <img
                    src={proofPreview}
                    alt="Bukti transfer"
                    className="max-h-40 rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Klik untuk upload foto</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG, HEIC, maks 5MB</p>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleProofChange}
                />
              </label>
              {proofFile && (
                <p className="mt-2 text-xs text-green-600 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {proofFile.name} dipilih
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Sukses */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-5">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Pesanan Berhasil Dikirim!</h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xs mx-auto">
              Admin kami akan mengkonfirmasi via WhatsApp setelah memverifikasi pembayaran.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm">
              <p className="text-muted-foreground">Nomor Order Anda:</p>
              <p className="mt-1 text-xl font-mono font-bold text-foreground">{orderNumber}</p>
              <button
                onClick={() => copyToClipboard(orderNumber)}
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                Salin nomor order
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`/cek-order?order=${orderNumber}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
              >
                Cek Status Order
              </a>
              <a
                href={`https://wa.me/${WA_ADMIN}?text=Halo%2C%20saya%20sudah%20transfer%20untuk%20order%20${orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all"
              >
                Konfirmasi ke Admin WA
              </a>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => { setStep((prev) => (prev - 1) as Step); setError(""); }}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all"
              >
                Kembali
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90"
              >
                Lanjut
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
            {step === 3 && (
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Kirim Pesanan
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PesanPage() {
  return (
    <Suspense>
      <PesanContent />
    </Suspense>
  );
}
