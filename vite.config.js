import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";

export default defineConfig({
  base: "/",
  server: { port: 4200 },
  css: { devSourcemap: false },
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
          r("", "./App/Layout.tsx", () => {
            r("login", "./pages/Signin.tsx");
            r("login/reset", "./pages/ResetPassword/index.ts");
            r("logout", "./pages/logout.ts");
            r("nonprofit", "./pages/informational/NonprofitInfo/index.ts");
            r("donor", "./pages/informational/DonorInfo/index.ts");
            r("wp-plugin", "./pages/informational/WpPlugin.tsx");
            r("about", "./pages/informational/about/index.tsx");
            r("blog", "./pages/Blog/Posts.tsx");
            r("blog/:slug", "./pages/Blog/Post.tsx");
            r("marketplace", "./pages/Marketplace/index.tsx", () => {
              r("filter", "./pages/Marketplace/Filter/index.ts");
            });
            r("marketplace/:id", "./pages/Profile/Profile.tsx", () => {
              r("", "./pages/Profile/Body/Body.tsx", () => {
                r("", "./pages/Profile/Body/GeneralInfo/index.ts", {
                  index: true,
                });
                r(
                  "program/:programId",
                  "./pages/Profile/Body/Program/index.ts"
                );
              });
            });
          });
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
