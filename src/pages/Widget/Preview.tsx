import { DappLogo } from "components/Image";
import { type DonationState, Steps } from "components/donation";
import { useGetter } from "store/accessors";

export default function Preview({ classes = "" }) {
  const { endowment, ...config } = useGetter((state) => state.widget);
  const endowName = endowment.name || "nonprofit name";

  const state: DonationState = {
    step: "splits",
    recipient: endowment,
    config: {
      isPreview: true,
      isSplitDisabled: config.splitDisabled,
      liquidSplitPct: config.liquidSplitPct,
    },
    details: {
      method: "stripe",
      amount: "",
      currency: { code: "usd", rate: 1, min: 1 },
      frequency: "subscription",
      source: "bg-widget",
    },
  };

  return (
    <section className={`${classes} @container/preview pb-4`}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        That's what our Donation Form looks like:
      </h2>
      <div className="grid h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-navy-d4 bg-white">
        <div className="grow flex flex-col justify-between items-center pt-6 @xl/preview:pt-10">
          <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg @sm/preview:text-3xl">
            Donate to {endowName}
          </h1>
          {config.isDescriptionTextShown && (
            <p className="text-xs text-center @sm/preview:text-base">
              Check out the many crypto and fiat donation options. Provide your
              personal details to receive an immediate tax receipt.
            </p>
          )}
          <Steps
            key={JSON.stringify(config)}
            className="my-5 @md/preview:w-3/4 border border-gray-l4"
            {...state}
          />
          <footer className="mt-auto grid place-items-center h-20 w-full bg-blue">
            <DappLogo classes="w-40" color="white" />
          </footer>
        </div>
      </div>
    </section>
  );
}
