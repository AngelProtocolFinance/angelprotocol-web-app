import type { TDonateMethod } from "types/components";
import type { DonateMethodId } from "types/lists";

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

export function order<T extends DonateMethodId | TDonateMethod>(arr: T[]): T[] {
  const getId = (item: T): DonateMethodId =>
    typeof item === "object" ? item.id : item;

  const result = [...arr];
  const stripeIndex = result.findIndex((item) => getId(item) === "stripe");
  const dafIndex = result.findIndex((item) => getId(item) === "daf");

  if (stripeIndex !== -1 && dafIndex !== -1) {
    const stripe = result[stripeIndex];
    const daf = result[dafIndex];

    // Remove both items
    result.splice(Math.max(stripeIndex, dafIndex), 1);
    result.splice(Math.min(stripeIndex, dafIndex), 1);

    // If 'daf' was first or it's just 'stripe' and 'daf', put 'stripe' first, then 'daf'
    if (dafIndex === 0 || result.length === 0) {
      result.unshift(daf);
      result.unshift(stripe);
    } else {
      // Otherwise, insert 'stripe' then 'daf' at the position of the first removed item
      const insertIndex = Math.min(stripeIndex, dafIndex);
      result.splice(insertIndex, 0, stripe, daf);
    }
  }

  return result;
}
