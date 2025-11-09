"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Iniciar sesión
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Correo o contraseña incorrectos.");
    } else {
      console.log("✅ Sesión iniciada:", data);
      router.push("/"); // redirige al inicio
    }

    setLoading(false);
  };

  // 🔹 Registrarse
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMsg("Error al registrarse: " + error.message);
    } else {
      alert("✅ Cuenta creada. Revisa tu correo para verificarla.");
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-3xl font-semibold mb-6">Inicia sesión o regístrate 🐾</h1>

      <form
        onSubmit={handleSignIn}
        className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4"
      >
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition"
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        <button
          onClick={handleSignUp}
          type="button"
          disabled={loading}
          className="w-full border border-green-500 text-green-600 rounded-lg py-2 hover:bg-green-50 transition"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
}
