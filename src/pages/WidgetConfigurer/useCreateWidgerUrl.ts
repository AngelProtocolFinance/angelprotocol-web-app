import { useCallback } from "react";
import { URL_PARAMS, UrlParamValues } from "pages/DonateWidget";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { FormValues } from "./WidgetUrlGenerator/schema";

const APP_URL = IS_TEST
  ? "http://localhost:4200"
  : "https://app.angelprotocol.io";

export default function useCreateWidgerUrl() {
  const { handleError } = useErrorContext();

  const createWidgetUrl = useCallback(
    (endowId: string | undefined, formValues: FormValues) => {
      const rootUrl = `${APP_URL}${appRoutes.donate_widget}/${endowId}?apiKey=API_KEY`;

      if (!endowId) {
        handleError(new UnexpectedStateError(`Endowment ID is undefined`));
        return rootUrl;
      }

      const param1 = append(formValues.hideText, URL_PARAMS.hideText);
      const param2 = append(
        formValues.hideAdvancedOptions,
        URL_PARAMS.hideAdvancedOptions
      );
      const param3 = append(
        !formValues.hideAdvancedOptions && formValues.unfoldAdvancedOptions,
        URL_PARAMS.unfoldAdvancedOptions
      );
      const param4 = append(
        !!formValues.liquidPercentage,
        URL_PARAMS.liquidPercentage,
        formValues.liquidPercentage
      );
      const param5 = append(
        !isEmpty(formValues.availableCurrencies),
        URL_PARAMS.availableCurrencies,
        formValues.availableCurrencies.map((x) => x.value).join(",")
      );
      return `${rootUrl}${param1}${param2}${param3}${param4}${param5}`;
    },
    [handleError]
  );

  return createWidgetUrl;
}

function append(
  condition: boolean,
  name: keyof UrlParamValues,
  values?: string | number
): string {
  return condition ? `&${name}${!values ? "" : `=${values}`}` : "";
}
