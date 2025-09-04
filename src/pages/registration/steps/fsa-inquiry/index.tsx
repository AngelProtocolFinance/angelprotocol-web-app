import type { IReg } from "@better-giving/reg";
import { useLoaderData } from "@remix-run/react";
import { NotTaxExempt } from "./not-tax-exempt";
import { PossiblyTaxExempt } from "./possibly-tax-exempt";

import { step_loader } from "../../data/step-loader";
import { next_step } from "../../routes";
import { update_action } from "../update-action";

export { ErrorBoundary } from "components/error";
export const loader = step_loader(3);
export const action = update_action(next_step[3]);

const country_white_list = ["United States"]; //will add more in the future;
export default function Page() {
  const {
    o_hq_country: hq = "ensured in loader",
    o_type,
    claim_init,
  } = useLoaderData() as IReg;

  const possibly_tax_exempt = country_white_list.includes(hq);

  if (!possibly_tax_exempt) {
    return <NotTaxExempt country={hq} is_fsa_prev={o_type === "other"} />;
  }

  return (
    <PossiblyTaxExempt
      is_501c3_init={claim_init != null}
      is_501c3_prev={o_type === "501c3"}
    />
  );
}
