import type { Endow } from "@better-giving/endowment";
import type { QueryState } from "types/third-party/redux";
import { useEndowmentQuery } from "./aws";

type ArrayValues<T extends readonly unknown[]> = T[number];

type K = keyof Endow;
export function useEndowment<T extends K[]>(
  id: string | number,
  fields?: T,
  options?: { skip: boolean }
) {
  const query = useEndowmentQuery({ id, fields }, options);

  return query as QueryState<
    T extends K[] ? Pick<Endow, ArrayValues<T>> : Endow
  >;
}
