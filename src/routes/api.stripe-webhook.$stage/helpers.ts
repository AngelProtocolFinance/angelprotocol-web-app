import type { StripeDonation } from "@better-giving/donation";

// One time payment intents have their own `metadata` unlike subs payment intents which comes from invoice
export function isOneTime(metadata: any): metadata is StripeDonation.Metadata {
  return Object.keys(metadata).length > 0;
}
