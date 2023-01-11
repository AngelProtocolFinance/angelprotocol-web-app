import { useSearchParams } from "react-router-dom";
import { URL_PARAMS } from "./constants";

type Result = {
  hideText: boolean;
  hideAdvOpts: boolean;
  hideEndowGauges: boolean;
  unfoldAdvOpts: boolean;
  liquidPercentage: number;
  availableCurrencies?: string[];
};

export default function useWidgetParams(): Result {
  const [search] = useSearchParams();
  const searchParams = new URLSearchParams(search);

  function get(key: keyof Result): boolean {
    const param = searchParams.get(key);
    return param != null && (param === "" || Boolean(param));
  }

  const result: Result = {
    hideText: get(URL_PARAMS.hideText),
    hideAdvOpts: get(URL_PARAMS.hideAdvancedOptions),
    hideEndowGauges: get(URL_PARAMS.hideEndowmentGauges),
    unfoldAdvOpts: get(URL_PARAMS.unfoldAdvancedOptions),
    liquidPercentage: Number(searchParams.get(URL_PARAMS.liquidPercentage)),
    availableCurrencies: searchParams
      .get(URL_PARAMS.availableCurrencies)
      ?.split(","),
  };

  return result;
}
