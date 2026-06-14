"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, LogOut, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else if (session) {
        setAuthed(true);
      }
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session && pathname !== "/admin/login") {
          router.replace("/admin/login");
        } else if (session) {
          setAuthed(true);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // Login page renders without auth check overlay
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-slate-950">
        <Loader2 className="h-6 w-6 animate-spin text-white/50" />
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div>
      {/* Mini top bar for admin (Navbar is hidden in admin via layout override) */}
      <div className="sticky top-0 z-40 bg-slate-900 border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 text-white font-semibold text-sm">
          <Shield className="h-4 w-4 text-blue-400" />
          iUnlock Admin
        </Link>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}
