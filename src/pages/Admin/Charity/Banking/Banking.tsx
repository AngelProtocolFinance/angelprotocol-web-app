import { ChangeEvent, useCallback, useState } from "react";
import { AccountRequirements } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { debounce } from "helpers";
import CurrencySelector from "./CurrencySelector";
import RecipientDetails from "./RecipientDetails";
import useTypedWiseMutation from "./useTypedWiseMutation";

// TODO: Once recipient is created by filling fields returned using `GET /v1/account-requirements?source=EUR&target=USD&sourceAmount=1000`
// we need to use its recipientID to create a quote `https://docs.wise.com/api-docs/api-reference/quote#create-authenticated`
// and use this quote to get maybe even some other fields, fetched with:
// `GET /v1/quotes/{{quoteId}}/account-requirements`
// `POST /v1/quotes/{{quoteId}}/account-requirements`
// Reason: not all required fields get returned by `GET /v1/account-requirements`, see 4th paragraph in docs:
// https://docs.wise.com/api-docs/api-reference/recipient#account-requirements

export default function Banking() {
  const [targetCurrency, setTargetCurrency] = useState<string>();
  const [sourceAmount, setSourceAmount] = useState<number>();
  const [accountRequirements, setAccountRequirements] =
    useState<AccountRequirements[]>();
  const { createQuote, getAccountRequirements } = useTypedWiseMutation();
  const { handleError } = useErrorContext();

  const handleAccountRequirementsChange = useCallback(
    async (targetCurrency: string, sourceAmount: number): Promise<void> => {
      return createQuote(targetCurrency, sourceAmount)
        .then((quote) => getAccountRequirements(quote.id))
        .then((accReqs) => setAccountRequirements(accReqs))
        .catch((error) => handleError(error));
    },
    [createQuote, getAccountRequirements, handleError]
  );

  const onCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
    setAccountRequirements(undefined);
    if (sourceAmount) {
      handleAccountRequirementsChange(currency, sourceAmount);
    }
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSourceAmount = Number(event.target.value) / 10; // random calculation
    setSourceAmount(newSourceAmount);
    if (targetCurrency) {
      handleAccountRequirementsChange(targetCurrency, newSourceAmount);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <CurrencySelector value={targetCurrency} onChange={onCurrencyChange} />

      <div className="flex flex-col gap-2">
        <label htmlFor="amount">
          What is amount of donations you expect to keep on our platform?
        </label>
        <input
          id="amount"
          type="number"
          onChange={debounce(onAmountChange, 1000)}
          className="field-input"
        />
      </div>

      {!!targetCurrency &&
        !!sourceAmount &&
        (!accountRequirements ? (
          <span>Loading...</span>
        ) : (
          <RecipientDetails
            targetCurrency={targetCurrency}
            accountRequirements={accountRequirements}
          />
        ))}
    </div>
  );
}
