import { useCallback } from "react";
import {
  AccountRequirements,
  CreateRecipientRequest,
  EndowmentProfile,
  Quote,
  WiseRequest,
} from "types/aws";
import { invalidateAwsTags } from "services/aws/aws";
import { WISE_REQUESTS } from "../../constants";
import { bank_details_api } from "./bankDetails";

type Result = {
  createQuote: (targetCurrency: string, sourceAmount: number) => Promise<Quote>;
  createRecipientAccount: (
    endowment_id: number,
    request: CreateRecipientRequest
  ) => Promise<any>;
  getAccountRequirements: (quoteId: string) => Promise<AccountRequirements[]>;
  postAccountRequirements: (
    quoteId: string,
    request: CreateRecipientRequest
  ) => Promise<AccountRequirements>;
  state: ReturnType<typeof bank_details_api.useWiseMutation>[1];
};

export function useWiseMutationProxy(): Result {
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
      send<Quote>(WISE_REQUESTS.createQuote(targetCurrency, sourceAmount)),
    [send]
  );

  const createRecipientAccount = useCallback(
    async (
      endowment_id: number,
      request: CreateRecipientRequest
    ): Promise<EndowmentProfile> =>
      send<EndowmentProfile>(
        WISE_REQUESTS.createRecipientAccount(endowment_id, request)
      ).then((res) => {
        invalidateAwsTags(["profile"]);
        return res;
      }),
    [send]
  );

  const getAccountRequirements = useCallback(
    async (quoteId: string): Promise<AccountRequirements[]> =>
      send<AccountRequirements[]>(
        WISE_REQUESTS.getAccountRequirements(quoteId)
      ),
    [send]
  );

  const postAccountRequirements = useCallback(
    async (
      quoteId: string,
      createRecipientRequest: CreateRecipientRequest
    ): Promise<AccountRequirements> =>
      send<AccountRequirements>(
        WISE_REQUESTS.postAccountRequirements(quoteId, createRecipientRequest)
      ),
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
