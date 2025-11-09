"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Frown } from "lucide-react"; // 👈 iconos bonitos

type Like = {
  id: string;
  created_at: string;
  pet_id: string | null;
  pet_name: string | null;
  pet_species: string | null;
  pet_image: string | null;
  pet_breed: string | null;
  pet_temperament: string | null;
  user_id: string | null;
};

export default function FavoritesPage() {
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndLikes = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUserId(null);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error al cargar favoritos:", error);
      } else {
        setLikes(data || []);
      }

      setLoading(false);
    };

    fetchUserAndLikes();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("likes").delete().eq("id", id);
    if (error) {
      console.error("❌ Error al eliminar favorito:", error);
    } else {
      setLikes((prev) => prev.filter((pet) => pet.id !== id));
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center h-[70vh]">
        <p className="text-zinc-600">Cargando favoritos...</p>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-semibold mb-4">Inicia sesión</h1>
        <p className="text-zinc-600 mb-6">
          Necesitas iniciar sesión para ver tus favoritos ❤️
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-600 transition"
        >
          Ir a iniciar sesión
        </button>
      </main>
    );
  }

  if (likes.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h1 className="text-3xl font-semibold mb-4 text-[var(--color-primary)]">
          ❤️ Tus favoritos
        </h1>
        <p className="text-zinc-600">Aún no has guardado ningún amigo peludo.</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-[var(--color-primary)]">
        ❤️ Tus favoritos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likes.map((pet) => (
          <div
            key={pet.id}
            className="bg-white/90 border border-[var(--color-primary-light)] rounded-3xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
          >
            {pet.pet_image && (
              <Image
                src={pet.pet_image}
                alt={pet.pet_name ?? "Mascota"}
                width={400}
                height={300}
                className="rounded-2xl object-cover h-48 w-full"
              />
            )}
            <h2 className="text-lg font-bold mt-3 text-[var(--color-primary)]">
              {pet.pet_name}
            </h2>
            <p className="text-sm text-zinc-600 capitalize">{pet.pet_species}</p>
            {pet.pet_breed && <p className="text-xs">{pet.pet_breed}</p>}
            {pet.pet_temperament && (
              <p className="text-xs text-zinc-500 italic">
                {pet.pet_temperament}
              </p>
            )}

            {/* 🌿 Botón emocional: “Quitar favorito” con icono */}
            <button
              onClick={() => handleDelete(pet.id)}
              className="mt-5 flex items-center justify-center gap-2 px-3 py-2 bg-[#f2f8f3] text-[var(--color-muted)] rounded-full hover:bg-[#e0efe4] transition text-sm shadow-sm"
            >
              <Trash2 size={16} className="opacity-80" />
              <span className="font-medium">Quitar favorito 😢</span>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

