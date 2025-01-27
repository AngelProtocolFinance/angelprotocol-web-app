import type { Endow } from "@better-giving/endowment";
import Copier from "components/copier";
import { appRoutes } from "constants/routes";
import { cleanObject } from "helpers/cleanObject";
import type { WidgetConfig, WidgetURLSearchParams } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
  endow?: Endow;
  origin: string;
};
export default function Snippet({
  classes = "",
  config,
  endow,
  origin,
}: Props) {
  const widgetURL = widgetURLfn(config, origin, endow?.id);
  const iframeURL = endow?.id
    ? /** allow payment https://docs.stripe.com/payments/payment-methods/pmd-registration?dashboard-or-api=dashboard#using-an-iframe */
      `<iframe src="${widgetURL}" width="700" height="900" allow="payment" style="border: 0px;"></iframe>`
    : "Please select organization";

  return (
    <div className={classes}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Copy / paste this code snippet:
      </h2>
      <div className="flex items-center justify-center gap-x-4 max-w-xl px-10 rounded-sm bg-gray-l3 dark:bg-blue-d4 @4xl/widget:mx-auto">
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
const widgetURLfn = (config: WidgetConfig, origin: string, endowId = 0) => {
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
    increments: config.increments.map((inc) => inc.value).join(","),
    descriptions: config.increments
      .map((inc) => inc.label.replace(/,/g, "_"))
      .join(","),
  };
  return (
    origin +
    appRoutes.donate_widget +
    "/" +
    endowId +
    "?" +
    new URLSearchParams(cleanObject(params)).toString()
  );
};
