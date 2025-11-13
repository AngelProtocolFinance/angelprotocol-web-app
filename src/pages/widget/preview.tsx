import type { INpo } from "@better-giving/endowment";
import laira_waiving from "assets/laira/laira-waiving.webp";
import { type Config, Steps, type TDonation } from "components/donation";

import { Image } from "components/image/image";
import { Info } from "components/status";
import type { PropsWithChildren } from "react";
import { donor_address_init, donor_init } from "types/donation-intent";
import type { IWidgetFv } from "types/widget";

type Props = {
  classes?: string;
  fv: IWidgetFv;
  endow?: INpo;
};
export function Preview({ classes = "", fv, endow }: Props) {
  if (!endow) {
    return (
      <Container classes={classes} fv={fv}>
        <Info classes="text-lg">Please select an organization.</Info>
      </Container>
    );
  }

  const config: Config = {
    method_ids: fv.methods.filter((m) => !m.disabled).map((m) => m.id),
    accent_primary: fv.accent_primary,
    accent_secondary: fv.accent_secondary,
    increments: fv.increments,
  };

  const init_state: TDonation = {
    method: config.method_ids?.at(0) ?? "stripe",
    source: "bg-widget",
    mode: "preview",
    recipient: {
      id: endow.id.toString(),
      name: endow.name,
      hide_bg_tip: endow?.hide_bg_tip,
      donor_address_required: endow.donor_address_required,
      members: [],
    },
    config: config,
    donor: endow.donor_address_required
      ? { ...donor_init, address: donor_address_init }
      : donor_init,
  };

  return (
    <Container fv={fv} classes={classes}>
      {fv.is_title_shown && (
        <h1 className="text-center w-full text-pretty mb-2 text-lg @sm/preview:text-3xl">
          {fv.title || `Donate to ${endow.name}`}
        </h1>
      )}
      {fv.is_description_text_shown && (
        <p className="text-xs text-center @sm/preview:text-base">
          {fv.description ||
            "Select your preferred payment option from our comprehensive donation choices and get an immediate tax receipt for your records."}
        </p>
      )}
      <Steps
        key={JSON.stringify(init_state)}
        init={init_state}
        className="my-5 @md/preview:w-3/4 border border-gray-l3"
      />
    </Container>
  );
}

interface IContainer extends PropsWithChildren {
  classes?: string;
  fv: IWidgetFv;
}

function Container({ classes = "", children }: IContainer) {
  return (
    <section className={`${classes} @container/preview pb-4`}>
      <div>
        <p className="flex text-gray-d4 text-lg ">
          <Image src={laira_waiving} className="h-[45px] mr-2 pb-2" />
          <span className="uppercase font-bold">Live form preview</span>
        </p>
      </div>
      <div className="grid h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded-sm text-gray-d4 bg-white">
        <div className="grow flex flex-col items-center pt-6 @xl/preview:pt-10">
          {children}
        </div>
      </div>
    </section>
  );
}
