import type { TDonateMethod } from "types/components";
import type { DonateMethodId } from "types/lists";

const methodDetails: {
  [K in DonateMethodId]: Pick<TDonateMethod, "name" | "tooltip">;
} = {
  crypto: { name: "Crypto" },
  daf: { name: "DAF", tooltip: "requires card payment and must be next to it" },
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

export function order<T extends DonateMethodId | TDonateMethod>(arr: T[]): T[] {
  const getId = (item: T): DonateMethodId =>
    typeof item === "object" ? item.id : item;

  const result = [...arr];
  const stripeIndex = result.findIndex((item) => getId(item) === "stripe");
  const dafIndex = result.findIndex((item) => getId(item) === "daf");

  if (stripeIndex !== -1 && dafIndex !== -1) {
    // Remove 'daf' from its current position
    const [daf] = result.splice(dafIndex, 1);

    // Insert 'daf' next to 'stripe'
    const newStripeIndex = result.findIndex((item) => getId(item) === "stripe");
    result.splice(newStripeIndex + 1, 0, daf);
  }

  return result;
}
