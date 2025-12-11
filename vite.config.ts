/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtools_json from "vite-plugin-devtools-json";
import tsconfig_paths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  build: { outDir: "build", target: "es2022" },
  server: { port: 4200, allowedHosts: [".ngrok-free.app"] },
  plugins: [
    !process.env.VITEST && reactRouter(),
    tsconfig_paths(),
    tailwind(),
    devtools_json(),
  ],
  test: {
    setupFiles: ["./src/setup-tests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
