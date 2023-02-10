import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Copier from "components/Copier";
import { idParamToNum } from "helpers";
import WidgetExample from "./WidgetExample";
import WidgetUrlGenerator from "./WidgetUrlGenerator";
import { FormValues } from "./WidgetUrlGenerator/schema";
import createWidgerUrl from "./createWidgerUrl";

const TITLE_STYLE = "text-lg sm:text-2xl font-heading font-bold";
const NO_ID_MESSAGE = "Please select an organization";

export default function WidgetConfigurer() {
  const { id } = useParams<{ id: string }>();
  const endowId = idParamToNum(id);

  const [widgetSnippet, setWidgetSnippet] = useState(NO_ID_MESSAGE);

  const methods = useForm<FormValues>({
    defaultValues: {
      availableCurrencies: [],
      endowIdName: { id: endowId, name: "" },
      hideText: false,
      hideAdvancedOptions: false,
      unfoldAdvancedOptions: false,
      liquidPercentage: 0,
    },
  });

  const handleUrlChange = useCallback((formValues: FormValues) => {
    const widgetUrl = createWidgerUrl(formValues);
    setWidgetSnippet(
      !formValues.endowIdName.id
        ? NO_ID_MESSAGE
        : `<iframe src="${widgetUrl}" width="700" height="900" style="border: 0px;"></iframe>`
    );
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="padded-container grid grid-rows-[auto_1fr] gap-10 w-full h-full">
        <section className="flex flex-col gap-3 items-center text-center xl:items-start xl:text-left w-full">
          <h1 className={TITLE_STYLE}>
            Accept donations from your website today!
          </h1>
          <div className="font-body text-sm sm:text-base">
            <p>
              Just configure your widget below, copy & paste the code on your
              website and you're ready to go!
            </p>
            <p>
              Your donors will be able to connect their crypto wallets and use
              them to donate directly.
            </p>
          </div>
        </section>
        <div className="grid xl:grid-cols-2 max-xl:justify-center gap-10">
          <section className="xl:order-2 flex flex-col gap-3 items-center xl:items-start justify-self-stretch">
            <h2 className={TITLE_STYLE}>Configure your widget</h2>
            <WidgetUrlGenerator onChange={handleUrlChange} />

            <h2 className={`${TITLE_STYLE} mt-10`}>Copy / paste this URL:</h2>
            <div className="flex items-center justify-center gap-4 h-32 max-w-xl px-10 rounded bg-gray-l3 dark:bg-blue-d4">
              <span className="w-full text-sm sm:text-base font-mono break-all">
                {widgetSnippet}
              </span>
              <Copier
                classes="w-10 h-10 hover:text-orange"
                text={widgetSnippet}
              />
            </div>
          </section>

          <section className="flex flex-col gap-3 max-xl:items-center">
            <h2 className={TITLE_STYLE}>That's what our widget looks like:</h2>
            <WidgetExample />
          </section>
        </div>
      </div>
    </FormProvider>
  );
}
