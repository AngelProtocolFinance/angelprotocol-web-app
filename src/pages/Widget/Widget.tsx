import type { WidgetData } from "api/donate-widget-loader";
import { fill } from "components/DonateMethods";
import Seo from "components/Seo";
import { DEFAULT_PROGRAM } from "components/donation";
import { DONATION_INCREMENTS } from "constants/common";
import { APP_NAME, BASE_URL } from "constants/env";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { WidgetConfig } from "types/widget";
import Configurer from "./Configurer";
import Preview from "./Preview";
import Snippet from "./Snippet";

export function Widget() {
  const { endow } = useLoaderData() as WidgetData;
  const location = useLocation();

  const _methods = endow?.donateMethods;
  const filled = fill(
    _methods?.concat(
      _methods.includes("daf") && !_methods.includes("stripe") ? ["stripe"] : []
    )
  );

  const [state, setState] = useState<WidgetConfig>({
    isDescriptionTextShown: true,
    isTitleShown: true,
    methods: filled,
    accentPrimary: "#2D89C8",
    accentSecondary: "#E6F1F9",
    program: DEFAULT_PROGRAM,
    increments: DONATION_INCREMENTS.map((i) => ({
      label: i.label,
      value: i.value.toString(),
    })),
  });

  return (
    <div className="grid @4xl:grid-cols-2 @4xl:gap-x-10 w-full h-full group @container/widget">
      <Seo
        title={`Donation Form Configuration${
          endow?.id ? ` for nonprofit ${endow?.id}` : ""
        } - ${APP_NAME}`}
        description={endow?.tagline?.slice(0, 140)}
        name={endow?.name}
        image={endow?.logo}
        url={`${BASE_URL}${location.pathname}`}
      />
      <h1 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3 @4xl/widget:col-span-2">
        Accept donations from your website today!
      </h1>
      <p className="mb-8 text-center @4xl/widget:text-left text-sm @4xl/widget:text-base @4xl/widget:col-span-2 pb-2">
        Just configure your Donation Form below, copy & paste the code on your
        website and you're ready to go!
      </p>
      <div className="w-full">
        <Configurer config={state} setConfig={setState} endow={endow} />
        <Snippet config={state} classes="mt-10" endow={endow} />
      </div>

      <Preview
        endow={endow}
        config={state}
        classes="order-last @4xl/widget:order-none @4xl/widget:mt-0 mt-10"
      />
    </div>
  );
}
