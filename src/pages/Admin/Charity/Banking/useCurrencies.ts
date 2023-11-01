import { useEffect, useState } from "react";
// import { useGetCurrenciesMutation } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import { EMAIL_SUPPORT } from "constants/env";
import { Currency } from "./CurrencySelector";

const ERROR_MSG = `Error loading currencies. Please try again later. If the error persists, please contact ${EMAIL_SUPPORT}.`;

export default function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setLoading] = useState(true);

  const { handleError } = useErrorContext();

  // const [ getCurrencies] = useGetCurrenciesMutation();

  useEffect(() => {
    (async () => {
      try {
        // TODO: uncomment once Wise API token is working
        // const wiseCurrencies = await getCurrencies();

        // placeholder until Wise API token is fixed
        const wiseCurrencies = [
          {
            code: "AED",
            symbol: "د.إ",
            name: "United Arab Emirates dirham",
            countryKeywords: ["AED", "AE", "are", "United Arab Emirates"],
            supportsDecimals: true,
          },
          {
            code: "AFN",
            symbol: "؋",
            name: "Afghanistan afghani",
            countryKeywords: ["Afghanistan", "afg", "AF", "AFN"],
            supportsDecimals: true,
          },
          {
            code: "ALL",
            symbol: "Lek",
            name: "Albanian lek",
            countryKeywords: ["ALL", "alb", "AL", "Albania"],
            supportsDecimals: true,
          },
          {
            code: "AMD",
            symbol: "֏",
            name: "Armenian dram",
            countryKeywords: ["Armenia", "AMD", "AM", "arm"],
            supportsDecimals: true,
          },
          {
            code: "ANG",
            symbol: "ƒ",
            name: "Netherlands Antillean guilder",
            countryKeywords: [
              "Sint Maarten (Dutch part)",
              "CW",
              "cuw",
              "SX",
              "ant",
              "Netherlands Antilles",
              "sxm",
              "ANG",
              "Curaçao",
              "AN",
            ],
            supportsDecimals: true,
          },
          {
            code: "AOA",
            symbol: "Kz",
            name: "Angolan kwanza",
            countryKeywords: ["AOA", "Angola", "ago", "AO"],
            supportsDecimals: true,
          },
          {
            code: "ARS",
            symbol: "$",
            name: "Argentine peso",
            countryKeywords: ["AR", "ARS", "Argentina", "arg"],
            supportsDecimals: true,
          },
          {
            code: "AUD",
            symbol: "A$",
            name: "Australian dollar",
            countryKeywords: [
              "TV",
              "NR",
              "HM",
              "Christmas Island",
              "cck",
              "Kiribati",
              "AUD",
              "tuv",
              "Cocos (Keeling) Islands",
              "kir",
              "cxr",
              "KI",
              "CC",
              "Heard Island and McDonald Islands",
              "Tuvalu",
              "Norfolk Island",
              "nru",
              "nfk",
              "AU",
              "CX",
              "NF",
              "Australia",
              "Nauru",
              "aus",
              "hmd",
            ],
            supportsDecimals: true,
          },
          {
            code: "AWG",
            symbol: "AWG",
            name: "Aruban florin",
            countryKeywords: ["AWG", "AW", "abw", "Aruba"],
            supportsDecimals: true,
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
    isLoading,
  };
}
