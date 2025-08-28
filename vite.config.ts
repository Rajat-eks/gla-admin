import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
   preview: {
    port: 5000, // or whatever port you're using
    host: true, // allow external access
    allowedHosts: ['portal.staneffect.ai'], // 👈 add your domain here
  },
});
