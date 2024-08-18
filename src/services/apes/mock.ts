import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import type { Currency, FiatCurrencyData } from "types/aws/apes/donation";
import type { TokenV2 } from "types/components";

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
  },
];

export const mockPhpCurrency: Currency = {
  currency_code: "PHP",
  rate: 50,
  minimum_amount: 50,
};
const mockCurrencies: Currency[] = [
  { currency_code: "USD", rate: 1, minimum_amount: 1 },
  { currency_code: "EUR", rate: 0.92, minimum_amount: 0.92 },
  { currency_code: "GBP", rate: 0.79, minimum_amount: 0.79 },
];

export const endpoints = {
  tokens: `${APIs.apes}/v1/tokens/:chainId`,
  fiatCurrencies: `${APIs.apes}/fiat-currencies`,
};

export const fiatCurrenciesErrorHandler = http.get(
  endpoints.fiatCurrencies,
  () => HttpResponse.error()
);

export const fiatDonationIntentCreationErrorHandler = http.post(
  `${APIs.apes}/fiat-donation/stripe`,
  () => HttpResponse.error()
);

export const handlers = [
  http.get(`${APIs.apes}/top-countries`, () => {
    return HttpResponse.json([] satisfies string[]);
  }),
  http.get(endpoints.tokens, () => {
    return HttpResponse.json(mockTokens);
  }),

  http.get(endpoints.fiatCurrencies, ({ request }) => {
    const url = new URL(request.url);
    const prefCode = url.searchParams.get("prefCode");

    const data: FiatCurrencyData = {
      default: prefCode ? mockPhpCurrency : mockCurrencies[0],
      currencies: mockCurrencies,
    };
    return HttpResponse.json(data);
  }),

  http.post(`${APIs.apes}/fiat-donation/stripe`, () => {
    return HttpResponse.json({
      //stripe.Element is mocked and doesn't need real intent id
      clientSecret: "fake_intent_id",
    });
  }),
];
