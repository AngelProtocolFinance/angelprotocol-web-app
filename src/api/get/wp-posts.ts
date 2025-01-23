import { http, HttpResponse } from "msw";
import type { Wordpress } from "types/wordpress";
import { wp, wpUrl } from "../api";

export const posts = async (
  page: number
): Promise<[Wordpress.Post[], number]> => {
  const res = await wp.get<Wordpress.Post[]>("posts", {
    searchParams: { page },
  });
  const total = +(res.headers.get("X-Wp-Total") ?? "0");
  return [await res.json(), total] as const;
};

export const postsMock = http.get(wpUrl + "/posts", () =>
  HttpResponse.json([] satisfies Wordpress.Post[])
);
