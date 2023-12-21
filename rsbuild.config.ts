import { defineConfig } from "@rsbuild/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwind from "tailwindcss";

export default defineConfig({
  server: { port: 4200 },
  html: {
    appIcon: "./src/assets/favicon.png",
    favicon: "./src/assets/favicon.png",
    title: "Support an impact organization",
    template: "./index.html",
  },
  output: { distPath: { root: "build" } },
  plugins: [pluginReact(), pluginNodePolyfill()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwind()],
      },
    },
  },
});
