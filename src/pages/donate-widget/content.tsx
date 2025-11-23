import type { INpo } from "@better-giving/endowment";
import type { IIncrement } from "@better-giving/schemas";
import {
  type DonationRecipient,
  type IUser,
  Steps,
  all_method_ids,
} from "components/donation";
import type { Config, IProgram } from "components/donation";
import type { IWidgetSearchObj } from "types/widget";

type Props = {
  npo: INpo;
  config: IWidgetSearchObj;
  program: IProgram | undefined;
  user: IUser | undefined;
  classes?: string;
};

export default function Content({
  npo,
  config,
  program,
  user,
  classes = "",
}: Props) {
  const recipient: DonationRecipient = {
    id: npo.id.toString(),
    name: npo.name,
    hide_bg_tip: npo.hide_bg_tip,
    members: [],
    donor_address_required: npo.donor_address_required,
  };

  const ms: any = config.methods ?? all_method_ids;
  const incs_str = config.increments || [];
  const incs_labels = config.descriptions || [];
  const incs: IIncrement[] = incs_str.map((val, idx) => ({
    value: val,
    label: incs_labels[idx] || "",
  }));

  const c: Config = {
    method_ids: ms,
    accent_primary: config.accentPrimary,
    accent_secondary: config.accentSecondary,
    increments: incs,
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
        config={c}
        user={user}
        program={program}
      />
    </div>
  );
}
