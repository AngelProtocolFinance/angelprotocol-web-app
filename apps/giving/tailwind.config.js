/** @type {import('tailwindcss').Config} */

const preset = require("../../configs/tailwind.config.js");
module.exports = {
  presets: [preset],
  content: [...preset.content, "apps/giving/src/**/*.{ts,tsx,html}"],
};
