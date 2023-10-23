import { CreateRecipientRequest } from "./types";
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
  getAccountRequirementsForRoute: (
    targetCurrency: string,
    sourceAmount: number
  ): WiseRequest => ({
    method: "GET",
    url: `/v1/account-requirements?source=USD&target=${targetCurrency}&sourceAmount=${sourceAmount}`,
  }),
  postAccountRequirements: (
    quoteId: string,
    createRecipientRequest: CreateRecipientRequest
  ): WiseRequest => ({
    method: "POST",
    url: `/v1/quotes/${quoteId}/account-requirements`,
    headers: { "Accept-Minor-Version": "1" },
    payload: JSON.stringify(createRecipientRequest),
  }),
} as const;
