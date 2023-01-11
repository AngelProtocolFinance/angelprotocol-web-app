import { useSearchParams } from "react-router-dom";
import { URL_PARAMS } from "./constants";

type Result = {
  hideText: any;
  hideAdvOpts: any;
  hideEndowGauges: any;
  unfoldAdvOpts: any;
  liquidPercentage: number | null;
  availableCurrencies: string[] | null;
};

export default function useWidgetParams(): Result {
  const [search] = useSearchParams();
  const searchParams = new URLSearchParams(search);

  const result: Result = {
    hideText: searchParams.get(URL_PARAMS.hideText),
    hideAdvOpts: searchParams.get(URL_PARAMS.hideAdvancedOptions),
    hideEndowGauges: searchParams.get(URL_PARAMS.hideEndowmentGauges),
    unfoldAdvOpts: searchParams.get(URL_PARAMS.unfoldAdvancedOptions),
    liquidPercentage: Number(searchParams.get(URL_PARAMS.liquidPercentage)),
    availableCurrencies:
      searchParams.get(URL_PARAMS.availableCurrencies)?.split(",") || null,
  };

  return result;
}
