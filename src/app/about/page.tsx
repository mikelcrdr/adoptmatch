import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
        En memoria de Sendy 🐾
      </h1>

      <div className="max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed space-y-5">
        <p>
          Esta página fue creada para honrar la memoria de{" "}
          <span className="text-[var(--color-primary)] font-semibold">
            Sendy
          </span>, una perra que vivió una vida llena de amor y alegría, y que
          supo entregar a su familia toda la felicidad posible.
        </p>

        <p>
          AdoptMatch nace inspirada en ella — en su lealtad, su ternura y su
          capacidad de iluminar cada día — con el deseo de que más animales
          puedan recibir el mismo cariño y tener la misma oportunidad de un
          hogar lleno de esperanza.
        </p>

        <p>
          Cada historia de adopción es una nueva forma de mantener viva su
          huella.
        </p>
      </div>

      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mt-4 rounded-full overflow-hidden shadow-2xl border-4 border-[var(--color-primary-light)] bg-white/70 backdrop-blur-md">
        <Image
          src="/sendy.jpg" // ✅ usa la ruta pública
          alt="Foto de Sendy"
          fill
          className="object-cover rounded-full"
          priority
        />
      </div>

      <footer className="text-sm text-zinc-500 mt-8">
        “Algunos amigos no se van nunca; solo cambian de forma y dejan su amor
        en nuestras huellas.” 🌿
      </footer>
    </main>
  );
}
