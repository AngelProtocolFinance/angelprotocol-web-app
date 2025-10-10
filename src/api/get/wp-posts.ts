import { wp, wp_base_url } from "api/wp";
import { http, HttpResponse } from "msw";
import type { IPost } from "types/wordpress";

export const posts = async (page: number): Promise<[IPost[], number]> => {
  const res = await wp((x, p) => {
    x.pathname = p("posts");
    x.searchParams.set("page", page.toString());
    return x;
  });

  const total = +(res.headers.get("x-wp-total") ?? "0");
  return [await res.json(), total] as const;
};

export const posts_mock = http.get(`${wp_base_url}/wp-json/wp/v2/posts`, () =>
  HttpResponse.json([] satisfies IPost[])
);
