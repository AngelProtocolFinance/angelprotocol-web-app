import Copier from "components/Copier";
import { appRoutes } from "constants/routes";
import { useGetter } from "store/accessors";
import { WidgetConfig, WidgetURLSearchParams } from "types/widget";

export default function Snippet({ classes = "" }) {
  const config = useGetter((state) => state.widget);
  const widgetURL = widgetURLfn(config);
  const iframeURL =
    config.endowment.id !== 0
      ? `<iframe src="${widgetURL}" width="700" height="900" style="border: 0px;"></iframe>`
      : "Please select organization";

  return (
    <div className={classes}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Copy / paste this code snippet:
      </h2>
      <div className="flex items-center justify-center gap-x-4 max-w-xl px-10 rounded bg-gray-l3 dark:bg-blue-d4">
        <div className="w-full text-sm sm:text-base font-mono break-all py-4">
          {iframeURL}
        </div>
        <Copier classes="w-10 h-10 hover:text-orange" text={iframeURL} />
      </div>
    </div>
  );
}

//create URLSearchParams from config
const widgetURLfn = (config: WidgetConfig) => {
  const params: WidgetURLSearchParams = {
    isDescriptionTextShown: config.isDescriptionTextShown ? "true" : "false",
    advancedOptionsDisplay: config.advancedOptions.display,
    liquidSplitPct: config.advancedOptions.liquidSplitPct.toString(),
  };
  return (
    window.location.origin +
    appRoutes.donate_widget +
    "/" +
    config.endowment.id +
    "?" +
    new URLSearchParams(params).toString()
  );
};
