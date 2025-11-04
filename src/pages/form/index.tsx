import { Steps, type TDonation } from "components/donation";
import type { Route } from "./+types";
export { loader } from "./api";

export default function Page({ loaderData }: Route.ComponentProps) {
  const { recipient_details: rd, ...d } = loaderData;
  const init_state: TDonation = {
    method: d.donate_methods?.at(0) || "stripe",
    source: "bg-widget",
    mode: "preview",
    recipient: {
      id: d.recipient,
      name: d.name,
      hide_bg_tip: rd.hide_bg_tip,
      members: rd.members,
    },
    config: {
      accentPrimary: d.accent_primary,
      accentSecondary: d.accent_secondary,
      method_ids: d.donate_methods,
      increments: d.increments,
    },
    program: rd.program,
  };

  return <Steps key={JSON.stringify(init_state)} init={init_state} />;
}
