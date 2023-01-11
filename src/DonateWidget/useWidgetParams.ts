import { useSearchParams } from "react-router-dom";
import { UrlParamValues } from "./types";
import { URL_PARAMS } from "./constants";

export default function useWidgetParams(): UrlParamValues {
  const [search] = useSearchParams();
  const searchParams = new URLSearchParams(search);

  function get(key: keyof UrlParamValues): boolean {
    const param = searchParams.get(key);
    return param != null && (param === "" || Boolean(param));
  }

  const result: UrlParamValues = {
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
