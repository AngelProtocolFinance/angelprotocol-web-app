import type { Fetcher } from "swr";
import useSWR from "swr/immutable";
import type {
  AccountRequirements,
  CreateRecipientRequest,
  Quote,
} from "types/bank-details";

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
  const quote_payload = {
    sourceCurrency: "USD",
    targetCurrency: input.currency,
    sourceAmount: input.amount,
  };

  const quote = await fetch(`/api/wise/v3/profiles/{{profileId}}/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote_payload),
  }).then<Quote>((res) => {
    return res.json();
  });

  const requirements = await fetch(
    `/api/wise/v1/quotes/${quote.id}/account-requirements`,
    { headers: { "Accept-Minor-Version": "1" } }
  ).then<AccountRequirements[]>((res) => res.json());

  return { requirements, quoteId: quote.id };
};

export function use_requirements(args: Input | null) {
  const req = useSWR(args, requirements);

  async function update_requirements(payload: ReqUpdateInput) {
    const res = await fetch(
      `/api/wise/v1/quotes/${payload.quoteId}/account-requirements`,
      {
        headers: {
          "Accept-Minor-Version": "1",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.request),
        method: "POST",
      }
    );

    if (!res.ok) return;

    req.mutate(
      { quoteId: payload.quoteId, requirements: reqs },
      { revalidate: false }
    );
  }

  return { req, update_requirements };
}
