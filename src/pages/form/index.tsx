import { Steps, type TDonation } from "components/donation";
import { donor_fv_blank } from "lib/donations/schema";
import type { Route } from "./+types";
import { useEffect } from "react";
export { loader } from "./api";

export default function Page({ loaderData, params }: Route.ComponentProps) {
  const { recipient_details: rd, ...d } = loaderData;
  const init_state: TDonation = {
    method: d.donate_methods?.at(0) || "stripe",
    source: "bg-widget",
    mode: "preview",
    donor: donor_fv_blank,
    recipient: {
      id: d.recipient,
      name: d.name,
      hide_bg_tip: rd.hide_bg_tip,
      members: [],
      donor_address_required: rd.donor_address_required,
    },
    config: {
      id: d.id,
      accent_primary: d.accent_primary,
      accent_secondary: d.accent_secondary,
      method_ids: d.donate_methods,
      increments: d.increments,
    },
    program: d.program,
  };

  useEffect(() => {
    const send_height_to_parent = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(
        {
          type: "resize",
          form_id: params.id,
          height,
        },
        "*"
      );
    };

    send_height_to_parent();

    const resize_observer = new ResizeObserver(() => {
      send_height_to_parent();
    });

    resize_observer.observe(document.body);

    return () => {
      resize_observer.disconnect();
    };
  }, [params.id]);

  return <Steps key={JSON.stringify(init_state)} init={init_state} />;
}
