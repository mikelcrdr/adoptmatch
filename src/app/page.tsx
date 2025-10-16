import AnimalCard from "@/components/AnimalCard";
import type { Animal } from "@/lib/types";

const mock: Animal[] = [
  { id: "1", nombre: "Coco", especie: "perro", raza: "Mestizo", edad_meses: 18, tamano:"mediano", energia:"alta", estado:"disponible", imagen_url:"https://placehold.co/600x400" },
  { id: "2", nombre: "Luna", especie: "gato",  raza: "Siames",  edad_meses: 8,  tamano:"pequeno", energia:"media", estado:"disponible", imagen_url:"https://placehold.co/600x400" },
];


export default function Home() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold">Encuentra a tu mejor amigo 🐾</h1>
        <p className="text-zinc-600">Explora animales en adopción según tu estilo de vida.</p>
      </div>

      {/* Filtros placeholder */}
      <div className="flex flex-wrap gap-2">
        <select className="border rounded-md px-3 py-2 text-sm"><option>Todos</option><option>Perros</option><option>Gatos</option></select>
        <select className="border rounded-md px-3 py-2 text-sm"><option>Tamaño</option><option>Pequeño</option><option>Mediano</option><option>Grande</option></select>
        <select className="border rounded-md px-3 py-2 text-sm"><option>Energía</option><option>Baja</option><option>Media</option><option>Alta</option></select>
        <input className="border rounded-md px-3 py-2 text-sm" placeholder="Buscar por nombre o raza" />
      </div>

      {/* Grid de tarjetas mock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mock.map(a => <AnimalCard key={a.id} animal={a} />)}
      </div>
    </section>
  );
}
