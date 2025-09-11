import { fill } from "components/donate-methods";
import { DEFAULT_PROGRAM } from "components/donation";
import { DONATION_INCREMENTS } from "constants/common";
import { useState } from "react";
import { useLoaderData } from "react-router";
import type { WidgetConfig } from "types/widget";
import Configurer from "./configurer";
import type { WidgetData } from "./loader";
import Preview from "./preview";
import Snippet from "./snippet";

export default function Widget() {
  const { endow, base_url } = useLoaderData<WidgetData>();

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
      <h1 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3 @4xl/widget:col-span-2">
        Accept donations from your website today!
      </h1>
      <p className="mb-8 text-center @4xl/widget:text-left text-sm @4xl/widget:text-base @4xl/widget:col-span-2 pb-2">
        Just configure your Donation Form below, copy & paste the code on your
        website and you're ready to go!
      </p>
      <div className="w-full">
        <Configurer config={state} setConfig={setState} endow={endow} />
        <Snippet
          base_url={base_url}
          config={state}
          classes="mt-10"
          endow={endow}
        />
      </div>

      <Preview
        endow={endow}
        config={state}
        classes="order-last @4xl/widget:order-none @4xl/widget:mt-0 mt-10"
      />
    </div>
  );
}
