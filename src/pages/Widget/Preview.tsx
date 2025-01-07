import type { Endow } from "@better-giving/endowment";
import { laira } from "assets/laira/laira";
import Image from "components/Image/Image";
import { Info } from "components/Status";
import { type DonationState, Steps, initDetails } from "components/donation";
import type { PropsWithChildren } from "react";
import type { WidgetConfig } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
  endow?: Endow;
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
            "Check out the many crypto and fiat donation options. Provide your personal details to receive an immediate tax receipt."}
        </p>
      )}
      <Steps
        key={JSON.stringify(initState)}
        init={initState}
        className="my-5 @md/preview:w-3/4 border border-gray-l4"
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
        <p className="flex text-navy-d4 text-lg font-heading">
          <Image src={laira.waiving} className="h-[45px] mr-2 pb-2" />
          <span className="uppercase font-bold">Live form preview</span>
        </p>
      </div>
      <div className="grid h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-navy-d4 bg-white">
        <div className="grow flex flex-col justify-between items-center pt-6 @xl/preview:pt-10">
          {children}
        </div>
      </div>
    </section>
  );
}
