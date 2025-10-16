import type { Animal } from "@/lib/types";

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <a href={`/animal/${animal.id}`} className="group overflow-hidden rounded-xl border bg-white hover:shadow-lg transition">
      <div className="aspect-[4/3] bg-zinc-100">
        <img src={animal.imagen_url} alt={animal.nombre} className="h-full w-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-3">
        <h3 className="font-medium">{animal.nombre}</h3>
        <p className="text-xs text-zinc-600">
          {animal.especie} • {animal.raza ?? "Mestizo"} • {animal.estado ?? "disponible"}
        </p>
      </div>
    </a>
  );
}
