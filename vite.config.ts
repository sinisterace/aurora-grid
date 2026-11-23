import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Runs the demo gallery in ./demo. The kit itself lives in ./src.
export default defineConfig({
  root: "demo",
  plugins: [react(), tailwindcss()],
  build: { outDir: "../dist", emptyOutDir: true },
});
