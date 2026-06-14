"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { formatDate, formatRupiah, maskImei } from "@/lib/utils";
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_COLOR,
  type OrderStatus,
} from "@/types";
import {
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCcw,
  Search,
  Download,
  ChevronDown,
  Loader2,
  AlertCircle,
  Eye,
  Edit3,
  TrendingUp,
} from "lucide-react";

interface DBOrder {
  id: string;
  order_number: string;
  imei: string;
  model: string;
  service_type: string;
  status: OrderStatus;
  customer_name: string;
  phone_wa: string;
  payment_proof: string | null;
  notes: string | null;
  price: number;
  created_at: string;
  updated_at: string;
}

const ALL_STATUSES: OrderStatus[] = [
  "pending", "confirmed", "processing", "completed", "failed", "refunded",
];

const STATUS_COLORS_BG: Record<OrderStatus, string> = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  processing: "bg-purple-500",
  completed: "bg-green-500",
  failed: "bg-red-500",
  refunded: "bg-gray-500",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<DBOrder | null>(null);
  const [editNote, setEditNote] = useState("");
  const [editStatus, setEditStatus] = useState<OrderStatus>("pending");
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data } = await query;
    setOrders((data ?? []) as DBOrder[]);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const filtered = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      o.order_number.toLowerCase().includes(q) ||
      o.customer_name.toLowerCase().includes(q) ||
      o.imei.includes(q) ||
      o.model.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    completed: orders.filter((o) => o.status === "completed").length,
    revenue: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.price, 0),
  };

  const openDetail = (order: DBOrder) => {
    setSelectedOrder(order);
    setEditNote(order.notes ?? "");
    setEditStatus(order.status);
    setUpdateMsg("");
  };

  const handleUpdate = async () => {
    if (!selectedOrder) return;
    setUpdating(true);
    const { error } = await supabase
      .from("orders")
      .update({
        status: editStatus,
        notes: editNote || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", selectedOrder.id);
    setUpdating(false);
    if (error) {
      setUpdateMsg("Gagal update. Coba lagi.");
    } else {
      setUpdateMsg("Berhasil diperbarui!");
      setSelectedOrder(null);
      fetchOrders();
    }
  };

  const exportCSV = () => {
    const header = ["Nomor Order", "Model", "Layanan", "Status", "Customer", "WA", "Harga", "Tanggal"];
    const rows = filtered.map((o) => [
      o.order_number,
      o.model,
      o.service_type,
      o.status,
      o.customer_name,
      o.phone_wa,
      o.price.toString(),
      formatDate(o.created_at),
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-slate-950 text-white px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-white/50 text-sm">iUnlock.id — Manajemen Order</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 transition-all"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Order", value: stats.total, icon: Package, color: "text-foreground" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-600" },
            { label: "Diproses", value: stats.processing, icon: RefreshCcw, color: "text-purple-600" },
            { label: "Selesai", value: stats.completed, icon: CheckCircle2, color: "text-green-600" },
            {
              label: "Revenue",
              value: formatRupiah(stats.revenue),
              icon: TrendingUp,
              color: "text-blue-600",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nomor order, nama, IMEI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
              className="appearance-none rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">Semua Status</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-border bg-background overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Package className="h-10 w-10 mb-3 opacity-30" />
              <p className="text-sm">Tidak ada order ditemukan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Order</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Model</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Customer</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Tanggal</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-mono text-xs font-medium">{order.order_number}</p>
                        <p className="text-xs text-muted-foreground capitalize mt-0.5">{order.service_type}</p>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <p className="text-xs">{order.model}</p>
                        <p className="text-xs text-muted-foreground font-mono">{maskImei(order.imei)}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-medium">{order.customer_name}</p>
                        <a
                          href={`https://wa.me/${order.phone_wa}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          {order.phone_wa}
                        </a>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${ORDER_STATUS_COLOR[order.status]}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${STATUS_COLORS_BG[order.status]}`} />
                          {ORDER_STATUS_LABEL[order.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-muted-foreground">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => openDetail(order)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted transition-all"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        {order.payment_proof && (
                          <a
                            href={order.payment_proof}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1.5 inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted transition-all"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Bukti
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail / Edit Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Edit Order
            </h3>
            <p className="text-sm text-muted-foreground font-mono mb-5">
              {selectedOrder.order_number}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status Pesanan
                </label>
                <div className="relative">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as OrderStatus)}
                    className="w-full appearance-none rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Catatan Admin (opsional)
                </label>
                <textarea
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="Tambahkan catatan untuk customer..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            {updateMsg && (
              <div className={`mt-3 flex items-center gap-2 text-sm ${updateMsg.includes("Gagal") ? "text-red-600" : "text-green-600"}`}>
                {updateMsg.includes("Gagal") ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {updateMsg}
              </div>
            )}

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 disabled:opacity-60"
              >
                {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
