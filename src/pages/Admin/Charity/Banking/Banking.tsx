import { useEffect, useState } from "react";
import { AccountRequirements } from "./types";
import useDebouncer from "hooks/useDebouncer";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import CurrencySelector from "./CurrencySelector";
import RecipientDetailsForm from "./RecipientDetailsForm";

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
  const [debouncedSourceAmount] = useDebouncer(sourceAmount, 1000);
  const [accountRequirements, setAccountRequirements] =
    useState<AccountRequirements>();

  useEffect(() => setAccountRequirements(undefined), [targetCurrency]);

  return (
    <div className="flex flex-col gap-5">
      <CurrencySelector
        value={targetCurrency}
        onChange={(currency: string) => setTargetCurrency(currency)}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="amount">
          What is amount of donations you expect to keep on our platform?
        </label>
        {/** random calculation */}
        <input
          id="amount"
          type="number"
          onChange={(e) => setSourceAmount(Number(e.target.value) / 10)}
          className="field-input"
        />
      </div>

      {!!targetCurrency && !!debouncedSourceAmount && (
        <>
          <AccountRequirementsSelector
            targetCurrency={targetCurrency}
            sourceAmount={debouncedSourceAmount}
            onChange={(newAccountRequirements: AccountRequirements) =>
              setAccountRequirements(newAccountRequirements)
            }
          />
          {!!accountRequirements && (
            <RecipientDetailsForm
              targetCurrency={targetCurrency}
              accountRequirements={accountRequirements}
            />
          )}
        </>
      )}
    </div>
  );
}
