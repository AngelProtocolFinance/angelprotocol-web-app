import { useCallback } from "react";
import {
  AccountRequirements,
  CreateRecipientRequest,
  EndowmentProfile,
  Quote,
  WiseRequest,
} from "types/aws";
import { invalidateAwsTags } from "services/aws/aws";
import { bank_details_api } from "./bankDetails";

export function useWiseMutationProxy() {
  const [sendRequest, state] = bank_details_api.useWiseMutation();

  const send = useCallback(
    async function <T>(request: WiseRequest): Promise<T> {
      return sendRequest(request)
        .unwrap()
        .then((res) => res as T);
    },
    [sendRequest]
  );

  const createQuote = useCallback(
    async (targetCurrency: string, sourceAmount: number): Promise<Quote> =>
      send<Quote>({
        method: "POST",
        url: "/v3/profiles/{{profileId}}/quotes",
        payload: JSON.stringify({
          sourceCurrency: "USD",
          targetCurrency,
          sourceAmount,
        }),
      }),
    [send]
  );

  const createRecipientAccount = useCallback(
    async (
      endowment_id: number,
      request: CreateRecipientRequest
    ): Promise<EndowmentProfile> =>
      send<EndowmentProfile>({
        method: "POST",
        url: "/v1/accounts",
        endowment_id,
        payload: JSON.stringify(request),
      }).then((res) => {
        invalidateAwsTags(["profile"]);
        return res;
      }),
    [send]
  );

  const getAccountRequirements = useCallback(
    async (quoteId: string): Promise<AccountRequirements[]> =>
      send<AccountRequirements[]>({
        method: "GET",
        url: `/v1/quotes/${quoteId}/account-requirements`,
        headers: { "Accept-Minor-Version": "1" },
      }),
    [send]
  );

  const postAccountRequirements = useCallback(
    async (
      quoteId: string,
      request: CreateRecipientRequest
    ): Promise<AccountRequirements> =>
      send<AccountRequirements>({
        method: "POST",
        url: `/v1/quotes/${quoteId}/account-requirements`,
        headers: { "Accept-Minor-Version": "1" },
        payload: JSON.stringify(request),
      }),
    [send]
  );

  return {
    createQuote,
    createRecipientAccount,
    getAccountRequirements,
    postAccountRequirements,
    state,
  };
}
