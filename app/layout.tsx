import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "iUnlock.id";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iunlock.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Jasa Bypass & Unblock IMEI iPhone Terpercaya`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Jasa bypass dan unblock IMEI iPhone profesional. iPhone 6 hingga iPhone 17 Pro. Harga terjangkau mulai Rp 50.000. Proses cepat, bergaransi, konfirmasi via WhatsApp.",
  keywords: [
    "bypass imei iphone",
    "unblock imei iphone",
    "jasa bypass icloud",
    "unlock icloud activation lock",
    "bypass icloud lock indonesia",
    "harga bypass imei",
    "imei bypass murah",
    "jasa unlock iphone",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Jasa Bypass & Unblock IMEI iPhone Terpercaya`,
    description:
      "Bypass & unblock IMEI iPhone mulai Rp 50.000. iPhone 6 – iPhone 17 Pro. Cepat, bergaransi, konfirmasi WA.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Bypass & Unblock IMEI iPhone`,
    description:
      "Jasa bypass & unblock IMEI iPhone terpercaya. Harga mulai Rp 50.000.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
