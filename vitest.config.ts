import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/// <reference types="vitest" />
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
