import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  build: { outDir: "build", target: "es2022" },
  server: { port: 4200 },
  plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths(), tailwind()],
  test: {
    setupFiles: ["./src/setup-tests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
