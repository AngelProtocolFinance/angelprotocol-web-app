import { AccountRequirements } from "./types";
import { URLS } from "./constants";

export default async function getAccountRequirementOptions(
  targetCurrency: string,
  sourceAmount = 10000
): Promise<AccountRequirements[]> {
  return (
    // fetch(`${URLS.rootUrl}${URLS.createQuote.url()}`, {
    //   method: URLS.createQuote.method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.REACT_APP_WISE_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     sourceCurrency: "USD",
    //     targetCurrency: targetCurrency,
    //     sourceAmount: sourceAmount,
    //   }),
    // })
    //   .then<{ id: string }>((res) => res.json())
    //   .then((quote) => {
    //     console.log("getQuote", JSON.stringify(quote, undefined, 2));
    //     return fetch(
    //       `${URLS.rootUrl}${URLS.getAccountRequirements.url(quote.id)}`,
    //       {
    //         method: URLS.getAccountRequirements.method,
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${process.env.REACT_APP_WISE_API_KEY}`,
    //           "Accept-Minor-Version": "1",
    //         },
    //       }
    //     );
    //   })
    fetch(
      `${URLS.rootUrl}${URLS.getAccountRequirementsForRoute.url(
        targetCurrency,
        sourceAmount
      )}`,
      {
        method: URLS.getAccountRequirementsForRoute.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then<AccountRequirements[]>((res) => res.json())
  );
}
