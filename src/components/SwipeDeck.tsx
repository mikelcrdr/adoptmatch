"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getRandomPet, PetData } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";
import MatchModal from "@/components/MatchModal";

type SwipePet = PetData & { uid: string };

export default function SwipeDeck() {
  const [pets, setPets] = useState<SwipePet[]>([]);
  const [filter, setFilter] = useState<"perros" | "gatos" | "ambos">("ambos");
  const [showMatch, setShowMatch] = useState(false);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadInitialPets = useCallback(async () => {
    setLoading(true);
    const firstBatch: SwipePet[] = [];
    for (let i = 0; i < 5; i++) {
      const p = await getRandomPet(filter);
      firstBatch.push({ ...p, uid: crypto.randomUUID() });
    }
    setPets(firstBatch);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    loadInitialPets();
  }, [loadInitialPets]);

  const addNewPet = useCallback(async () => {
    const newPet = await getRandomPet(filter);
    setPets((prev) => [...prev, { ...newPet, uid: crypto.randomUUID() }]);
  }, [filter]);

  const handleSwipe = async (pet: SwipePet, direction: "left" | "right") => {
    if (animatingId) return;
    setAnimatingId(pet.uid);

    const card = document.getElementById(`card-${pet.uid}`);
    if (card) {
      card.animate(
        [
          { transform: "translateX(0)", opacity: 1 },
          {
            transform: `translateX(${direction === "right" ? "400px" : "-400px"}) rotate(${
              direction === "right" ? "15deg" : "-15deg"
            })`,
            opacity: 0,
          },
        ],
        { duration: 400, easing: "ease-out", fill: "forwards" }
      );
    }

    if (direction === "right") {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("likes").insert([
          {
            pet_id: pet.id,
            pet_name: pet.nombre,
            pet_species: pet.especie,
            pet_image: pet.imagen,
            pet_breed: pet.raza,
            pet_temperament: pet.temperamento,
            user_id: user.id,
          },
        ]);
        setShowMatch(true);
      } else {
        alert("💚 Inicia sesión para guardar tus favoritos.");
      }
    }

    setTimeout(() => {
      setPets((prev) => prev.filter((p) => p.uid !== pet.uid));
      addNewPet();
      setAnimatingId(null);
    }, 400);
  };

  const getObjectPosition = (imageUrl: string) => {
    if (imageUrl.includes("breeds") || imageUrl.includes("/portrait")) return "center top";
    if (imageUrl.includes("landscape")) return "center center";
    return "center 40%";
  };

  const buttonClass = (type: "perros" | "gatos" | "ambos") =>
    `px-4 py-2 rounded-full border transition ${
      filter === type
        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
        : "bg-white text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
    }`;

  return (
    <div className="relative w-full flex flex-col items-center gap-6">
      {/* 🏷️ Filtros */}
      <div className="flex gap-4 justify-center mt-2">
        <button onClick={() => setFilter("perros")} className={buttonClass("perros")}>
          Perros
        </button>
        <button onClick={() => setFilter("gatos")} className={buttonClass("gatos")}>
          Gatos
        </button>
        <button onClick={() => setFilter("ambos")} className={buttonClass("ambos")}>
          Ambos
        </button>
      </div>

      {/* 🐾 Contenedor principal */}
      <div className="relative flex justify-center items-center w-full min-h-[calc(100dvh-280px)] overflow-hidden px-3 sm:px-0">
        {/* 💚 Loader */}
        {loading && pets.length === 0 && (
          <div className="absolute flex flex-col items-center justify-center gap-3 text-[var(--color-muted)]">
            <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-[var(--color-muted)]">Cargando mascotas...</p>
          </div>
        )}

        {/* 🐶 Tarjetas */}
        {pets.map((pet, index) => {
          const isTop = index === 0;
          return (
            <motion.div
              id={`card-${pet.uid}`}
              key={pet.uid}
              className="absolute w-[92%] sm:w-80 md:w-96 flex flex-col bg-white/90 backdrop-blur-sm border border-[var(--color-primary-light)] rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-grab"
              style={{
                zIndex: pets.length - index,
                top: index * 4,
                scale: 1 - index * 0.02,
                opacity: 1 - index * 0.08,
              }}
            >
              {/* 📸 Imagen fluida */}
              <div className="relative w-full flex-shrink-0 aspect-[4/3] sm:h-64 overflow-hidden rounded-t-3xl bg-[var(--color-accent)] flex justify-center items-center">
                <Image
                  src={pet.imagen}
                  alt={pet.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-contain sm:object-cover object-center transition-all duration-300"
                  style={{
                    objectPosition: getObjectPosition(pet.imagen),
                  }}
                  priority
                />
              </div>

              {/* 🐾 Texto flexible */}
              <div className="flex flex-col justify-between flex-grow p-4 text-center">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
                    {pet.nombre}
                  </h2>
                  <p className="text-sm text-[var(--color-muted)] capitalize">{pet.especie}</p>
                  {pet.raza && (
                    <p className="text-sm text-[var(--color-text)]">{pet.raza}</p>
                  )}
                  {pet.temperamento && (
                    <p className="text-xs text-[var(--color-muted)] italic">
                      {pet.temperamento}
                    </p>
                  )}
                </div>

                {/* ❤️ ❌ Botones */}
                {isTop && (
                  <div className="mt-4 mb-2 flex justify-center gap-8">
                    <button
                      onClick={() => handleSwipe(pet, "left")}
                      className="px-4 py-2 text-xl rounded-full border border-red-300 text-red-500 hover:bg-red-50 shadow-sm transition"
                    >
                      👀
                    </button>
                    <button
                      onClick={() => handleSwipe(pet, "right")}
                      className="px-4 py-2 text-xl rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white shadow-sm transition"
                    >
                      ❤️
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        <MatchModal show={showMatch} onClose={() => setShowMatch(false)} />
      </div>
    </div>
  );
}
