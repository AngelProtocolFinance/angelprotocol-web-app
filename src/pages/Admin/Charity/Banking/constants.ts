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
  createRecipientAccount: (
    endowment_id: number,
    request: CreateRecipientRequest
  ): WiseRequest => ({
    method: "POST",
    url: "/v1/accounts",
    endowment_id,
    payload: JSON.stringify(request),
  }),
  getAccountRequirements: (quoteId: string): WiseRequest => ({
    method: "GET",
    url: `/v1/quotes/${quoteId}/account-requirements`,
    headers: { "Accept-Minor-Version": "1" },
  }),
  postAccountRequirements: (
    quoteId: string,
    request: CreateRecipientRequest
  ): WiseRequest => ({
    method: "POST",
    url: `/v1/quotes/${quoteId}/account-requirements`,
    headers: { "Accept-Minor-Version": "1" },
    payload: JSON.stringify(request),
  }),
} as const;
