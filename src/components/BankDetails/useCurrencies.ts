import { useEffect, useState } from "react";
import { useGetCurrenciesMutation } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { EMAIL_SUPPORT } from "constants/env";
import { Currency } from "./WiseCurrencies/CurrencySelector";

const DEFAULT_TARGET_CURRENCY = "USD";

const ERROR_MSG = `Error loading currencies. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}.`;

export default function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [targetCurrency, setTargetCurrency] = useState<Currency>();
  const [isLoading, setLoading] = useState(true);

  const { handleError } = useErrorContext();

  const [getCurrencies] = useGetCurrenciesMutation();

  useEffect(() => {
    (async () => {
      try {
        const wiseCurrencies = await getCurrencies(null).unwrap();

        const selectorCurrencies: Currency[] = wiseCurrencies.map((x) => {
          const currency: Currency = {
            code: x.code,
            name: x.name,
          };
          return currency;
        });

        const newTargetCurrency =
          selectorCurrencies.find((x) => x.code === DEFAULT_TARGET_CURRENCY) ??
          selectorCurrencies[0];

        setTargetCurrency(newTargetCurrency);
        setCurrencies(selectorCurrencies);
      } catch (error) {
        handleError(error, ERROR_MSG);
      } finally {
        setLoading(false);
      }
    })();
  }, [getCurrencies, handleError]);

  return {
    currencies,
    isLoading,
    targetCurrency,
    setTargetCurrency,
  };
}
