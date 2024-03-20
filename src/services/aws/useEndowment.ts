import { IdOrSlug } from "services/types";
import { Endowment } from "types/aws";
import { QueryState } from "types/third-party/redux";
import { useEndowmentQuery } from "./aws";

type ArrayValues<T extends readonly unknown[]> = T[number];

type K = keyof Endowment;
export function useEndowment<T extends K[]>(
  idOrSlug: IdOrSlug,
  fields?: T,
  options?: { skip: boolean }
) {
  const query = useEndowmentQuery(
    {
      ...idOrSlug,
      fields,
    },
    options
  );

  return query as QueryState<
    T extends K[] ? Pick<Endowment, ArrayValues<T>> : Endowment
  >;
}
