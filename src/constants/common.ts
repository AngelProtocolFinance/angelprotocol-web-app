import type { IAllocation } from "@better-giving/donation/schema";
import type { IIncrement } from "@better-giving/schemas";
import { EMAIL_SUPPORT } from "./env";

export const GENERIC_ERROR_MESSAGE = `An unexpected error occurred and has been reported. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

export const BYTES_IN_MB = 1e6;

export const PROCESSING_RATES = {
  chariot: 0.029,
  stripe: 0.022,
  /** $cents */
  stripe_flat: 0.3,
  paypal: 0.0199,
  paypal_flat: 0.49,
  crypto: 0.01,
};

export const DONATION_INCREMENTS: IIncrement[] = [
  { value: "40", label: "" },
  { value: "100", label: "" },
  { value: "200", label: "" },
  { value: "400", label: "" },
];

export const default_allocation: IAllocation = {
  liq: 100,
  cash: 0,
  lock: 0,
};

export const logo_url = (path: string, custom = false) =>
  custom ? path : `https://nowpayments.io${path}`;

export const emails = {
  tim: "tim@better.giving",
  hi: "hi@better.giving",
};
