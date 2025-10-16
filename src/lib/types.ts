export type Animal = {
    id: string;
    nombre: string;
    especie: "perro" | "gato";
    raza?: string;
    edad_meses?: number;
    tamano?: "pequeno" | "mediano" | "grande";
    energia?: "baja" | "media" | "alta";
    estado?: "disponible" | "reservado" | "adoptado";
    imagen_url?: string;
    video_url?: string;
    audio_url?: string;
};  