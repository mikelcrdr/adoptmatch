"use client";

import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

// 🧩 Fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // 🔐 Sesión activa
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push("/login");
  };

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-[#f8fef9] text-zinc-900 antialiased flex flex-col`}
      >
        {/* 🌿 Header con efecto glass */}
        <header
          className="fixed top-0 left-0 w-full z-50 border-b border-[var(--color-primary-light)] 
                     bg-white/70 backdrop-blur-xl shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all"
        >
          <nav className="mx-auto max-w-6xl flex flex-wrap items-center justify-between px-6 py-5 gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="font-extrabold text-xl text-[var(--color-primary)] hover:opacity-80 transition flex items-center gap-1"
            >
              AdoptMatch <span className="text-lg">🐾</span>
            </Link>

            {/* Menú */}
            <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-zinc-700">
              <Link
                href="/favorites"
                className="hover:text-[var(--color-primary)] transition"
              >
                Favoritos
              </Link>
              <Link
                href="/about"
                className="hover:text-[var(--color-primary)] transition"
              >
                Acerca de
              </Link>

              {userEmail ? (
                <>
                  <span className="text-zinc-500 text-xs sm:text-sm">
                    {userEmail}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="rounded-md border border-red-400 px-3 py-1 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm transition"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md border px-3 py-1 text-sm hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition"
                >
                  Entrar
                </Link>
              )}
            </div>
          </nav>
        </header>

        {/* Espacio adaptable al header fijo */}
<div className="h-[140px] sm:h-[96px] md:h-[88px]" />


        {/* 🌸 Contenido principal */}
        <main className="flex-grow mx-auto max-w-6xl w-full px-4 sm:px-6 py-10 sm:py-14">
          {children}
        </main>

        {/* 🐾 Footer */}
        <footer className="border-t border-[var(--color-primary-light)] bg-white/80 py-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} AdoptMatch — Conectando corazones 💚
        </footer>
      </body>
    </html>
  );
}
