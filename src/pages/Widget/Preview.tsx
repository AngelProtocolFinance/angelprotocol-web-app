import character from "assets/laira/laira-waiving.png";
import { DappLogo } from "components/Image";
import Image from "components/Image/Image";
import { type DonationState, Steps, initDetails } from "components/donation";
import { APP_NAME, BASE_URL } from "constants/env";
import { useEndowment } from "services/aws/useEndowment";
import type { WidgetConfig } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
};
export default function Preview({ classes = "", config }: Props) {
  const { endowment, methods, ...restConfig } = config;
  const endowName = config.endowment.name;

  const { data } = useEndowment({ id: endowment.id }, [
    "hide_bg_tip",
    "progDonationsAllowed",
  ]);

  const initState: DonationState = {
    step: "donate-form",
    init: {
      source: "bg-widget",
      mode: "preview",
      recipient: {
        ...endowment,
        hide_bg_tip: data?.hide_bg_tip,
        progDonationsAllowed: data?.progDonationsAllowed,
      },
      config: {
        ...restConfig,
        methodIds: methods.filter((m) => !m.disabled).map((m) => m.id),
      },
    },
    details: initDetails(methods.at(0)?.id ?? "stripe", restConfig.program),
  };

  const { accentPrimary, accentSecondary } = restConfig;

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
        <p className="flex text-navy-d4 text-2xl font-gochi">
          <Image src={character} className="h-[45px] mr-2 pb-2" />
          Check out the LIVE preview of your Donation Form!
        </p>
      </div>
      <div className="grid h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-navy-d4 bg-white">
        <div className="grow flex flex-col justify-between items-center pt-6 @xl/preview:pt-10">
          {config.isTitleShown && (
            <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg @sm/preview:text-3xl">
              {config.title || `Donate to ${endowName}`}
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
          <footer className="mt-auto grid place-items-center h-20 w-full bg-[--accent-primary]">
            <DappLogo
              classes="w-40"
              color="white"
              to={{ href: BASE_URL, title: `Go to ${APP_NAME}` }}
            />
          </footer>
        </div>
      </div>
    </section>
  );
}
