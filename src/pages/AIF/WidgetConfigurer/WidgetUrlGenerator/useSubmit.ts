import { UrlParamValues } from "DonateWidget";
import { URL_PARAMS } from "DonateWidget/constants";
import { useCallback, useEffect } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { FormValues } from "./schema";

const APP_URL = IS_TEST
  ? "http://localhost:4200"
  : "https://app.angelprotocol.io";

export default function useSubmit(
  endowId: string | undefined,
  defaultValues: FormValues,
  onChange: (url: string) => void
) {
  const { handleError } = useErrorContext();

  const submit = useCallback(
    (formValues: FormValues) => {
      if (!endowId) {
        return handleError(
          new UnexpectedStateError(`Endowment ID is undefined`)
        );
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
      onChange(
        `${APP_URL}${appRoutes.donate_widget}/${endowId}?apiKey=API_KEY${param1}${param2}${param3}${param4}${param5}`
      );
    },
    [endowId, handleError, onChange]
  );

  useEffect(
    () => submit(defaultValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return submit;
}

function append(
  condition: boolean,
  name: keyof UrlParamValues,
  values?: string | number
): string {
  return condition ? `&${name}${!values ? "" : `=${values}`}` : "";
}
