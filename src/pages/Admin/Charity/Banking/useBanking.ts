import { useEffect, useState } from "react";
import { useWiseMutationProxy } from "services/aws/bankDetails";
import useDebouncer from "hooks/useDebouncer";
import { logger } from "helpers";
import { Currency } from "./CurrencySelector";

const DEFAULT_TARGET_CURRENCY = "USD";

export default function useBanking() {
  const [targetCurrency, setTargetCurrency] = useState<Currency>();
  const [expectedFunds, setExpectedFunds] = useState<number>();
  const [debouncedExpectedFunds] = useDebouncer(expectedFunds, 1000);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const {
    getCurrencies,
    state: { isLoading, isError },
  } = useWiseMutationProxy();

  useEffect(() => {
    (async () => {
      const wiseCurrencies = await getCurrencies();

      const selectorCurrencies: Currency[] = wiseCurrencies.map((x) => ({
        code: x.code,
        name: x.name,
        searchKeywords: x.countryKeywords,
      }));

      let newTargetCurrency = selectorCurrencies.find(
        (x) => x.code === DEFAULT_TARGET_CURRENCY
      );
      // if USD is not among the returned currencies for whatever reason, log the error
      if (!newTargetCurrency) {
        logger.error("USD not among the currencies returned by Wise API");
        newTargetCurrency = selectorCurrencies[0];
      }

      setCurrencies(selectorCurrencies);
      setTargetCurrency(newTargetCurrency);
    })();
  }, [getCurrencies]);

  return {
    currencies,
    debouncedExpectedFunds,
    isError,
    isLoading,
    targetCurrency,
    setExpectedFunds,
    setTargetCurrency,
  };
}
