import type { Fetcher } from "types/api";

export const wp_base_url = "https://angelgiving.10web.site";
export const wp: Fetcher = async (url_fn, init_fn) => {
  const x = new URL(wp_base_url);
  const h = new Headers({
    accept: "application/json",
  });
  const u = url_fn(x, (p) => `wp-json/wp/v2/${p}`);
  const res = fetch(u, init_fn?.(h) || { headers: h });
  return res;
};
