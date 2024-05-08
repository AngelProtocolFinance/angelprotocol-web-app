import Seo from "components/Seo";
import { ErrorStatus } from "components/Status";
import {
  type DonationRecipient,
  type DonationState,
  Steps,
} from "components/donation";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import type { EndowmentProfile } from "types/aws";
import parseConfig from "./parseConfig";

type Props = {
  profile: EndowmentProfile;
  searchParams: URLSearchParams;
  classes?: string;
};

export default function Content({
  profile,
  searchParams,
  classes = "",
}: Props) {
  const recipient: DonationRecipient = {
    id: profile.id,
    name: profile.name,
    hide_bg_tip: !!profile.hide_bg_tip,
  };

  const config = parseConfig(searchParams);

  //validation error
  if ("error" in config) {
    return <ErrorStatus classes="h-full">{config.error}</ErrorStatus>;
  }

  const initState: DonationState = {
    step: "splits",
    intentId: undefined,
    recipient: recipient,
    config: {
      isPreview: true,
      isSplitDisabled: config.splitDisabled,
      liquidSplitPct: config.liquidSplitPct,
    },
    liquidSplitPct: config.liquidSplitPct,
    details: {
      method: "stripe",
      source: "bg-widget",
      amount: "",
      currency: { code: "usd", rate: 1, min: 1 },
      frequency: "one-time",
    },
  };

  return (
    <div
      className={`${classes} max-w-3xl w-full h-full p-6 grid content-start justify-items-center`}
    >
      <Seo
        title={`Donate to ${profile.name} - ${APP_NAME}`}
        description={profile.overview?.slice(0, 140)}
        name={profile.name}
        image={profile.logo}
        url={`${BASE_URL}/${appRoutes.donate_widget}/${profile.id}`}
      />
      <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg sm:text-3xl">
        Donate to {profile.name}
      </h1>

      {config.isDescriptionTextShown && (
        <p className="text-xs text-center sm:text-base">
          Check out the many crypto and fiat donation options. Provide your
          personal details to receive an immediate tax receipt.
        </p>
      )}

      <Steps
        className="mt-5 w-full md:w-3/4 border border-gray-l4"
        {...initState}
      />
    </div>
  );
}
