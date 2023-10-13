import { AccountRequirementsField } from "./types";
import { URLS } from "./constants";

export default async function getAccountRequirementOptions(
  targetCurrency: string,
  sourceAmount = 1000
): Promise<AccountRequirementsField[]> {
  return fetch(`${URLS.rootUrl}${URLS.createQuote.url()}`, {
    method: URLS.createQuote.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sourceCurrency: "USD",
      targetCurrency: targetCurrency,
      sourceAmount: sourceAmount,
    }),
  })
    .then<{ id: string }>((res) => res.json())
    .then((quote) =>
      fetch(`${URLS.rootUrl}${URLS.getAccountRequirements.url(quote.id)}`)
    )
    .then<AccountRequirementsField[]>((res) => res.json());
}
