import { plusInt } from "api/schema/endow-id";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { apiEnv } from "services/constants";
import type { Endowment } from "types/aws";
import * as v from "valibot";

type K = keyof Endowment;
type ArrayValues<T extends readonly unknown[]> = T[number];

const segment = v.pipe(
  v.string(),
  v.trim(),
  v.nonEmpty(),
  //must not be id-like
  v.regex(/^(?!^\d+$)/, "should not be an id"),
  //valid characters
  v.regex(/^[a-zA-Z0-9-._~]+$/, "invalid segment"),
  v.excludes("..", "invalid segment"),
  v.custom((x) => !(x as string).startsWith("."), "invalid segment"),
  v.custom((x) => !(x as string).endsWith("."), "invalid segment")
);

const schema = v.union([plusInt, segment]);

export async function getEndow<T extends K[]>(
  idParamOrSlug: number | string | undefined,
  fields?: T
) {
  const id = v.parse(schema, idParamOrSlug?.toString());
  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);

  if (typeof id === "number") {
    url.pathname = `v10/endowments/${id}`;
  } else {
    //slug
    url.pathname = `v10/endowments`;
    url.searchParams.set("slug", id);
  }

  if (fields && fields.length > 0) {
    url.searchParams.set("fields", fields.join(","));
  }

  return cacheGet(url).then<
    T extends K[] ? Pick<Endowment, ArrayValues<T>> : Endowment
  >((res) => res.json());
}
