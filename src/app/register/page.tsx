"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getRandomPet, PetData } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";
import MatchModal from "@/components/MatchModal";

type SwipePet = PetData & { uid: string };

export default function SwipeDeck({ initialPets }: { initialPets: PetData[] }) {
  const [pets, setPets] = useState<SwipePet[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pets.length === 0 && initialPets.length > 0) {
      const petsWithUid = initialPets.map((p) => ({
        ...p,
        uid: crypto.randomUUID(),
      }));
      setPets(petsWithUid);
      setLoading(false);
    }
  }, [initialPets, pets.length]);

  const addNewPet = useCallback(async () => {
    try {
      setLoading(true);
      const newPet = await getRandomPet();
      setPets((prev) => [...prev, { ...newPet, uid: crypto.randomUUID() }]);
    } catch (e) {
      console.error("Error al cargar nueva mascota:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pets.length > 0 && pets.length < 5 && !loading) addNewPet();
  }, [pets, addNewPet, loading]);

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

      if (!user) {
        alert("💚 Inicia sesión para guardar tus favoritos.");
      } else {
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
      }
    }

    setTimeout(() => {
      setPets((prev) => prev.filter((p) => p.uid !== pet.uid));
      addNewPet();
      setAnimatingId(null);
    }, 400);
  };

  return (
    <div className="relative w-full flex justify-center items-center min-h-[70vh] sm:min-h-[80vh] overflow-hidden px-2 sm:px-0">
      {/* 💚 Loader */}
      {loading && pets.length === 0 && (
        <div className="absolute flex flex-col items-center justify-center gap-3 text-[var(--color-muted)]">
          <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-[var(--color-muted)]">
            Cargando mascotas...
          </p>
        </div>
      )}

      {/* 🐶 Tarjetas */}
      {pets.map((pet, index) => {
        const isTop = index === 0;
        return (
          <motion.div
            id={`card-${pet.uid}`}
            key={pet.uid}
            className="absolute w-[90%] sm:w-80 md:w-96 h-[480px] sm:h-[520px] bg-white/90 backdrop-blur-sm border border-[var(--color-primary-light)] rounded-3xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center overflow-hidden cursor-grab"
            style={{
              zIndex: pets.length - index,
              top: index * 4,
              scale: 1 - index * 0.02,
              opacity: 1 - index * 0.08,
            }}
          >
            <div className="relative w-full h-60 sm:h-64 overflow-hidden">
              <Image
                src={pet.imagen}
                alt={pet.nombre}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 text-center flex flex-col gap-1 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
                {pet.nombre}
              </h2>
              <p className="text-sm text-[var(--color-muted)] capitalize">
                {pet.especie}
              </p>
              {pet.raza && (
                <p className="text-sm text-[var(--color-text)]">{pet.raza}</p>
              )}
              {pet.temperamento && (
                <p className="text-xs text-[var(--color-muted)] italic">
                  {pet.temperamento}
                </p>
              )}
            </div>

            {isTop && (
              <div className="mt-auto mb-4 flex justify-center gap-6 sm:gap-8">
                <button
                  onClick={() => handleSwipe(pet, "left")}
                  className="px-3 sm:px-4 py-2 text-lg sm:text-xl rounded-full border border-red-300 text-red-500 hover:bg-red-50 shadow-sm transition"
                >
                  ❌
                </button>
                <button
                  onClick={() => handleSwipe(pet, "right")}
                  className="px-3 sm:px-4 py-2 text-lg sm:text-xl rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white shadow-sm transition"
                >
                  ❤️
                </button>
              </div>
            )}
          </motion.div>
        );
      })}

      <MatchModal show={showMatch} onClose={() => setShowMatch(false)} />
    </div>
  );
}
