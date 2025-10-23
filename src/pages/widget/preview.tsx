import type { INpo } from "@better-giving/endowment";
import laira_waiving from "assets/laira/laira-waiving.webp";
import { type DonationState, Steps, init_details } from "components/donation";

import { Image } from "components/image/image";
import { Info } from "components/status";
import type { PropsWithChildren } from "react";
import type { WidgetConfig } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
  endow?: INpo;
};
export function Preview({ classes = "", config, endow }: Props) {
  if (!endow) {
    return (
      <Container classes={classes} {...config}>
        <Info classes="text-lg">Please select an organization.</Info>
      </Container>
    );
  }

  const { methods, increments, ...cfg } = config;

  const initState: DonationState = {
    step: "donate-form",
    init: {
      source: "bg-widget",
      mode: "preview",
      recipient: {
        id: endow.id.toString(),
        name: endow.name,
        hide_bg_tip: endow?.hide_bg_tip,
        members: [],
      },
      config: {
        ...cfg,
        method_ids: methods.filter((m) => !m.disabled).map((m) => m.id),
        increments: increments,
      },
    },
    details: init_details(methods.at(0)?.id ?? "stripe"),
  };

  return (
    <Container {...config}>
      {config.isTitleShown && (
        <h1 className="text-center w-full text-pretty mb-2 text-lg @sm/preview:text-3xl">
          {config.title || `Donate to ${endow.name}`}
        </h1>
      )}
      {config.isDescriptionTextShown && (
        <p className="text-xs text-center @sm/preview:text-base">
          {config.description ||
            "Select your preferred payment option from our comprehensive donation choices and get an immediate tax receipt for your records."}
        </p>
      )}
      <Steps
        key={JSON.stringify(initState)}
        init={initState}
        className="my-5 @md/preview:w-3/4 border border-gray-l3"
      />
    </Container>
  );
}

interface IContainer extends PropsWithChildren, WidgetConfig {
  classes?: string;
}

function Container({
  accentPrimary,
  accentSecondary,
  classes = "",
  children,
}: IContainer) {
  return (
    <section
      style={{
        ...(accentPrimary
          ? ({ "--accent-primary": accentPrimary } as any)
          : {}),
        ...(accentPrimary
          ? ({ "--accent-secondary": accentSecondary } as any)
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
