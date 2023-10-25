import { ChangeEvent, useState } from "react";
import useDebouncer from "hooks/useDebouncer";
import CurrencySelector from "./CurrencySelector";
import RecipientDetails from "./RecipientDetails";

export default function Banking() {
  const [targetCurrency, setTargetCurrency] = useState<string>();
  const [expectedFunds, setExpectedFunds] = useState<number>();
  const [debouncedExpectedFunds] = useDebouncer(expectedFunds, 1000);

  const onCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
  };

  const handleFundsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpectedFunds(Number(event.target.value));
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
          value={expectedFunds || ""}
          onChange={handleFundsChange}
          className="field-input"
        />
      </div>

      {!!targetCurrency && !!debouncedExpectedFunds && (
        <RecipientDetails
          // we need this key to tell React that when any of the fields passed to this component changes,
          // it needs to rerender the whole component and thus reset its state
          key={`${targetCurrency}${debouncedExpectedFunds}`}
          targetCurrency={targetCurrency}
          expectedFunds={debouncedExpectedFunds}
        />
      )}
    </div>
  );
}
