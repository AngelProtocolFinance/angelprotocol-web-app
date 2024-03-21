import { DappLogo } from "components/Image";
import { useGetter } from "store/accessors";
import DonateMethods from "./DonateMethods";

export default function Preview({ classes = "" }) {
  const widgetConfig = useGetter((state) => state.widget);
  const { endowment } = widgetConfig;
  const endowName = endowment.name ?? "nonprofit name";
  return (
    <section className={classes + " @container/preview pb-4"}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        That's what our widget looks like:
      </h2>
      <div className="pt-6 flex flex-col @xl/preview:pt-10 h-full overflow-y-auto scroller w-full max-h-[800px] border border-gray-l2 rounded text-navy-d4 bg-white">
        <h1 className="mb-10 px-10 w-full text-xl">{endowName}</h1>

        <DonateMethods classes="mb-10 px-6 @xl/preview:px-10" />

        <footer className="grid place-items-center h-20 w-full bg-blue mt-auto">
          <DappLogo classes="w-20" />
        </footer>
      </div>
    </section>
  );
}
