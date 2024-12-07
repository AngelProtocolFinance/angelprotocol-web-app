import type { MediaPage } from "@better-giving/endowment";
import { ap, ver } from "api/api";
import { plusInt } from "api/schema/endow-id";
import { parse } from "valibot";

export async function featuredMedia(endowIdParam: string | undefined) {
  const id = parse(plusInt, endowIdParam);

  return ap
    .get<MediaPage>(`${ver(1)}/endowments/${id}/media`, {
      searchParams: { featured: true },
    })
    .json()
    .then((data) => data.items);
}
