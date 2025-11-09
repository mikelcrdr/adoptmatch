"use client";

import { useForm } from "react-hook-form";

type FormData = {
  nombre: string;
  email: string;
  mensaje: string;
};

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Mensaje enviado:", data);
    alert("✅ Tu mensaje ha sido enviado (simulación)");
    reset();
  };

  return (
    <main className="flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Contacto con la protectora 🐾</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            {...register("nombre", { required: true })}
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="tucorreo@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mensaje</label>
          <textarea
            {...register("mensaje", { required: true })}
            rows={4}
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Cuéntanos por qué quieres adoptar"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white rounded-lg py-2 hover:bg-pink-600 transition"
        >
          Enviar mensaje
        </button>
      </form>
    </main>
  );
}
