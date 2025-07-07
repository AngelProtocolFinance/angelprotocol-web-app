import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type { TokenV2 } from "types/components";
import type { DBCurrency, UserCurrencies } from "types/currency";

export const mockTokens: TokenV2[] = [
  {
    name: "Sample Token 1",
    code: "STK1",
    id: "1",
    logo: "https://example.com/sample-token-1-logo.png",
    precision: 18,
    network: "",
    cg_id: "",
    color: "",
    symbol: "",
  },
  {
    name: "Sample Token 2",
    code: "STK2",
    id: "2",
    logo: "https://example.com/sample-token-2-logo.png",
    precision: 18,
    network: "",
    cg_id: "",
    color: "",
    symbol: "",
  },
];

export const mock_usd: DBCurrency = {
  code: "USD",
  rate: 1,
  min: 1,
};
const mockCurrencies: DBCurrency[] = [
  { code: "USD", rate: 1, min: 1 },
  { code: "EUR", rate: 0.92, min: 0.92 },
  { code: "GBP", rate: 0.79, min: 0.79 },
];

export const endpoints = {
  tokens: `${APIs.apes}/v1/tokens/:chainId`,
  fiatCurrencies: `api/currencies`,
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
    return HttpResponse.json(mockTokens);
  }),

  http.get(endpoints.fiatCurrencies, () => {
    const data: UserCurrencies = { all: mockCurrencies };
    return HttpResponse.json(data);
  }),
];
