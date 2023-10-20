import { ChangeEvent, useState } from "react";
import { AccountRequirements } from "./types";
import { debounce } from "helpers";
import CurrencySelector from "./CurrencySelector";
import RecipientDetails from "./RecipientDetails";
import getAccountRequirementOptions from "./getAccountRequirementOptions";

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

  const onCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
    setAccountRequirements(undefined);
    if (sourceAmount) {
      getAccountRequirementOptions(currency, sourceAmount).then((res) =>
        setAccountRequirements(res)
      );
    }
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSourceAmount = Number(event.target.value) / 10; // random calculation
    setSourceAmount(newSourceAmount);
    if (targetCurrency) {
      getAccountRequirementOptions(targetCurrency, newSourceAmount).then(
        (res) => setAccountRequirements(res)
      );
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
