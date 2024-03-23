import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEndowment } from "services/aws/useEndowment";
import { setRecipient } from "slices/donation";
import { useGetter, useSetter } from "store/accessors";
import { Endowment } from "types/aws";
import Configurer from "./Configurer";
import Preview from "./Preview";
import Snippet from "./Snippet";
import { updateWidgetConfig } from "slices/widget";

export default function Widget({ endowId = 0 }: { endowId?: number }) {
  const queryState = useEndowment(
    { id: endowId },
    ["id", "hide_bg_tip", "logo", "name", "overview"],
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
    "id" | "hide_bg_tip" | "logo" | "name" | "overview"
  >;
}) {
  const location = useLocation();
  const widget = useGetter((state) => state.widget);

  const dispatch = useSetter();
  useEffect(() => {
    if (endowment) {
      dispatch(updateWidgetConfig({ ...widget, endowment }));
      dispatch(setRecipient(endowment));
    } else {
      dispatch(setRecipient(widget.endowment));
    }
  }, [dispatch]);

  return (
    <div className="grid @4xl:grid-cols-2 @4xl:gap-x-10 w-full h-full group @container/widget">
      <Seo
        title={`Widget Configuration${
          endowment?.id ? ` for nonprofit ${endowment?.id}` : ""
        } - ${APP_NAME}`}
        description={endowment?.overview.slice(0, 140)}
        name={endowment?.name}
        image={endowment?.logo}
        url={`${DAPP_URL}${location.pathname}`}
      />
      <h1 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3 @4xl/widget:col-span-2">
        Accept donations from your website today!
      </h1>
      <p className="text-center @4xl/widget:text-left text-sm @4xl/widget:text-base @4xl/widget:col-span-2">
        Just configure your widget below, copy & paste the code on your website
        and you're ready to go!
      </p>
      <p className="text-center @4xl/widget:text-left text-sm @4xl/widget:text-base mb-10 @4xl/widget:col-span-2">
        Your donors will be able to connect their crypto wallets and use them to
        donate directly.
      </p>
      <Preview classes="mt-10 order-last @4xl/widget:order-none @4xl/widget:mt-0" />
      <div className="w-full">
        <Configurer endowment={endowment} />
        <Snippet classes="mt-10" />
      </div>
    </div>
  );
}
