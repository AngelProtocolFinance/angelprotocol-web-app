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

    const param1 = append("hideText", formValues.hideText, formValues.hideText);
    const param2 = append(
      "hideEndowGauges",
      formValues.hideEndowmentGauges,
      formValues.hideEndowmentGauges
    );
    const param3 = append(
      "hideAdvOpts",
      formValues.hideAdvancedOptions,
      formValues.hideAdvancedOptions
    );
    const param4 = append(
      "unfoldAdvOpts",
      formValues.unfoldAdvancedOptions,
      !formValues.hideAdvancedOptions && formValues.unfoldAdvancedOptions
    );
    const param5 = append(
      "liquidPct",
      formValues.liquidPercentage,
      !!formValues.liquidPercentage
    );
    const param6 = append(
      "availCurrs",
      formValues.availableCurrencies.map((x) => x.value).join(","),
      !isEmpty(formValues.availableCurrencies)
    );
    onChange(
      `${APP_URL}${appRoutes.donate_widget}/${endowId}?apiKey=API_KEY${param1}${param2}${param3}${param4}${param5}${param6}`
    );
  }, [endowId, formValues, handleError, onChange]);

  return methods;
}

function append(name: string, value: any, condition: boolean): string {
  return condition ? `&${name}=${value}` : "";
}
