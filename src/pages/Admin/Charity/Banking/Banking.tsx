import { ChangeEvent, useState } from "react";
import { debounce } from "helpers";
import CurrencySelector from "./CurrencySelector";
import RecipientDetails from "./RecipientDetails";

export default function Banking() {
  const [targetCurrency, setTargetCurrency] = useState<string>();
  const [sourceAmount, setSourceAmount] = useState<number>();

  const onCurrencyChange = (currency: string) => {
    setTargetCurrency(currency);
  };

  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSourceAmount(Number(event.target.value) / 10); // random calculation
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

      {!!targetCurrency && !!sourceAmount && (
        <RecipientDetails
          key={`${targetCurrency}${sourceAmount}`}
          targetCurrency={targetCurrency}
          sourceAmount={sourceAmount}
        />
      )}
    </div>
  );
}
