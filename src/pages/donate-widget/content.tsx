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
    members: [],
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
            "Select your preferred payment option from our comprehensive donation choices and get an immediate tax receipt for your records."}
        </p>
      )}
      <Steps
        source="bg-widget"
        mode="live"
        className="w-full border border-gray-l3 rounded-lg"
        recipient={recipient}
        config={config}
      />
    </div>
  );
}
