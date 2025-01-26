import type { Endow } from "@better-giving/endowment";
import * as v from "valibot";
import { ap, toSearch, ver } from "../api";
import { plusInt } from "../schema/endow-id";

type K = keyof Endow;
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
  fields?: T,
  throwHttpErrors?: boolean
) {
  const id = v.parse(schema, idParamOrSlug?.toString());
  return ap
    .get<T extends K[] ? Pick<Endow, ArrayValues<T>> : Endow>(
      `${ver(1)}/endowments/${id}`,
      { searchParams: toSearch({ fields: fields?.join() }), throwHttpErrors }
    )
    .json();
}
