import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loader() {
  const script = readFileSync(join(__dirname, "form-embed.js"), "utf-8");
  return new Response(script, {
    headers: {
      "Content-Type": "text/javascript",
      // Cache for 1 hour, but allow stale content for up to 24 hours while revalidating
      // This means users get instant loads while still checking for updates
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
