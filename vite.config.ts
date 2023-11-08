import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const inject = require("@rollup/plugin-inject");
const esbuildShim = require.resolve("node-stdlib-browser/helpers/esbuild/shim");

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: stdLibBrowser } = await import("node-stdlib-browser");
  return {
    test: {
      setupFiles: ["./src/setupTests.ts"],
      environment: "jsdom",
      globals: true,
    },
    server: {
      port: 4200,
    },
    build: {
      outDir: "build",
    },
    resolve: {
      alias: stdLibBrowser,
    },
    optimizeDeps: {
      include: ["buffer", "process"],
    },
    plugins: [
      react(),
      tsconfigPaths(),

      {
        ...inject({
          global: [esbuildShim, "global"],
          process: [esbuildShim, "process"],
          Buffer: [esbuildShim, "Buffer"],
        }),
        enforce: "post",
      },
    ],
  };
});
