import laira_waiving from "assets/laira/laira-waiving.webp";
import { Steps, type TDonation } from "components/donation";

import { Image } from "components/image/image";
import type { PropsWithChildren } from "react";
import type { ILoader } from "./api";

interface Props extends ILoader {
  classes?: string;
}
export function Preview({ classes = "", recipient_details: rd, ...f }: Props) {
  const init_state: TDonation = {
    method: f.donate_methods?.at(0) || "stripe",
    source: "bg-widget",
    mode: "preview",
    recipient: {
      id: f.recipient,
      name: rd.name,
      hide_bg_tip: rd.hide_bg_tip,
      members: rd.members,
    },
    config: {
      accentPrimary: f.accent_primary,
      accentSecondary: f.accent_secondary,
      method_ids: f.donate_methods,
      increments: f.increments,
    },
  };

  return (
    <Container
      accent_primary={f.accent_primary}
      accent_secondary={f.accent_secondary}
    >
      <Steps
        key={JSON.stringify(init_state)}
        init={init_state}
        className="my-5 @md/preview:w-3/4 border border-gray-l3"
      />
    </Container>
  );
}

interface IContainer extends PropsWithChildren {
  accent_primary: string | undefined;
  accent_secondary: string | undefined;
  classes?: string;
}

function Container({
  accent_primary,
  accent_secondary,
  classes = "",
  children,
}: IContainer) {
  return (
    <section
      style={{
        ...(accent_primary
          ? ({ "--accent-primary": accent_primary } as any)
          : {}),
        ...(accent_secondary
          ? ({ "--accent-secondary": accent_secondary } as any)
          : {}),
      }}
      className={`${classes} @container/preview pb-4`}
    >
      <div>
        <p className="flex text-gray-d4 text-lg ">
          <Image src={laira_waiving} className="h-[45px] mr-2 pb-2" />
          <span className="uppercase font-bold">Live form preview</span>
        </p>
      </div>
      <div className="grid h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded-sm text-gray-d4 bg-white">
        <div className="grow flex flex-col justify-between items-center pt-6 @xl/preview:pt-10">
          {children}
        </div>
      </div>
    </section>
  );
}
