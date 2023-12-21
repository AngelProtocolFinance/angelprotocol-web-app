import { defineConfig } from "@rsbuild/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwind from "tailwindcss";

export default defineConfig({
  server: { port: 4200 },
  html: {
    appIcon: "./public/favicon.png",
    favicon: "./public/favicon.png",
    title: "Support an impact organization",
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwind()],
      },
    },
  },
});
