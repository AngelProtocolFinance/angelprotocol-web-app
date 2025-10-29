import type { INpo } from "@better-giving/endowment";
import { type DonationRecipient, type IUser, Steps } from "components/donation";
import type { IProgram } from "components/donation";
import type { Parsed } from "./parse-config";

type Props = {
  npo: INpo;
  config: Parsed;
  program?: IProgram;
  user?: IUser;
  classes?: string;
};

export default function Content({ npo, config, user, classes = "" }: Props) {
  const recipient: DonationRecipient = {
    id: npo.id.toString(),
    name: npo.name,
    hide_bg_tip: npo.hide_bg_tip,
    members: [],
  };

  return (
    <div
      className={`${classes} w-full grid gap-5 content-start justify-items-center`}
    >
      {config.isTitleShown && (
        <h1 className="text-center w-full z-20 text-lg sm:text-3xl text-pretty">
          {config.title || `Donate to ${npo.name}`}
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
        user={user}
      />
    </div>
  );
}
