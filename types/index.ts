export type ServiceType = "bypass" | "unblock";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export type IPhoneModel =
  | "iPhone 6"
  | "iPhone 6s"
  | "iPhone 6s Plus"
  | "iPhone SE (1st Gen)"
  | "iPhone 7"
  | "iPhone 7 Plus"
  | "iPhone 8"
  | "iPhone 8 Plus"
  | "iPhone X"
  | "iPhone XS"
  | "iPhone XS Max"
  | "iPhone XR"
  | "iPhone 11"
  | "iPhone 11 Pro"
  | "iPhone 11 Pro Max"
  | "iPhone SE (2nd Gen)"
  | "iPhone 12"
  | "iPhone 12 Mini"
  | "iPhone 12 Pro"
  | "iPhone 12 Pro Max"
  | "iPhone 13"
  | "iPhone 13 Mini"
  | "iPhone 13 Pro"
  | "iPhone 13 Pro Max"
  | "iPhone SE (3rd Gen)"
  | "iPhone 14"
  | "iPhone 14 Plus"
  | "iPhone 14 Pro"
  | "iPhone 14 Pro Max"
  | "iPhone 15"
  | "iPhone 15 Plus"
  | "iPhone 15 Pro"
  | "iPhone 15 Pro Max"
  | "iPhone 16"
  | "iPhone 16 Plus"
  | "iPhone 16 Pro"
  | "iPhone 16 Pro Max"
  | "iPhone 17"
  | "iPhone 17 Plus"
  | "iPhone 17 Pro"
  | "iPhone 17 Pro Max";

export interface PricingItem {
  model: IPhoneModel;
  serviceType: ServiceType;
  priceMin: number;
  priceMax: number;
  isPopular?: boolean;
  estimatedTime: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  imei: string;
  model: IPhoneModel;
  serviceType: ServiceType;
  status: OrderStatus;
  customerName: string;
  phoneWa: string;
  paymentProof?: string;
  notes?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  modelUsed: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface OrderFormData {
  serviceType: ServiceType;
  model: IPhoneModel;
  imei: string;
  customerName: string;
  phoneWa: string;
  paymentProof?: File;
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Menunggu Konfirmasi",
  confirmed: "Pembayaran Dikonfirmasi",
  processing: "Sedang Diproses",
  completed: "Selesai",
  failed: "Gagal",
  refunded: "Refund",
};

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  processing: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  refunded: "bg-gray-100 text-gray-800 border-gray-200",
};
