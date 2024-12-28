import { ap, ver } from "api/api";
import useSWR from "swr/immutable";
import type { WiseCurrency } from "types/aws";
import type { Currency, QueryState } from "types/components";

async function getCurencies(path: string) {
  return ap
    .get<WiseCurrency[]>(path)
    .json()
    .then((data) =>
      data.map<Currency>((r) => ({ rate: null, code: r.code, name: r.name }))
    );
}

export function useCurrencies(): QueryState<Currency[]> {
  const { data, isLoading, isValidating, error } = useSWR(
    `${ver(1)}/wise-proxy/v1/currencies`,
    getCurencies
  );
  return { data, isLoading, isFetching: isValidating, isError: !!error, error };
}
