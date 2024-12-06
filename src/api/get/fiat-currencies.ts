import { ENVIRONMENT } from "constants/env";
import { APIs } from "constants/urls";
import { bgCookies, getCookie, setCookie } from "helpers/cookie";
import type { UserV2 } from "types/auth";
import type { FiatCurrencyData } from "types/aws";
import type { DetailedCurrency } from "types/components";

const toDetailed = (
  input: FiatCurrencyData["currencies"][number]
): DetailedCurrency => ({
  code: input.currency_code,
  rate: input.rate,
  min: input.minimum_amount,
});

export interface FiatCurrencies {
  all: DetailedCurrency[];
  main?: DetailedCurrency;
}

export async function getFiatCurrencies(user?: UserV2) {
  const url = new URL(APIs.apes);
  url.pathname = `${ENVIRONMENT}/fiat-currencies`;
  const prefCode = user?.currency ?? getCookie(bgCookies.prefCode);

  if (prefCode) {
    url.searchParams.set("prefCode", prefCode);
  }
  return fetch(url)
    .then<FiatCurrencyData>((res) => res.json())
    .then((data) => {
      if (data.default) {
        setCookie(bgCookies.prefCode, data.default.currency_code.toUpperCase());
      }
      return {
        all: data.currencies.map((c) => toDetailed(c)),
        main: data.default && toDetailed(data.default),
      } satisfies FiatCurrencies;
    });
}
