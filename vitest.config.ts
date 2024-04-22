import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react() /** TODO:remove plugin once jsx have been converted to tsx */,
  ],
  test: {
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
