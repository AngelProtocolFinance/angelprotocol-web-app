import { ChangeEvent, useState } from "react";
import { AccountRequirements } from "./types";
import AccountRequirementsSelector from "./AccountRequirementsSelector";
import CurrencySelector from "./CurrencySelector";
import RecipientDetailsForm from "./RecipientDetailsForm";
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
  const [
    selectedAccountRequirementsIndex,
    setSelectedAccountRequirementsIndex,
  ] = useState<number>();

  const onCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
    setAccountRequirements(undefined);
    setSelectedAccountRequirementsIndex(undefined);
    if (sourceAmount) {
      getAccountRequirementOptions(currency, sourceAmount).then((res) =>
        setAccountRequirements(res)
      );
    }
  };

  const debounceAmountChange = debounce((currency: string, amount: number) => {
    setSourceAmount(amount);
    getAccountRequirementOptions(currency, amount).then((res) =>
      setAccountRequirements(res)
    );
  }, 1000);

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSourceAmount = Number(event.target.value) / 10; // random calculation
    if (targetCurrency) {
      debounceAmountChange(targetCurrency, newSourceAmount);
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
          onChange={onAmountChange}
          value={sourceAmount}
          className="field-input"
        />
      </div>

      {!!targetCurrency &&
        // just check that the debounced amount is defined
        sourceAmount != null && (
          <>
            <AccountRequirementsSelector
              accountRequirements={accountRequirements}
              isLoading={!accountRequirements}
              onChange={(index: number) =>
                setSelectedAccountRequirementsIndex(index)
              }
            />
            {!!accountRequirements &&
              // just check that the index is defined
              selectedAccountRequirementsIndex != null && (
                <RecipientDetailsForm
                  targetCurrency={targetCurrency}
                  accountRequirements={accountRequirements}
                  accountRequirementsIndex={selectedAccountRequirementsIndex}
                />
              )}
          </>
        )}
    </div>
  );
}

const debounce = <T extends (...args: any[]) => ReturnType<T>>(
  callback: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
