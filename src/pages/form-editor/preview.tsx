import { Steps, type TDonation } from "components/donation";
import { donor_fv_blank } from "lib/donations/schema";
import { EyeIcon } from "lucide-react";
import type { ILoader } from "./api";

interface Props extends ILoader {
  classes?: string;
}
export function Preview({
  classes = "",
  recipient_details: rd,
  base_url,
  ...f
}: Props) {
  const init_state: TDonation = {
    base_url,
    method: f.donate_methods?.at(0) || "stripe",
    source: "bg-widget",
    mode: "preview",
    recipient: {
      id: f.recipient,
      name: rd.name,
      hide_bg_tip: rd.hide_bg_tip,
      members: rd.members,
      donor_address_required: false,
    },
    donor: donor_fv_blank,
    config: {
      id: f.id,
      accent_primary: f.accent_primary,
      accent_secondary: f.accent_secondary,
      method_ids: f.donate_methods,
      increments: f.increments,
    },
  };

  return (
    <div className={classes}>
      <div className="text-sm mb-2 flex items-center gap-x-1">
        <EyeIcon size={16} className="text-gray-d1" />
        <span>Live form preview</span>
      </div>
      <Steps
        key={JSON.stringify(init_state)}
        init={init_state}
        className="rounded"
      />
    </div>
  );
}
