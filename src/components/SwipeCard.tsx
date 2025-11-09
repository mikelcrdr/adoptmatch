"use client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import type { PetData } from "@/lib/api";

type Props = {
  pet: PetData;
  onLike?: (pet: PetData) => void;
  onPass?: (pet: PetData) => void;
};

export default function SwipeCard({ pet, onLike, onPass }: Props) {
  const controls = useAnimation();
  const [removed, setRemoved] = useState(false);

  async function swipe(direction: "left" | "right") {
    await controls.start({
      x: direction === "right" ? 400 : -400,
      opacity: 0,
      rotate: direction === "right" ? 20 : -20,
      transition: { duration: 0.4 },
    });
    setRemoved(true);
    if (direction === "right" && onLike) onLike(pet);
    if (direction === "left" && onPass) onPass(pet);
  }

  if (removed) return null;

  return (
    <motion.div
      drag="x"
      onDragEnd={(_, info) => {
        if (info.offset.x > 150) swipe("right");
        else if (info.offset.x < -150) swipe("left");
        else controls.start({ x: 0, rotate: 0 });
      }}
      animate={controls}
      className="bg-white border shadow-xl rounded-2xl w-80 h-[520px] flex flex-col items-center overflow-hidden"
    >
      <Image
        src={pet.imagen}
        alt={pet.nombre}
        width={400}
        height={300}
        className="object-cover w-full h-64"
    />
    <div className="p-4 text-center space-y-1">
        <h2 className="text-lg font-bold">{pet.nombre}</h2>
        <p className="text-sm text-zinc-500 capitalize">{pet.especie}</p>
        {pet.raza && <p className="text-sm">{pet.raza}</p>}
        {pet.temperamento && (
          <p className="text-xs text-zinc-500">{pet.temperamento}</p>
        )}
      </div>
      <div className="mt-auto mb-4 flex gap-8">
        <button
          onClick={() => swipe("left")}
          className="px-4 py-2 text-xl rounded-full border border-red-400 text-red-500 hover:bg-red-50"
        >
          ❌
        </button>
        <button
          onClick={() => swipe("right")}
          className="px-4 py-2 text-xl rounded-full border border-green-400 text-green-600 hover:bg-green-50"
        >
          ❤️
        </button>
      </div>
    </motion.div>
  );
}
