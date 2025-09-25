import { http, HttpResponse } from "msw";
import type { IPost } from "types/wordpress";
import { wp, wpUrl } from "../api";

export const posts = async (page: number): Promise<[IPost[], number]> => {
  const res = await wp.get<IPost[]>("posts", {
    searchParams: { page },
  });
  const total = +(res.headers.get("x-wp-total") ?? "0");
  return [await res.json(), total] as const;
};

export const postsMock = http.get(`${wpUrl}/posts`, () =>
  HttpResponse.json([] satisfies IPost[])
);
