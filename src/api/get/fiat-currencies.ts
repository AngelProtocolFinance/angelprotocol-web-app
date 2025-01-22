import type { FiatCurrencyData } from "types/aws";
import type { DetailedCurrency } from "types/components";
import { apesUrl } from "../api";

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

export async function getFiatCurrencies(prefCode: "none" | (string & {})) {
  const url = new URL(`${apesUrl}/fiat-currencies`);
  if (prefCode !== "none") url.searchParams.set("prefCode", prefCode);
  const res = await fetch(url);
  if (!res.ok) throw res;
  const data: FiatCurrencyData = await res.json();

  return {
    all: data.currencies.map((c) => toDetailed(c)),
    main: data.default && toDetailed(data.default),
  } satisfies FiatCurrencies;
}
