import { URL_PARAMS, UrlParamValues } from "DonateWidget";
import { useEffect, useState } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import { OptionType } from "components/Selector";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import useApprovedTokens from "./useApprovedTokens";

const APP_URL = IS_TEST
  ? "http://localhost:4200"
  : "https://app.angelprotocol.io";

export default function useWidgetUrlGenerator(
  endowId: string | number | undefined,
  onChange: (url: string) => void
) {
  const [hideText, setHideText] = useState(false);
  const [hideEndowmentGauges, setHideEndowmentGauges] = useState(false);
  const [hideAdvancedOptions, setHideAdvancedOptions] = useState(false);
  const [unfoldAdvancedOptions, setUnfoldAdvancedOptions] = useState(false);
  const [liquidPercentage, setLiquidPercentage] = useState(0);
  const [availableCurrencies, setAvailableCurrencies] = useState<
    OptionType<string>[]
  >([]);
  const approvedTokens = useApprovedTokens();
  const { handleError } = useErrorContext();

  const reset = () => {
    setHideText(false);
    setHideAdvancedOptions(false);
    setHideEndowmentGauges(false);
    setUnfoldAdvancedOptions(false);
    setLiquidPercentage(0);
    setAvailableCurrencies([]);
  };

  useEffect(() => {
    if (!endowId) {
      return handleError(new UnexpectedStateError(`Endowment ID is undefined`));
    }

    const param1 = append(hideText, URL_PARAMS.hideText);
    const param2 = append(hideEndowmentGauges, URL_PARAMS.hideEndowmentGauges);
    const param3 = append(hideAdvancedOptions, URL_PARAMS.hideAdvancedOptions);
    const param4 = append(
      !hideAdvancedOptions && unfoldAdvancedOptions,
      URL_PARAMS.unfoldAdvancedOptions
    );
    const param5 = append(!!liquidPercentage, URL_PARAMS.liquidPercentage);
    const param6 = append(
      !isEmpty(availableCurrencies),
      URL_PARAMS.availableCurrencies,
      availableCurrencies.map((x) => x.value).join(",")
    );
    onChange(
      `${APP_URL}${appRoutes.donate_widget}/${endowId}?apiKey=API_KEY${param1}${param2}${param3}${param4}${param5}${param6}`
    );
  }, [
    endowId,
    hideText,
    hideEndowmentGauges,
    hideAdvancedOptions,
    unfoldAdvancedOptions,
    liquidPercentage,
    availableCurrencies,
    handleError,
    onChange,
  ]);

  return {
    approvedTokens,
    reset,
    setHideText,
    setHideAdvancedOptions,
    setHideEndowmentGauges,
    setUnfoldAdvancedOptions,
    setLiquidPercentage,
    setAvailableCurrencies,
  };
}

function append(
  condition: boolean,
  name: keyof UrlParamValues,
  values = ""
): string {
  return condition ? `&${name}${!values ? "" : `=${values}`}` : "";
}
