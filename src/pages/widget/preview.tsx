import type { INpo } from "@better-giving/endowment";
import { laira } from "assets/laira/laira";
import { type DonationState, Steps, initDetails } from "components/donation";
import Image from "components/image/image";
import { Info } from "components/status";
import type { PropsWithChildren } from "react";
import type { WidgetConfig } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
  endow?: INpo;
};
export default function Preview({ classes = "", config, endow }: Props) {
  if (!endow) {
    return (
      <Container classes={classes} {...config}>
        <Info classes="text-lg">Please select an organization.</Info>
      </Container>
    );
  }

  const { methods, increments, ...restConfig } = config;

  const initState: DonationState = {
    step: "donate-form",
    init: {
      source: "bg-widget",
      mode: "preview",
      recipient: {
        id: endow.id.toString(),
        name: endow.name,
        hide_bg_tip: endow?.hide_bg_tip,
        progDonationsAllowed: endow?.progDonationsAllowed,
        members: [],
      },
      config: {
        ...restConfig,
        methodIds: methods.filter((m) => !m.disabled).map((m) => m.id),
        increments: increments.map((i) => ({ ...i, value: +i.value })),
      },
    },
    details: initDetails(methods.at(0)?.id ?? "stripe", restConfig.program),
  };

  return (
    <Container {...config}>
      {config.isTitleShown && (
        <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg @sm/preview:text-3xl">
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
        <p className="flex text-gray-d4 text-lg font-heading">
          <Image src={laira.waiving} className="h-[45px] mr-2 pb-2" />
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
