"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { formatDate, maskImei } from "@/lib/utils";
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_COLOR,
  type Order,
  type OrderStatus,
} from "@/types";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";

const STATUS_ICONS: Record<OrderStatus, React.ElementType> = {
  pending: Clock,
  confirmed: CheckCircle2,
  processing: RefreshCcw,
  completed: CheckCircle2,
  failed: XCircle,
  refunded: RefreshCcw,
};

const TIMELINE: OrderStatus[] = ["pending", "confirmed", "processing", "completed"];

function CekOrderContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("order") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) { setError("Masukkan nomor order atau IMEI."); return; }
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const q = query.trim().replace(/\s/g, "");
      const { data, error: dbErr } = await supabase
        .from("orders")
        .select("*")
        .or(`order_number.eq.${q},imei.eq.${q}`)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (dbErr || !data) {
        setOrder(null);
        setError("Order tidak ditemukan. Pastikan nomor order atau IMEI sudah benar.");
        return;
      }

      setOrder({
        id: data.id,
        orderNumber: data.order_number,
        imei: data.imei,
        model: data.model as Order["model"],
        serviceType: data.service_type as Order["serviceType"],
        status: data.status as OrderStatus,
        customerName: data.customer_name,
        phoneWa: data.phone_wa,
        paymentProof: data.payment_proof ?? undefined,
        notes: data.notes ?? undefined,
        price: data.price,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      });
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Auto search if order number is in URL
  useEffect(() => {
    const orderParam = searchParams.get("order");
    if (orderParam) {
      setQuery(orderParam);
      handleSearch();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentStatusIndex = order
    ? TIMELINE.indexOf(order.status as OrderStatus)
    : -1;

  const Icon = order ? STATUS_ICONS[order.status] : Package;

  return (
    <div>
      <div className="bg-slate-950 text-white py-14">
        <div className="container text-center">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-2">Status Pesanan</p>
          <h1 className="text-3xl font-bold sm:text-4xl">Cek Status Order</h1>
          <p className="mt-3 text-white/70 text-sm max-w-md mx-auto">
            Masukkan nomor order atau nomor IMEI untuk melihat status pesanan Anda.
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-xl">
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Nomor order (ORD...) atau IMEI"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Cek
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Order found */}
        {order && !error && (
          <div className="space-y-5 animate-fade-in">
            {/* Status header */}
            <div
              className={`flex items-center gap-3 rounded-xl border px-5 py-4 ${ORDER_STATUS_COLOR[order.status]}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{ORDER_STATUS_LABEL[order.status]}</p>
                <p className="text-xs opacity-70 mt-0.5">
                  Terakhir diperbarui: {formatDate(order.updatedAt)}
                </p>
              </div>
            </div>

            {/* Timeline */}
            {order.status !== "failed" && order.status !== "refunded" && (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground mb-4">Progress</p>
                <div className="flex items-center justify-between">
                  {TIMELINE.map((status, i) => {
                    const done = currentStatusIndex >= i;
                    const active = currentStatusIndex === i;
                    const TIcon = STATUS_ICONS[status];
                    return (
                      <div key={status} className="flex flex-col items-center flex-1">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                            done
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-background text-muted-foreground"
                          } ${active ? "ring-4 ring-primary/20" : ""}`}
                        >
                          <TIcon className="h-4 w-4" />
                        </div>
                        <p className={`mt-2 text-xs text-center leading-tight ${done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                          {ORDER_STATUS_LABEL[status]}
                        </p>
                        {i < TIMELINE.length - 1 && (
                          <div
                            className={`absolute h-px w-full translate-x-1/2 mt-4 ${
                              currentStatusIndex > i ? "bg-primary" : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Order detail */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground mb-4">Detail Pesanan</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nomor Order</span>
                  <span className="font-mono font-semibold">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Layanan</span>
                  <span className="capitalize font-medium">{order.serviceType} IMEI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model iPhone</span>
                  <span>{order.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IMEI</span>
                  <span className="font-mono text-xs">{maskImei(order.imei)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal Order</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Admin notes */}
            {order.notes && (
              <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
                <p className="font-medium text-foreground mb-1">Catatan Admin:</p>
                <p className="text-muted-foreground">{order.notes}</p>
              </div>
            )}

            {/* Completed message */}
            {order.status === "completed" && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                <p className="font-semibold mb-1">Pesanan Selesai!</p>
                <p>iPhone Anda sudah berhasil diproses. Jika ada pertanyaan, hubungi admin WA.</p>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!order && !error && !loading && searched && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Masukkan nomor order atau IMEI untuk mencari.</p>
          </div>
        )}

        {!searched && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Nomor order dikirim via WhatsApp setelah pesanan dibuat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CekOrderPage() {
  return (
    <Suspense>
      <CekOrderContent />
    </Suspense>
  );
}
