import { WiseRequest } from "services/types";

export const WISE_REQUESTS = {
  createQuote: (targetCurrency: string, sourceAmount: number): WiseRequest => ({
    method: "POST",
    url: "/v3/profiles/{{profileId}}/quotes",
    payload: JSON.stringify({
      sourceCurrency: "USD",
      targetCurrency,
      sourceAmount,
    }),
  }),
  getAccountRequirements: (quoteId: string): WiseRequest => ({
    method: "GET",
    url: `/v1/quotes/${quoteId}/account-requirements`,
    headers: { "Accept-Minor-Version": "1" },
  }),
  postAccountRequirements: (quoteId: string): WiseRequest => ({
    method: "POST",
    url: `/v1/quotes/${quoteId}/account-requirements`,
    headers: { "Accept-Minor-Version": "1" },
  }),
} as const;
