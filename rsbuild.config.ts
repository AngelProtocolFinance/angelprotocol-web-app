import { defineConfig } from "@rsbuild/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  server: { port: 4200 },
  html: {
    appIcon: "./public/favicon.png",
    favicon: "./public/favicon.png",
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
});
