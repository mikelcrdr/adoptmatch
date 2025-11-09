// src/lib/api.ts

export type PetData = {
  id: string;
  nombre: string;
  especie: "perro" | "gato";
  raza?: string;
  edad_meses?: number;
  tamano?: string;
  energia?: string;
  estado?: string;
  imagen: string;
  temperamento?: string;
};

// 🐶 Base de nombres reales
const dogBaseNames = [
  "Rocky", "Toby", "Kira", "Max", "Luna", "Nala", "Simba", "Coco",
  "Bimba", "Leo", "Maya", "Rex", "Bruno", "Duna", "Otto", "Tina",
  "Milo", "Sasha", "Thor", "Chispa", "Mimi", "Nico", "Nina", "Tango",
  "Pongo", "Chloe", "Lolo", "Toby", "Kiko", "Tuca", "Nico"
];

// 🐱 Base de nombres reales
const catBaseNames = [
  "Misu", "Milo", "Mika", "Luna", "Simba", "Zuri", "Cleo", "Oreo",
  "Mimo", "Nube", "Trixie", "Sombra", "Tigra", "Tom", "Zoe", "Nina",
  "Kira", "Leo", "Toby", "Chispa", "Loki", "Bimba", "Neko", "Mia"
];

// 🧩 Sufijos naturales para crear variantes
const diminutives = ["ito", "ita", "ín", "ina", "chi", "cho", "y", "a", "u"];
const softEndings = ["y", "i", "ie", "a", "ita", "ito"];
const strongEndings = ["o", "on", "ko", "as", "an"];

/**
 * Genera nombres infinitos y realistas para perros o gatos.
 */
function generateNaturalName(type: "perro" | "gato"): string {
  const base =
    type === "perro"
      ? dogBaseNames[Math.floor(Math.random() * dogBaseNames.length)]
      : catBaseNames[Math.floor(Math.random() * catBaseNames.length)];

  let name = base;

  // 40% de probabilidad de añadir un diminutivo natural
  if (Math.random() < 0.4) {
    name += diminutives[Math.floor(Math.random() * diminutives.length)];
  }

  // 30% de probabilidad de variar el final según tipo
  if (Math.random() < 0.3) {
    name = name.slice(0, -1); // quita última letra
    const endings = type === "perro" ? strongEndings : softEndings;
    name += endings[Math.floor(Math.random() * endings.length)];
  }

  // Capitaliza y elimina repeticiones de letras
  name = name.charAt(0).toUpperCase() + name.slice(1).replace(/(.)\1+/g, "$1");

  return name;
}

/**
 * Obtiene un animal aleatorio (perro o gato) según el filtro seleccionado.
 * Usa TheDogAPI y TheCatAPI, devolviendo un objeto unificado.
 */
export async function getRandomPet(
  type: "perros" | "gatos" | "ambos" = "ambos"
): Promise<PetData> {
  try {
    // 🐱 Solo gatos
    if (type === "gatos") {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();

      return {
        id: data[0].id || crypto.randomUUID(),
        nombre: generateNaturalName("gato"),
        especie: "gato",
        raza: "Común europeo",
        edad_meses: Math.floor(Math.random() * 24) + 3,
        tamano: "pequeño",
        energia: "media",
        estado: "disponible",
        imagen: data[0].url,
        temperamento: "Curioso y tranquilo",
      };
    }

    // 🐶 Solo perros
    if (type === "perros") {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();

      return {
        id: crypto.randomUUID(),
        nombre: generateNaturalName("perro"),
        especie: "perro",
        raza: "Mestizo",
        edad_meses: Math.floor(Math.random() * 48) + 6,
        tamano: ["pequeño", "mediano", "grande"][
          Math.floor(Math.random() * 3)
        ],
        energia: ["baja", "media", "alta"][Math.floor(Math.random() * 3)],
        estado: "disponible",
        imagen: data.message,
        temperamento: "Leal y cariñoso",
      };
    }

    // 🐾 Ambos
    return Math.random() < 0.5
      ? await getRandomPet("perros")
      : await getRandomPet("gatos");
  } catch (error) {
    console.error("Error al obtener datos del API:", error);

    // Fallback local
    return {
      id: crypto.randomUUID(),
      nombre: generateNaturalName("perro"),
      especie: "perro",
      raza: "Desconocida",
      edad_meses: 12,
      tamano: "mediano",
      energia: "media",
      estado: "disponible",
      imagen: "https://placehold.co/600x400",
      temperamento: "Amigable y sociable",
    };
  }
}
