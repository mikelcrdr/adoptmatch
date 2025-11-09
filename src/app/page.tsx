"use client";

import SwipeDeck from "@/components/SwipeDeck";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fadeIn">
      <section className="max-w-2xl space-y-3 mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-[var(--color-primary)] drop-shadow-sm">
          Encuentra a tu mejor amigo 
        </h1>
        <p className="text-zinc-600 text-base sm:text-lg">
          Desliza para descubrir animales en adopción y conecta con aquel que
          encaje contigo. 💚
        </p>
      </section>

      {/* 🐶 Deck de mascotas */}
      <SwipeDeck />
    </main>
  );
}
