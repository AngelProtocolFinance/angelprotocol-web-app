import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import widgetSample from "assets/images/widget-example.png";
import WidgetUrlGenerator from "./WidgetUrlGenerator";

const TITLE_STYLE = "text-lg sm:text-3xl font-heading font-bold";

export default function WidgetConfigurer() {
  const { id } = useParams<{ id: string }>();
  const [widgetUrl, setWidgetUrl] = useState("");

  const handleOnUrlChange = useCallback((url: string) => setWidgetUrl(url), []);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-10 w-full h-full">
      <section className="flex flex-col gap-3 w-full">
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
      <div className="grid grid-cols-2">
        <section className="flex flex-col gap-3">
          <h2 className={TITLE_STYLE}>That's what our widget looks like:</h2>
          <img
            src={widgetSample}
            alt="widget example"
            className="w-3/4 h-full border border-gray-l2 dark:border-bluegray"
          />
        </section>
        <section className="flex flex-col gap-3">
          <h2 className={TITLE_STYLE}>Configure your widget</h2>
          <WidgetUrlGenerator endowId={id} onChange={handleOnUrlChange} />
        </section>
      </div>
    </div>
  );
}
