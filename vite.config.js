import { defineConfig } from "vite";
import tsconfig_paths from "vite-tsconfig-paths";
import devtools_json from "vite-plugin-devtools-json";
import { reactRouter } from "@react-router/dev/vite";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  build: { outDir: "build", target: "es2022" },
  server: { port: 4200 },
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
