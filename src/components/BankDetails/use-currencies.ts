import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import useSWR from "swr";
import type { WiseCurrency } from "types/aws";
import type { Currency, QueryState } from "types/components";

async function getCurencies(endpoint: string) {
  return fetch(endpoint)
    .then<WiseCurrency[]>((res) => res.json())
    .then((data) =>
      data.map<Currency>((r) => ({ rate: null, code: r.code, name: r.name }))
    );
}

export function useCurrencies(): QueryState<Currency[]> {
  const { data, isLoading, isValidating, error } = useSWR(
    `${APIs.aws}/${v(1)}/wise-proxy/v1/currencies`,
    getCurencies,
    { revalidateOnFocus: false }
  );
  return { data, isLoading, isFetching: isValidating, isError: !!error, error };
}
