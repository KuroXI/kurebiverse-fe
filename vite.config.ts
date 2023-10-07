import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "autoUpdate", manifest: {
    icons: [
      {
        src: "/applogo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  } })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});
