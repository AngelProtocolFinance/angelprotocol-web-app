import type { DonateMethodId } from "@better-giving/endowment";
import type { TDonateMethod } from "types/components";
import { all_method_ids as all } from "../donation";

const method_details: {
  [K in DonateMethodId]: Pick<TDonateMethod, "name">;
} = {
  crypto: { name: "Crypto" },
  daf: { name: "DAF" },
  stocks: { name: "Stocks" },
  stripe: { name: "Card/Bank" },
};
const to_methods = (
  ids: DonateMethodId[],
  disabled = false
): TDonateMethod[] => {
  return ids.map((id) => ({
    id,
    name: method_details[id].name,
    disabled,
  }));
};

export function fill(sub = all): TDonateMethod[] {
  const existing = sub.filter((x) => all.includes(x));
  const missing = all.filter((x) => !sub.includes(x));
  return to_methods(existing).concat(to_methods(missing, true));
}
