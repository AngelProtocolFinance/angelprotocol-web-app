import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

/// <reference types="vitest" />
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
