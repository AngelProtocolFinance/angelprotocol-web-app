import { ChangeEvent, useState } from "react";
import useDebouncer from "hooks/useDebouncer";
import CurrencySelector from "./CurrencySelector";
import RecipientDetails from "./RecipientDetails";

export default function Banking() {
  const [targetCurrency, setTargetCurrency] = useState<string>();
  const [sourceAmount, setSourceAmount] = useState<number>();
  const [debouncedSourceAmount] = useDebouncer(sourceAmount, 1000);

  const onCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSourceAmount(Number(event.target.value)); // random calculation
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
          value={sourceAmount || ""}
          onChange={onAmountChange}
          className="field-input"
        />
      </div>

      {!!targetCurrency && !!debouncedSourceAmount && (
        <RecipientDetails
          key={`${targetCurrency}${debouncedSourceAmount}`}
          targetCurrency={targetCurrency}
          sourceAmount={debouncedSourceAmount}
        />
      )}
    </div>
  );
}
