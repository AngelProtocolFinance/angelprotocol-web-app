import { ChangeEvent, useEffect, useState } from "react";
import { WiseCurrency } from "types/aws";
import { useWiseMutationProxy } from "services/aws/bankDetails";
import LoaderRing from "components/LoaderRing";
import useDebouncer from "hooks/useDebouncer";
import { isEmpty } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import CurrencySelector, { Currency } from "./CurrencySelector";
import RecipientDetails from "./RecipientDetails";

const ERROR_MSG = `Error loading currencies. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}`;

export default function Banking() {
  const [targetCurrency, setTargetCurrency] = useState<Currency>();
  const [expectedFunds, setExpectedFunds] = useState<number>();
  const [debouncedExpectedFunds] = useDebouncer(expectedFunds, 1000);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const {
    getCurrencies,
    state: { isLoading, isError },
  } = useWiseMutationProxy();

  useEffect(() => {
    const result: WiseCurrency[] = [
      {
        code: "AUD",
        symbol: "A$",
        name: "Australian dollar",
        countryKeywords: ["AUD", "AU", "Australia", "aus"],
        supportsDecimals: true,
      },
      {
        code: "JPY",
        symbol: "¥",
        name: "Japanese yen",
        countryKeywords: ["JPY", "JP", "Japan", "jpn"],
        supportsDecimals: false,
      },
    ];
    const mapped: Currency[] = result.map((x) => ({
      code: x.code,
      name: x.name,
      searchKeywords: x.countryKeywords,
    }));
    const newTargetCurrency =
      mapped.find((x: Currency) => x.code === "USD") ?? mapped[0];

    setCurrencies(mapped);
    setTargetCurrency(newTargetCurrency);
  }, []);

  if (
    // isLoading
    isEmpty(currencies)
  ) {
    return (
      <div className="flex gap-2">
        <LoaderRing thickness={10} classes="w-6" /> Loading...
      </div>
    );
  }

  if (isError || !targetCurrency) {
    return <span>{ERROR_MSG}</span>;
  }

  const handleCurrencyChange = (currency: Currency) => {
    setTargetCurrency(currency);
  };

  const handleFundsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpectedFunds(Number(event.target.value));
  };

  return (
    <div className="grid gap-5 justify-start">
      <CurrencySelector
        value={targetCurrency}
        currencies={currencies}
        onChange={handleCurrencyChange}
      />

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
          targetCurrency={targetCurrency.code}
          expectedFunds={debouncedExpectedFunds}
        />
      )}
    </div>
  );
}
