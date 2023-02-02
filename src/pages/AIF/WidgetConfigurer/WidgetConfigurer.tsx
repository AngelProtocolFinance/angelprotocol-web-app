import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_PARAMS, UrlParamValues } from "pages/DonateWidget";
import { useErrorContext } from "contexts/ErrorContext";
import Copier from "components/Copier";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import WidgetExample from "./WidgetExample";
import WidgetUrlGenerator from "./WidgetUrlGenerator";
import { FormValues } from "./WidgetUrlGenerator/schema";

const TITLE_STYLE = "text-lg sm:text-2xl font-heading font-bold";

const APP_URL = IS_TEST
  ? "http://localhost:4200"
  : "https://app.angelprotocol.io";

export default function WidgetConfigurer() {
  const { id } = useParams<{ id: string }>();
  const [valuesTrigger, setValuesTrigger] = useState(false);
  const [widgetValues, setWidgetValues] = useState<FormValues>({
    hideText: false,
    availableCurrencies: [],
    hideAdvancedOptions: false,
    liquidPercentage: 0,
    unfoldAdvancedOptions: false,
  });

  const handleUrlChange = useCallback(
    (formValues: FormValues) => setWidgetValues(formValues),
    []
  );

  useEffect(() => setValuesTrigger((prev) => !prev), [widgetValues]);

  const widgetUrl = useCreateWidgerUrl()(id, widgetValues);

  const widgetSnippet = `<iframe src="${widgetUrl}" width="700" height="900" style="border: 0px;"></iframe>`;

  return (
    <div className="padded-container grid grid-rows-[auto_1fr] gap-10 w-full h-full">
      <section className="flex flex-col gap-3 items-center text-center xl:items-start xl:text-left w-full">
        <h1 className={TITLE_STYLE}>
          Accept donations from your website today!
        </h1>
        <div className="sm:w-3/5 font-body text-sm sm:text-base">
          <p>
            Just configure your widget below, copy & paste the code on your
            website and you're ready to go!
            {/**
             * TODO: update the page to display steps to do this,
             * similar to https://docs.kado.money/kado-ramp-widget/integrating-the-kado-ramp-widget/url-redirect
             */}
          </p>
          <p>
            Your donors will be able to connect their crypto wallets and use
            them to donate directly.
          </p>
        </div>
      </section>
      <div className="grid xl:grid-cols-2 max-xl:justify-center gap-10">
        <section className="xl:order-2 flex flex-col gap-3 items-center xl:items-start w-full max-xl:max-w-lg">
          <h2 className={TITLE_STYLE}>Configure your widget</h2>
          <WidgetUrlGenerator onChange={handleUrlChange} />

          <h2 className={`${TITLE_STYLE} mt-10`}>Copy / paste this URL:</h2>
          <div className="flex items-center justify-center gap-4 h-32 px-10 rounded bg-gray-l3 dark:bg-blue-d4">
            <span className="w-full text-sm sm:text-base font-mono break-all">
              {widgetSnippet}
            </span>
            <Copier
              classes="w-10 h-10 hover:text-orange"
              text={widgetSnippet}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3 max-sm:items-center">
          <h2 className={TITLE_STYLE}>That's what our widget looks like:</h2>
          <WidgetExample {...widgetValues} valuesTrigger={valuesTrigger} />
        </section>
      </div>
    </div>
  );
}

const useCreateWidgerUrl = () => {
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
};

function append(
  condition: boolean,
  name: keyof UrlParamValues,
  values?: string | number
): string {
  return condition ? `&${name}${!values ? "" : `=${values}`}` : "";
}
