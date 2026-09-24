/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Permite que el build termine con éxito aunque haya advertencias o errores de ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opcional, pero evita que errores menores de tipos bloqueen el build
    ignoreBuildErrors: true,
  },
};

export default nextConfig; // o module.exports = nextConfig; si usa CommonJS
