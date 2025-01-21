import cc from "vanilla-cookieconsent/dist/cookieconsent.umd.js?raw"; // Make sure to specify the full path
export const config = { runtime: "edge" };
export const loader = async () => {
  return new Response(cc, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, s-max-age=31536000",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
