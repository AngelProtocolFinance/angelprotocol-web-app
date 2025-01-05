import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";

export default defineConfig({
  base: "/",
  server: { port: 4200 },
  css: {
    devSourcemap: false,
  },
  plugins: [
    remix({
      presets: [vercelPreset()],
      appDirectory: "src",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((r) => {
          r("", "./pages/Home/index.ts", { index: true });
          r("logout", "./pages/logout.ts");
          r("login", "./pages/Signin.tsx");
        });
      },
    }),
    tsconfigPaths(),
  ],
  test: {
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
