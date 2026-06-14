"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PRICING_GROUP_1,
  PRICING_GROUP_2,
  PRICING_UNBLOCK_GROUP_1,
  PRICING_UNBLOCK_GROUP_2,
} from "@/lib/pricing-data";
import { formatRupiahShort } from "@/lib/utils";
import { ArrowRight, Flame, Clock, Shield, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

const WA_ADMIN = process.env.NEXT_PUBLIC_WA_ADMIN ?? "6281234567890";

type ServiceTab = "bypass" | "unblock";

export default function HargaPage() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("bypass");

  const group1 = activeTab === "bypass" ? PRICING_GROUP_1 : PRICING_UNBLOCK_GROUP_1;
  const group2 = activeTab === "bypass" ? PRICING_GROUP_2 : PRICING_UNBLOCK_GROUP_2;

  return (
    <div>
      {/* Page Header */}
      <div className="bg-slate-950 text-white py-14">
        <div className="container text-center">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-2">Daftar Harga</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Harga Bypass & Unblock IMEI</h1>
          <p className="mt-3 text-white/70 max-w-md mx-auto text-sm">
            Harga tergantung model iPhone. Tidak ada biaya tambahan atau tersembunyi.
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl border border-border bg-muted p-1 gap-1">
            {(["bypass", "unblock"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "bypass" ? "Bypass IMEI" : "Unblock IMEI"}
              </button>
            ))}
          </div>
        </div>

        {/* Group 1: iPhone 6 - X */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-foreground">iPhone 6 – X</h2>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Mulai {formatRupiahShort(group1[0]?.priceMin ?? 50000)}
            </span>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="hidden sm:grid grid-cols-4 bg-muted/50 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
              <span>Model</span>
              <span>Harga</span>
              <span>Estimasi</span>
              <span>Aksi</span>
            </div>
            <div className="divide-y divide-border">
              {group1.map((item) => (
                <div
                  key={item.model}
                  className="grid sm:grid-cols-4 grid-cols-1 gap-2 sm:gap-0 items-center px-5 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{item.model}</span>
                    {item.isPopular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 flex-shrink-0">
                        <Flame className="h-3 w-3" />
                        Populer
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {formatRupiahShort(item.priceMin)} – {formatRupiahShort(item.priceMax)}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {item.estimatedTime}
                  </div>
                  <Link
                    href={`/pesan?model=${encodeURIComponent(item.model)}&service=${item.serviceType}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Pesan
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Group 2: iPhone XS - 17 Pro */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-foreground">iPhone XS – 17 Pro Max</h2>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Mulai {formatRupiahShort(group2[0]?.priceMin ?? 300000)}
            </span>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="hidden sm:grid grid-cols-4 bg-muted/50 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
              <span>Model</span>
              <span>Harga</span>
              <span>Estimasi</span>
              <span>Aksi</span>
            </div>
            <div className="divide-y divide-border">
              {group2.map((item) => (
                <div
                  key={item.model}
                  className="grid sm:grid-cols-4 grid-cols-1 gap-2 sm:gap-0 items-center px-5 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{item.model}</span>
                    {item.isPopular && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 flex-shrink-0">
                        <Flame className="h-3 w-3" />
                        Populer
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {formatRupiahShort(item.priceMin)} – {formatRupiahShort(item.priceMax)}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {item.estimatedTime}
                  </div>
                  <Link
                    href={`/pesan?model=${encodeURIComponent(item.model)}&service=${item.serviceType}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Pesan
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note box */}
        <div className="rounded-2xl border border-border bg-muted/30 p-5 flex flex-col sm:flex-row gap-4 items-start max-w-2xl mx-auto">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Catatan Penting</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Harga bisa berubah tergantung kondisi dan tingkat kesulitan IMEI.</li>
              <li>• Admin akan konfirmasi harga final sebelum proses dimulai.</li>
              <li>• Garansi uang kembali jika proses gagal.</li>
              <li>• Tidak yakin model iPhone Anda? Cek di Settings &rsaquo; General &rsaquo; About.</li>
            </ul>
            <a
              href={`https://wa.me/${WA_ADMIN}?text=Halo%20iUnlock.id%2C%20saya%20mau%20tanya%20harga%20bypass%20IMEI`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Tanya harga spesifik via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
