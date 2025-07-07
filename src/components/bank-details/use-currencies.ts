import { ap, ver } from "api/api";
import useSWR from "swr/immutable";
import type { WiseCurrency } from "types/bank-details";
import type { QueryState, WiseCurrencyOption } from "types/components";

async function getCurencies(path: string) {
  return ap
    .get<WiseCurrency[]>(path)
    .json()
    .then((data) =>
      data.map<WiseCurrencyOption>((r) => ({
        rate: null,
        code: r.code,
        name: r.name,
      }))
    );
}

export function useCurrencies(): QueryState<WiseCurrencyOption[]> {
  const { data, isLoading, isValidating, error } = useSWR(
    `${ver(1)}/wise-proxy/v1/currencies`,
    getCurencies
  );
  return { data, isLoading, isFetching: isValidating, isError: !!error, error };
}
