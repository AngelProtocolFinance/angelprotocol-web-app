import type { OnHoldDonation, StripeDonation } from "@better-giving/donation";
import type Stripe from "stripe";

import type { Entries } from "type-fest";
export const build_metadata = (
  order: OnHoldDonation.FiatDBRecord
): StripeDonation.Metadata => {
  const obj: Stripe.Metadata = {};
  const entries = Object.entries(order) as Entries<OnHoldDonation.FiatDBRecord>;
  for (const [k, v] of entries) {
    const key = k.toString();
    if (v == null) continue;
    if (Array.isArray(v)) {
      obj[key] = v.join(",");
      continue;
    }
    if (typeof v === "object") {
      obj[key] = JSON.stringify(v);
      continue;
    }
    obj[key] = String(v);
  }
  return obj as StripeDonation.Metadata;
};
