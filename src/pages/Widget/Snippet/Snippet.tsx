import Copier from "components/Copier";
import { DONATION_INCREMENTS } from "constants/common";
import { appRoutes } from "constants/routes";
import { cleanObject } from "helpers/cleanObject";
import type { Endowment } from "types/aws";
import type { WidgetConfig, WidgetURLSearchParams } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
  endow?: Endowment;
};
export default function Snippet({ classes = "", config, endow }: Props) {
  const widgetURL = widgetURLfn(config, endow?.id);
  const iframeURL = endow?.id
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
const widgetURLfn = (config: WidgetConfig, endowId = 0) => {
  const params: Required<WidgetURLSearchParams> = {
    isDescriptionTextShown: config.isDescriptionTextShown ? "true" : "false",
    methods: config.methods
      .filter((m) => !m.disabled)
      .map((m) => m.id)
      .join(","),
    isTitleShown: config.isTitleShown ? "true" : "false",
    title: config.title ?? "",
    programId: config.program.value,
    description: config.description ?? "",
    accentPrimary: config.accentPrimary ?? "",
    accentSecondary: config.accentSecondary ?? "",
    increments:
      config.increments.length === 0
        ? DONATION_INCREMENTS.map((inc) => inc.value).join(",")
        : config.increments.map((inc) => inc.value).join(","),
    descriptions: config.increments
      .map((inc) => inc.label.replace(/,/g, "_"))
      .join(","),
  };
  return (
    window.location.origin +
    appRoutes.donate_widget +
    "/" +
    endowId +
    "?" +
    new URLSearchParams(cleanObject(params)).toString()
  );
};
