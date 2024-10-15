import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { apiEnv } from "services/constants";
import type { Endowment } from "types/aws";

type K = keyof Endowment;
type ArrayValues<T extends readonly unknown[]> = T[number];

export async function getEndow<T extends K[]>(
  id: number | { slug: string },
  fields?: T
) {
  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);

  if (typeof id === "number") {
    url.pathname = `v10/endowments/${id}`;
  } else {
    //slug
    url.pathname = `v10/endowments`;
    url.searchParams.set("slug", id.slug);
  }

  if (fields && fields.length > 0) {
    url.searchParams.set("fields", fields.join(","));
  }

  return cacheGet(url).then<
    T extends K[] ? Pick<Endowment, ArrayValues<T>> : Endowment
  >((res) => res.json());
}
