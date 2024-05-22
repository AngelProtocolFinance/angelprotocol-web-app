import Copier from "components/Copier";
import { appRoutes } from "constants/routes";
import type { WidgetConfig, WidgetURLSearchParams } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
};
export default function Snippet({ classes = "", config }: Props) {
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
      <div className="flex items-center justify-center gap-x-4 max-w-xl px-10 rounded bg-gray-l3 dark:bg-blue-d4 @4xl/widget:mx-auto">
        <div className="w-full text-sm sm:text-base font-mono break-all py-4">
          {iframeURL}
        </div>
        <Copier
          classes={{ icon: "w-10 h-10 hover:text-blue-d1" }}
          text={iframeURL}
        />
      </div>
    </div>
  );
}

//create URLSearchParams from config
const widgetURLfn = (config: WidgetConfig) => {
  const params: Required<WidgetURLSearchParams> = {
    isDescriptionTextShown: config.isDescriptionTextShown ? "true" : "false",
    splitDisabled: config.splitDisabled ? "true" : "false",
    liquidSplitPct: config.liquidSplitPct.toString(),
    methods: config.methods
      .filter((m) => !m.disabled)
      .map((m) => m.id)
      .join(","),
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
