import type { Metadata } from "next";
import Link from "next/link"; // 👈 importa Link
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configuración de las fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos del sitio
export const metadata: Metadata = {
  title: "AdoptMatch",
  description: "Adopciones con conexión emocional",
};

// Layout principal
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-white text-zinc-900 antialiased`}
      >
        {/* Header */}
        <header className="border-b">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">
              AdoptMatch
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/favoritos" className="hover:underline">
                Favoritos
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/about" className="hover:underline">
                Acerca de
              </Link>
              <Link
                href="/login"
                className="rounded-lg border px-3 py-1 hover:bg-zinc-50"
              >
                Entrar
              </Link>
            </div>
          </nav>
        </header>

        {/* Contenido de cada página */}
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        {/* Footer */}
        <footer className="border-t py-6 mt-10 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} AdoptMatch
        </footer>
      </body>
    </html>
  );
}

