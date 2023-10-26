import { useCallback } from "react";
import {
  AccountRequirements,
  CreateRecipientRequest,
  EndowmentProfile,
  Quote,
  WiseCurrency,
  WiseRequest,
} from "types/aws";
import { invalidateAwsTags } from "services/aws/aws";
import { bank_details_api } from "./bankDetails";
import { REQUESTS } from "./constants";

/**
 * Wraps calls to AWS Wise proxy and returns typed responses.
 * @returns object containing all the proxy endpoints + request state
 */
export function useTypedWiseMutation() {
  const [sendRequest, state] = bank_details_api.useWiseMutation();

  const send = useCallback(
    async <T>(request: WiseRequest): Promise<T> => {
      return sendRequest(request)
        .unwrap()
        .then((res) => res as T);
    },
    [sendRequest]
  );

  const createQuote = useCallback(
    (targetCurrency: string, sourceAmount: number): Promise<Quote> =>
      send<Quote>(REQUESTS.createQuote(targetCurrency, sourceAmount)),
    [send]
  );

  const createRecipientAccount = useCallback(
    (
      endowment_id: number,
      request: CreateRecipientRequest
    ): Promise<EndowmentProfile> =>
      send<EndowmentProfile>(
        REQUESTS.createRecipientAccount(endowment_id, request)
      ).then((res) => {
        invalidateAwsTags(["profile"]);
        return res;
      }),
    [send]
  );

  const getAccountRequirements = useCallback(
    (quoteId: string): Promise<AccountRequirements[]> =>
      send<AccountRequirements[]>(REQUESTS.getAccountRequirements(quoteId)),
    [send]
  );

  const getCurrencies = useCallback(
    (): Promise<WiseCurrency[]> =>
      send<WiseCurrency[]>(REQUESTS.getCurrencies()),
    [send]
  );

  const postAccountRequirements = useCallback(
    (
      quoteId: string,
      createRecipientRequest: CreateRecipientRequest
    ): Promise<AccountRequirements> =>
      send<AccountRequirements>(
        REQUESTS.postAccountRequirements(quoteId, createRecipientRequest)
      ),
    [send]
  );

  return {
    createQuote,
    createRecipientAccount,
    getAccountRequirements,
    getCurrencies,
    postAccountRequirements,
    state,
  };
}
