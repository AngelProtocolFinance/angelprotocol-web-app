import { useEffect, useState } from "react";
import { useWiseMutationProxy } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import useDebouncer from "hooks/useDebouncer";
import { logger } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import { Currency } from "./CurrencySelector";

const DEFAULT_TARGET_CURRENCY = "USD";
const ERROR_MSG = `Error loading currencies. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}.`;

export default function useBanking() {
  const [targetCurrency, setTargetCurrency] = useState<Currency>();
  const [expectedFunds, setExpectedFunds] = useState<number>();
  const [debouncedExpectedFunds] = useDebouncer(expectedFunds, 1000);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { handleError } = useErrorContext();

  const {
    getCurrencies,
    state: { isError },
  } = useWiseMutationProxy();

  useEffect(() => {
    (async () => {
      try {
        const wiseCurrencies = await getCurrencies();

        const selectorCurrencies: Currency[] = wiseCurrencies.map((x) => ({
          code: x.code,
          name: x.name,
          searchKeywords: x.countryKeywords,
        }));

        let newTargetCurrency = selectorCurrencies.find(
          (x) => x.code === DEFAULT_TARGET_CURRENCY
        );
        // if DEFAULT_TARGET_CURRENCY is not among the returned currencies for whatever reason, log the error
        if (!newTargetCurrency) {
          logger.error(
            `${DEFAULT_TARGET_CURRENCY} not among the currencies returned by Wise API`
          );
          newTargetCurrency = selectorCurrencies[0];
        }

        setCurrencies(selectorCurrencies);
        setTargetCurrency(newTargetCurrency);
        setLoading(false);
      } catch (error) {
        handleError(error, ERROR_MSG);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
