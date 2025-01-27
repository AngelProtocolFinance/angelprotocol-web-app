import type { Endow } from "@better-giving/endowment";
import { type DonationRecipient, Steps } from "components/donation";
import type { Parsed } from "./parse-config";

type Props = {
  profile: Endow;
  config: Parsed;
  classes?: string;
};

export default function Content({ profile, config, classes = "" }: Props) {
  const recipient: DonationRecipient = {
    id: profile.id.toString(),
    name: profile.name,
    hide_bg_tip: profile.hide_bg_tip,
    progDonationsAllowed: profile.progDonationsAllowed,
  };

  return (
    <div
      className={`${classes} w-full grid gap-5 content-start justify-items-center`}
    >
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
        className="w-full border border-gray-l4 rounded-lg"
        recipient={recipient}
        config={config}
      />
    </div>
  );
}
