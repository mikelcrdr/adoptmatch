/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // dominios autorizados para cargar imágenes externas
    domains: [
      "cdn2.thecatapi.com",
      "cdn.thecatapi.com",
      "cdn2.thedogapi.com",
      "cdn.thedogapi.com",
      "images.dog.ceo",
    ],
  },
};

export default nextConfig;
