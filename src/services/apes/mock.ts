import type { IToken } from "@better-giving/assets/tokens";
import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type { ICurrenciesFv, ICurrencyFv } from "types/currency";

export const mock_tokens: IToken[] = [
  {
    id: "1",
    code: "BTC",
    name: "Bitcoin",
    symbol: "BTC",
    precision: 8,
    logo: "/images/coins/btc.svg",
    network: "btc",
    color: "#f6931a",
    cg_id: "bitcoin",
  },
  {
    id: "15",
    code: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    precision: 8,
    logo: "/images/coins/eth.svg",
    network: "eth",
    color: "#131313",
    cg_id: "ethereum",
  },
];

export const mock_usd: ICurrencyFv = {
  code: "USD",
  rate: 1,
  min: 1,
};
const mockCurrencies: ICurrencyFv[] = [
  { code: "USD", rate: 1, min: 1 },
  { code: "EUR", rate: 0.92, min: 0.92 },
  { code: "GBP", rate: 0.79, min: 0.79 },
];

export const endpoints = {
  tokens: `${APIs.apes}/v1/tokens/:chainId`,
  fiatCurrencies: "api/currencies",
};

export const fiatCurrenciesErrorHandler = http.get(
  endpoints.fiatCurrencies,
  () => HttpResponse.error()
);

export const handlers = [
  http.get(`${APIs.apes}/top-countries`, () => {
    return HttpResponse.json([] satisfies string[]);
  }),
  http.get(endpoints.tokens, () => {
    return HttpResponse.json(mock_tokens);
  }),

  http.get(endpoints.fiatCurrencies, () => {
    const data: ICurrenciesFv = { all: mockCurrencies };
    return HttpResponse.json(data);
  }),
];
