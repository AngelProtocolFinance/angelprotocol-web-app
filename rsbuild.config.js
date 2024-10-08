import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import postCSSimport from "postcss-import";
import tailwind from "tailwindcss";

export default defineConfig({
  server: { port: 4200 },
  html: {
    appIcon: "./src/assets/favicon.png",
    favicon: "./src/assets/favicon.png",
    title: "Support an impact organization",
    template: "./src/index.html",
  },
  output: { distPath: { root: "build" } },
  plugins: [pluginReact()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [postCSSimport(), tailwind()],
      },
    },
  },
});
