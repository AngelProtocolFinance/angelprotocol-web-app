import type { INpo } from "@better-giving/endowment";
import { Copier } from "components/copier";
import { clean_object } from "helpers/clean-object";
import { href } from "react-router";
import type { IWidgetFv, IWidgetSearch } from "types/widget";

type Props = {
  classes?: string;
  fv: IWidgetFv;
  endow?: INpo;
  base_url: string;
};
export function Snippet({ classes = "", fv, endow, base_url }: Props) {
  const widget_url = widget_url_fn(fv, base_url, endow?.id);
  const iframe_url = endow?.id
    ? /** allow payment https://docs.stripe.com/payments/payment-methods/pmd-registration?dashboard-or-api=dashboard#using-an-iframe */
      `<iframe src="${widget_url}" width="700" height="900" allow="payment" style="border: 0px;"></iframe>`
    : "Please select organization";

  return (
    <div className={classes}>
      <h2 className="text-lg @4xl/widget:text-2xl mb-3">
        Copy / paste this code snippet:
      </h2>
      <div className="flex items-center justify-center gap-x-4 max-w-xl px-10 rounded-sm bg-gray-l3 dark:bg-blue-d4">
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
const widget_url_fn = (fv: IWidgetFv, base_url: string, npo_id = 0) => {
  const params: Required<IWidgetSearch> = {
    isDescriptionTextShown: fv.is_description_text_shown ? "true" : "false",
    methods: fv.methods
      .filter((m) => !m.disabled)
      .map((m) => m.id)
      .join(","),
    isTitleShown: fv.is_title_shown ? "true" : "false",
    title: fv.title ?? "",
    programId: fv.program.value,
    description: fv.description ?? "",
    accentPrimary: fv.accent_primary ?? "",
    accentSecondary: fv.accent_secondary ?? "",
    increments: fv.increments.map((inc) => inc.value).join(","),
    descriptions: fv.increments
      .map((inc) => inc.label.replace(/,/g, "_"))
      .join(","),
  };
  return `${
    base_url + href("/donate-widget/:id", { id: npo_id.toString() })
  }?${new URLSearchParams(clean_object(params)).toString()}`;
};
