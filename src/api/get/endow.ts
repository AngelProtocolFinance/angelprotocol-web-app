import type { Endow } from "@better-giving/endowment";
import * as v from "valibot";
import { ap, toSearch, ver } from "../api";
import { plusInt } from "../schema/endow-id";
import { segment } from "../schema/segment";

type K = keyof Endow;
type ArrayValues<T extends readonly unknown[]> = T[number];

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
