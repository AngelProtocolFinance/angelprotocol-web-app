import type { MediaPage } from "@better-giving/endowment";
import { plusInt } from "api/schema/endow-id";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { version } from "services/helpers";
import { parse } from "valibot";

export async function featuredMedia(endowIdParam: string | undefined) {
  const id = parse(plusInt, endowIdParam);
  const url = new URL(APIs.aws);
  url.pathname = `${version(1)}/endowments/${id}/media`;
  url.searchParams.set("featured", "true");
  return cacheGet(url)
    .then<MediaPage>((res) => res.json())
    .then((data) => data.items);
}
