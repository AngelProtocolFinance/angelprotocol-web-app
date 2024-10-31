import Seo from "components/Seo";
import { type DonationRecipient, Steps } from "components/donation";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { useRendered } from "hooks/use-rendered";
import type { EndowmentProfile } from "types/aws";
import type { Parsed } from "./parseConfig";

type Props = {
  profile: EndowmentProfile;
  config: Parsed;
  classes?: string;
};

export default function Content({ profile, config, classes = "" }: Props) {
  useRendered();
  const recipient: DonationRecipient = {
    id: profile.id,
    name: profile.name,
    hide_bg_tip: profile.hide_bg_tip,
    progDonationsAllowed: profile.progDonationsAllowed,
  };

  return (
    <div
      className={`${classes} max-w-3xl w-full h-full p-6 grid gap-5 content-start justify-items-center`}
    >
      <Seo
        title={`Donate to ${profile.name} - ${APP_NAME}`}
        description={profile.overview?.slice(0, 140)}
        name={profile.name}
        image={profile.logo}
        url={`${BASE_URL}/${appRoutes.donate_widget}/${profile.id}`}
        scripts={[]}
      />
      {config.isTitleShown && (
        <h1 className="text-center w-full z-20 text-lg sm:text-3xl text-pretty">
          {config.title || `Donate to ${profile.name}`}
        </h1>
      )}
      {config.isDescriptionTextShown && (
        <p className="text-xs text-center sm:text-base">
          {config.description ||
            "Check out the many crypto and fiat donation options. Provide your personal details to receive an immediate tax receipt."}
        </p>
      )}
      <Steps
        source="bg-widget"
        mode="live"
        className="w-full md:w-3/4 border border-gray-l4 rounded-lg"
        recipient={recipient}
        config={config}
        programId={config.programId}
      />
    </div>
  );
}
