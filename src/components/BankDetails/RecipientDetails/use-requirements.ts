import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import useSWR, { type Fetcher } from "swr";
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

const base = `${APIs.aws}/${v(1)}/wise-proxy`;

const requirements: Fetcher<
  RequirementsOutput,
  [string, Input] | null
> = async ([base, input]) => {
  const quotePayload = {
    sourceCurrency: "USD",
    targetCurrency: input.currency,
    sourceAmount: input.amount,
  };
  const quoteRes = await fetch(`${base}/v3/profiles/{{profileId}}/quotes`, {
    method: "POST",
    body: JSON.stringify(quotePayload),
    headers: { "content-type": "application/json" },
  });
  if (!quoteRes.ok) throw quoteRes;

  const quote: Quote = await quoteRes.json();

  const requirementsRes = await fetch(
    `${base}/v1/quotes/${quote.id}/account-requirements`,
    { headers: { "Accept-Minor-Version": "1" } }
  );

  if (!requirementsRes.ok) throw requirementsRes;

  const requirements: AccountRequirements[] = await requirementsRes.json();

  return { requirements, quoteId: quote.id };
};

export function useRequirements(args: Input | null) {
  const req = useSWR(args && [base, args], requirements, {
    revalidateOnFocus: false,
  });

  async function updateRequirements(payload: ReqUpdateInput) {
    const res = await fetch(
      `${base}/v1/quotes/${payload.quoteId}/account-requirements`,
      {
        headers: {
          "Accept-Minor-Version": "1",
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload.request),
      }
    );
    if (!res.ok) return;
    const reqs: AccountRequirements[] = await res.json();
    req.mutate({ quoteId: payload.quoteId, requirements: reqs });
  }

  return { req, updateRequirements };
}
