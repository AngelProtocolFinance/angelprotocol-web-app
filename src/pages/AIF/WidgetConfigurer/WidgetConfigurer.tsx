import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import widgetSample from "assets/images/widget-example.png";
import Copier from "components/Copier";
import WidgetUrlGenerator from "./WidgetUrlGenerator";

const TITLE_STYLE = "text-lg sm:text-2xl font-heading font-bold";

export default function WidgetConfigurer() {
  const { id } = useParams<{ id: string }>();
  const [widgetUrl, setWidgetUrl] = useState("");

  const handleOnUrlChange = useCallback((url: string) => setWidgetUrl(url), []);

  return (
    <div className="padded-container grid grid-rows-[auto_1fr] gap-10 w-full h-full">
      <section className="flex flex-col gap-3 max-sm:items-center w-full">
        <h1 className={TITLE_STYLE}>
          Accept donations from your website today!
        </h1>
        <div className="w-3/5 font-body text-base sm:text-lg">
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
      <div className="grid sm:grid-cols-2">
        <section className="flex flex-col gap-3 max-sm:items-center">
          <h2 className={TITLE_STYLE}>That's what our widget looks like:</h2>
          <img
            src={widgetSample}
            alt="widget example"
            className="w-2/3 object-contain border border-gray-l2 dark:border-bluegray rounded"
          />
        </section>
        <section className="flex flex-col gap-3 max-sm:items-center">
          <h2 className={TITLE_STYLE}>Configure your widget</h2>
          <WidgetUrlGenerator endowId={id} onChange={handleOnUrlChange} />

          <h2 className={`${TITLE_STYLE} mt-10`}>Copy / paste this URL:</h2>
          <div className="flex items-center justify-center gap-4 h-32 px-10 rounded bg-gray-l3 dark:bg-blue-d4">
            <span className="w-full text-sm sm:text-base font-mono break-all">
              {widgetUrl}
            </span>
            <Copier classes="w-10 h-10 hover:text-orange" text={widgetUrl} />
          </div>
        </section>
      </div>
    </div>
  );
}
