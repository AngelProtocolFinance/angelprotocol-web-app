import useSWR from "swr/immutable";
import type { WiseCurrency } from "types/bank-details";
import type { QueryState, WiseCurrencyOption } from "types/components";

async function get_currencies(path: string) {
  return fetch(path)
    .then<WiseCurrency[]>((res) => res.json())
    .then((data) =>
      data.map<WiseCurrencyOption>((r) => ({
        rate: null,
        code: r.code,
        name: r.name,
      }))
    );
}

export function use_currencies(): QueryState<WiseCurrencyOption[]> {
  const { data, isLoading, isValidating, error } = useSWR(
    `/api/wise/v1/currencies`,
    get_currencies
  );
  return { data, isLoading, isFetching: isValidating, isError: !!error, error };
}
