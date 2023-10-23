import { useCallback } from "react";
import { AccountRequirements, CreateRecipientRequest, Quote } from "./types";
import { WiseRequest } from "services/types";
import { useWiseMutation } from "services/aws/aws";
import { WISE_REQUESTS } from "./constants";

type Result = {
  createQuote: (targetCurrency: string, sourceAmount: number) => Promise<Quote>;
  getAccountRequirements: (quoteId: string) => Promise<AccountRequirements[]>;
  postAccountRequirements: (
    quoteId: string,
    createRecipientRequest: CreateRecipientRequest
  ) => Promise<AccountRequirements[]>;
  state: ReturnType<typeof useWiseMutation>[1];
};

export default function useTypedWiseMutation(): Result {
  const [sendRequest, state] = useWiseMutation();

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
    ): Promise<AccountRequirements[]> =>
      send<AccountRequirements[]>(
        WISE_REQUESTS.postAccountRequirements(quoteId, createRecipientRequest)
      ),
    [send]
  );

  return {
    createQuote,
    getAccountRequirements,
    postAccountRequirements,
    state,
  };
}
