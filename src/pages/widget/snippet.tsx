import type { INpo } from "@better-giving/endowment";
import { Copier } from "components/copier";
import { clean_object } from "helpers/clean-object";
import { href } from "react-router";
import type { WidgetConfig, WidgetURLSearchParams } from "types/widget";

type Props = {
  classes?: string;
  config: WidgetConfig;
  endow?: INpo;
  base_url: string;
};
export function Snippet({ classes = "", config, endow, base_url }: Props) {
  const widget_url = widget_url_fn(config, base_url, endow?.id);
  const iframe_url = endow?.id
    ? /** allow payment https://docs.stripe.com/payments/payment-methods/pmd-registration?dashboard-or-api=dashboard#using-an-iframe */
      `<iframe src="${widget_url}" width="700" height="900" allow="payment" style="border: 0px;"></iframe>`
    : "Please select organization";

  return (
    <div className={classes}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Copy / paste this code snippet:
      </h2>
      <div className="flex items-center justify-center gap-x-4 max-w-xl px-10 rounded-sm bg-gray-l3 dark:bg-blue-d4 @4xl/widget:mx-auto">
        <div className="w-full text-sm sm:text-base font-mono break-all py-4">
          {iframe_url}
        </div>
        <Copier
          classes={{ icon: "w-10 h-10 hover:text-blue-d1" }}
          text={iframe_url}
        />
      </div>
    </div>
  );
}

//create URLSearchParams from config
const widget_url_fn = (config: WidgetConfig, base_url: string, npo_id = 0) => {
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
  return `${
    base_url + href("/donate-widget/:id", { id: npo_id.toString() })
  }?${new URLSearchParams(clean_object(params)).toString()}`;
};
