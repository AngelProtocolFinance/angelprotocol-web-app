import { URL_PARAMS } from "@giving/constants/widget";
import { useSearchParams } from "react-router-dom";
import { WidgetParams } from "@giving/types/pages/widget";

export default function useWidgetParams(): WidgetParams {
  const [search] = useSearchParams();
  const searchParams = new URLSearchParams(search);

  function get(key: keyof WidgetParams): boolean {
    const param = searchParams.get(key);
    return param != null && (param === "" || Boolean(param));
  }

  const result: WidgetParams = {
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
