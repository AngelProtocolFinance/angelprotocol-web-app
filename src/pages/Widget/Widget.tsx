import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import type { Endowment } from "types/aws";
import type { WidgetConfig } from "types/widget";
import Configurer from "./Configurer";
import Preview from "./Preview";
import Snippet from "./Snippet";

export default function Widget({ endowId = 0 }: { endowId?: number }) {
  const queryState = useEndowment(
    { id: endowId },
    [
      "id",
      "hide_bg_tip",
      "logo",
      "name",
      "overview",
      "splitFixed",
      "splitLiqPct",
    ],
    { skip: !endowId }
  );

  return (
    <QueryLoader queryState={queryState} dataRequired={false}>
      {(endowment) => <Content endowment={endowment} />}
    </QueryLoader>
  );
}

function Content({
  endowment,
}: {
  endowment?: Pick<
    Endowment,
    | "id"
    | "hide_bg_tip"
    | "logo"
    | "name"
    | "overview"
    | "splitFixed"
    | "splitLiqPct"
  >;
}) {
  const location = useLocation();
  const [state, setState] = useState<WidgetConfig>({
    endowment: endowment || {
      id: 0,
      name: "this nonprofit",
      hide_bg_tip: false,
    },
    isDescriptionTextShown: true,
    liquidSplitPct: endowment?.splitLiqPct ?? 50,
    splitDisabled: endowment?.splitFixed ?? false,
    methods: [
      { id: "crypto", name: "Crypto", disabled: false },
      { id: "daf", name: "DAF", disabled: false },
      { id: "stocks", name: "Stocks", disabled: false },
      { id: "stripe", name: "Card", disabled: false },
    ],
  });

  return (
    <div className="grid @4xl:grid-cols-2 @4xl:gap-x-10 w-full h-full group @container/widget">
      <Seo
        title={`Donation Form Configuration${
          endowment?.id ? ` for nonprofit ${endowment?.id}` : ""
        } - ${APP_NAME}`}
        description={endowment?.overview?.slice(0, 140)}
        name={endowment?.name}
        image={endowment?.logo}
        url={`${BASE_URL}${location.pathname}`}
      />
      <h1 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3 @4xl/widget:col-span-2">
        Accept donations from your website today!
      </h1>
      <p className="text-center @4xl/widget:text-left text-sm @4xl/widget:text-base @4xl/widget:col-span-2 pb-2">
        Just configure your Donation Form below, copy & paste the code on your
        website and you're ready to go!
      </p>
      <div className="w-full">
        <Configurer config={state} setConfig={setState} />
        <Snippet config={state} classes="mt-10" />
      </div>
      <Preview
        config={state}
        classes="order-last @4xl/widget:order-none @4xl/widget:mt-0 mt-10"
      />
    </div>
  );
}
