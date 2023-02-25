import { DAPP_DOMAIN } from "@giving/constants/common";
import { IS_TEST } from "@giving/constants/env";
import { appRoutes } from "@giving/constants/routes";
import { URL_PARAMS } from "@giving/constants/widget";
import { isEmpty } from "@giving/helpers";
import { WidgetParams } from "@giving/types/pages/widget";
import { FormValues } from "./schema";

const APP_URL = IS_TEST ? "http://localhost:4200" : `${DAPP_DOMAIN}`;

export default function createWidgetUrl(formValues: FormValues) {
  const rootUrl = `${APP_URL}${appRoutes.donate_widget}/${formValues.endowIdName.id}?apiKey=API_KEY`;

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
}

function append(
  condition: boolean,
  name: keyof WidgetParams,
  values?: string | number
): string {
  return condition ? `&${name}${!values ? "" : `=${values}`}` : "";
}
