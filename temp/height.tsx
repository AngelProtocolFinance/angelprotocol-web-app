import { Steps, type TDonation } from "components/donation";
import { useEffect } from "react";
import type { Route } from "./+types";
export { loader } from "./api";

export default function Page({ loaderData, params }: Route.ComponentProps) {
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
