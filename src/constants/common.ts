import type { Allocation } from "@better-giving/donation/schema";
import type { Increment } from "types/widget";
import { EMAIL_SUPPORT, IS_TEST } from "./env";

export const GENERIC_ERROR_MESSAGE = `An unexpected error occurred and has been reported. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

export const BYTES_IN_MB = 1e6;

export const PROCESSING_RATES = {
  chariot: 0.04,
  stripe: 0.04,
  /** $cents */
  stripe_flat: 0.3,
  crypto: 0.04,
};

export const DONATION_INCREMENTS: Increment[] = [
  { value: 40, label: "" },
  { value: 100, label: "" },
  { value: 200, label: "" },
  { value: 400, label: "" },
];
export const BG_ID = IS_TEST ? 8 : 1;

export const default_allocation: Allocation = {
  liq: 100,
  cash: 0,
  lock: 0,
};

export const logo_url = (path: string, custom = false) =>
  custom ? path : `https://nowpayments.io${path}`;
