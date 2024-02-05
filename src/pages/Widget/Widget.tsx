import { useEndowment } from "services/aws/useEndowment";
import Configurer from "./Configurer";
import Preview from "./Preview";
import Snippet from "./Snippet";
import { useLocation } from "react-router-dom";
import Seo from "components/Seo";
import { APP_NAME, DAPP_URL } from "constants/env";

export default function Widget({ endowId }: { endowId?: number }) {
  const location = useLocation();
  const { data: profile } = useEndowment(
    endowId ?? 0,
    ["logo", "name", "overview"],
    { skip: !endowId }
  );

  return (
    <div className="grid @4xl:grid-cols-2 @4xl:gap-x-10 w-full h-full group @container/widget">
      <Seo
        title={`Widget Configuration${
          endowId ? ` for nonprofit ${endowId}` : ""
        } - ${APP_NAME}`}
        description={profile?.overview.slice(0, 140)}
        name={profile?.name}
        image={profile?.logo}
        url={`${DAPP_URL}${location.pathname}`}
      />
      <h1 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3 @4xl/widget:col-span-2">
        Accept donations from your website today!
      </h1>
      <p className="text-center @4xl/widget:text-left font-body text-sm @4xl/widget:text-base @4xl/widget:col-span-2">
        Just configure your widget below, copy & paste the code on your website
        and you're ready to go!
      </p>
      <p className="text-center @4xl/widget:text-left font-body text-sm @4xl/widget:text-base mb-10 @4xl/widget:col-span-2">
        Your donors will be able to connect their crypto wallets and use them to{" "}
        donate directly.
      </p>
      <Preview classes="mt-10 order-last @4xl/widget:order-none @4xl/widget:mt-0" />
      <div className="w-full">
        <Configurer />
        <Snippet classes="mt-10" />
      </div>
    </div>
  );
}
