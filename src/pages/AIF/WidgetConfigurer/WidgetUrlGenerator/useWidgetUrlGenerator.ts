import { UrlParamValues } from "DonateWidget";
import { URL_PARAMS } from "DonateWidget/constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { FormValues } from "./schema";

const APP_URL = IS_TEST
  ? "http://localhost:4200"
  : "https://app.angelprotocol.io";

export default function useWidgetUrlGenerator(
  endowId: string | undefined,
  onChange: (url: string) => void
) {
  const { handleError } = useErrorContext();
  const methods = useForm<FormValues>({
    defaultValues: {
      availableCurrencies: [],
      hideText: false,
      hideAdvancedOptions: false,
      hideEndowmentGauges: false,
      unfoldAdvancedOptions: false,
      liquidPercentage: 0,
    },
  });

  const formValues = methods.watch();

  useEffect(() => {
    if (!endowId) {
      return handleError(new UnexpectedStateError(`Endowment ID is undefined`));
    }

    const param1 = append(formValues.hideText, URL_PARAMS.hideText);
    const param2 = append(
      formValues.hideEndowmentGauges,
      URL_PARAMS.hideEndowmentGauges
    );
    const param3 = append(
      formValues.hideAdvancedOptions,
      URL_PARAMS.hideAdvancedOptions
    );
    const param4 = append(
      !formValues.hideAdvancedOptions && formValues.unfoldAdvancedOptions,
      URL_PARAMS.unfoldAdvancedOptions
    );
    const param5 = append(
      !!formValues.liquidPercentage,
      URL_PARAMS.liquidPercentage
    );
    const param6 = append(
      !isEmpty(formValues.availableCurrencies),
      URL_PARAMS.availableCurrencies,
      formValues.availableCurrencies.map((x) => x.value).join(",")
    );
    onChange(
      `${APP_URL}${appRoutes.donate_widget}/${endowId}?apiKey=API_KEY${param1}${param2}${param3}${param4}${param5}${param6}`
    );
  }, [endowId, formValues, handleError, onChange]);

  return methods;
}

function append(
  condition: boolean,
  name: keyof UrlParamValues,
  values = ""
): string {
  return condition ? `&${name}${!values ? "" : `=${values}`}` : "";
}
