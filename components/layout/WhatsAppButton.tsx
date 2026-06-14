"use client";

import { MessageCircle } from "lucide-react";

const WA_ADMIN = process.env.NEXT_PUBLIC_WA_ADMIN ?? "6281234567890";
const WA_MESSAGE = "Halo%20iUnlock.id%2C%20saya%20ingin%20tanya%20tentang%20layanan%20bypass%2Funblock%20IMEI%20iPhone.";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_ADMIN}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 group"
    >
      <MessageCircle className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-medium hidden sm:inline max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">
        Chat WA
      </span>
    </a>
  );
}
