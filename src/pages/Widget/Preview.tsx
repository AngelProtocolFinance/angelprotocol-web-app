import { DappLogo } from "components/Image";
import { Steps } from "components/donation";
import { useGetter } from "store/accessors";

export default function Preview({ classes = "" }) {
  const widgetConfig = useGetter((state) => state.widget);
  const endowName = widgetConfig.endowment.name ?? "nonprofit name";

  return (
    <section className={classes + " @container/preview pb-4"}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        That's what our widget looks like:
      </h2>
      <div className="pt-6 flex flex-col @xl/preview:pt-10 h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-navy-d4 bg-white">
        <h1 className="flex justify-center items-center gap-10 w-full h-24 z-20 text-lg sm:text-3xl">
          Donate to {endowName}
        </h1>
        <Steps
          className="mt-5 w-full md:w-3/4 border border-gray-l4"
          donaterConfig={{
            isPreview: true,
            liquidSplitPct: widgetConfig.liquidSplitPct,
          }}
        />

        <footer className="grid place-items-center h-20 w-full bg-blue mt-auto">
          <DappLogo classes="w-20" />
        </footer>
      </div>
    </section>
  );
}
