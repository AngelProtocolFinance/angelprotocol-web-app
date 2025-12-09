import type { LoaderFunction } from "react-router";
import script from "./form-embed.js?raw";

export const loader: LoaderFunction = () => {
  return new Response(script, {
    headers: {
      "Content-Type": "text/javascript",
      // Cache for 1 hour, but allow stale content for up to 24 hours while revalidating
      // This means users get instant loads while still checking for updates
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
