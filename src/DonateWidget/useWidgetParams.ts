import { useSearchParams } from "react-router-dom";
import { UrlParamValues } from "./types";
import { URL_PARAMS } from "./constants";

export default function useWidgetParams(params?: string): UrlParamValues {
  const [search] = useSearchParams();

  const searchParams = new URLSearchParams(params ?? search);

  function get(key: keyof UrlParamValues): boolean {
    const param = searchParams.get(key);
    return param != null && (param === "" || Boolean(param));
  }

  const result: UrlParamValues = {
    hideText: get(URL_PARAMS.hideText),
    hideAdvOpts: get(URL_PARAMS.hideAdvancedOptions),
    unfoldAdvOpts: get(URL_PARAMS.unfoldAdvancedOptions),
    // we turn this into a number to ensure it is in fact a valid number
    liquidPct: Number(searchParams.get(URL_PARAMS.liquidPercentage)),
    availCurrs:
      searchParams.get(URL_PARAMS.availableCurrencies)?.split(",") || [],
  };

  return result;
}
