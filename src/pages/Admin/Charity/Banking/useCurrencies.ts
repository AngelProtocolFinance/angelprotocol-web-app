import { useEffect, useState } from "react";
import { useGetCurrenciesMutation } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { EMAIL_SUPPORT } from "constants/env";
import { Currency } from "./CurrencySelector";

const ERROR_MSG = `Error loading currencies. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}.`;

export default function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { handleError } = useErrorContext();

  const [
    ,
    // getCurrencies
    { isError },
  ] = useGetCurrenciesMutation();

  useEffect(() => {
    (async () => {
      try {
        // TODO: uncomment once Wise API token is working
        // const wiseCurrencies = await getCurrencies();

        // placeholder until Wise API token is fixed
        const wiseCurrencies = [
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

        const selectorCurrencies: Currency[] = wiseCurrencies.map((x) => {
          const currency: Currency = {
            code: x.code,
            name: x.name,
          };
          return currency;
        });

        setCurrencies(selectorCurrencies);
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
    isError,
    isLoading,
  };
}
