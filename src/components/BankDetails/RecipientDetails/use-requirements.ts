import { wise } from "api/api";
import type { Fetcher } from "swr";
import useSWR from "swr/immutable";
import type {
  AccountRequirements,
  CreateRecipientRequest,
  Quote,
} from "types/aws";

interface Input {
  amount: number;
  currency: string;
}
interface RequirementsOutput {
  requirements: AccountRequirements[];
  quoteId: string;
}

interface ReqUpdateInput {
  quoteId: string;
  request: CreateRecipientRequest;
  amount: number;
  currency: string;
}

const requirements: Fetcher<RequirementsOutput, Input | null> = async (
  input
) => {
  const quotePayload = {
    sourceCurrency: "USD",
    targetCurrency: input.currency,
    sourceAmount: input.amount,
  };

  const quote = await wise
    .post<Quote>(`v3/profiles/{{profileId}}/quotes`, {
      json: quotePayload,
    })
    .json();

  const requirements = await wise
    .get<AccountRequirements[]>(`v1/quotes/${quote.id}/account-requirements`, {
      headers: { "Accept-Minor-Version": "1" },
    })
    .json();

  return { requirements, quoteId: quote.id };
};

export function useRequirements(args: Input | null) {
  const req = useSWR(args, requirements);

  async function updateRequirements(payload: ReqUpdateInput) {
    const reqs = await wise
      .post<AccountRequirements[]>(
        `v1/quotes/${payload.quoteId}/account-requirements`,
        {
          headers: { "Accept-Minor-Version": "1" },
          json: payload.request,
        }
      )
      .json();

    req.mutate({ quoteId: payload.quoteId, requirements: reqs });
  }

  return { req, updateRequirements };
}
