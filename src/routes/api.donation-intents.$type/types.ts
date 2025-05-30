import { picklist } from "valibot";

export const donation_types = ["stripe", "crypto", "chariot"] as const;

export const donation_type = picklist(donation_types);
export type DonationType = (typeof donation_types)[number];
