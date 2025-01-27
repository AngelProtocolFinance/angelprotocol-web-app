import type { DonateMethodId } from "@better-giving/endowment";
import type { TDonateMethod } from "types/components";

const methodDetails: {
  [K in DonateMethodId]: Pick<TDonateMethod, "name" | "tooltip">;
} = {
  crypto: { name: "Crypto" },
  daf: { name: "DAF", tooltip: "requires card payment" },
  stocks: { name: "Stocks" },
  stripe: { name: "Card/Bank" },
};
const toMethods = (
  ids: DonateMethodId[],
  disabled = false
): TDonateMethod[] => {
  const withDaf = ids.includes("daf");
  return ids.map((id) => ({
    id,
    name: methodDetails[id].name,
    disabled,
    tooltip: methodDetails[id].tooltip,
    locked: id === "stripe" ? withDaf : undefined,
  }));
};

const all: DonateMethodId[] = ["stripe", "stocks", "daf", "crypto"];

export function fill(sub = all): TDonateMethod[] {
  const existing = sub.filter((x) => all.includes(x));
  const missing = all.filter((x) => !sub.includes(x));
  return toMethods(existing).concat(toMethods(missing, true));
}
