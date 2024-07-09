// https://angelgiving.10web.site/wp-json/wp/v2/posts

import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type { Wordpress } from "types/wordpress";

export const handlers = [
  http.get(APIs.wordpress + "/posts", () =>
    HttpResponse.json([] satisfies Wordpress.Post[])
  ),
];
