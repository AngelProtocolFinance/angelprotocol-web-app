import { UrlParamValues } from "DonateWidget";
import { URL_PARAMS } from "DonateWidget/constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { FormValues } from "./schema";

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
      [param1, param2, param3, param4, param5].filter((val) => !!val).join("&")
    );
  }, [endowId, formValues, handleError, onChange]);

  return methods;
}

function append(
  condition: boolean,
  name: keyof UrlParamValues,
  values?: string | number
): string {
  return condition ? `${name}${!values ? "" : `=${values}`}` : "";
}
