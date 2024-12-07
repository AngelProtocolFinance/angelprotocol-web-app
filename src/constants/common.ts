import type { Increment } from "types/widget";
import { EMAIL_SUPPORT, IS_TEST } from "./env";

export const GENERIC_ERROR_MESSAGE = `An unexpected error occurred and has been reported. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

export const BYTES_IN_MB = 1e6;

export const PROCESSING_RATES = {
  chariot: 0.029,
  stripe: 0.022,
  /** $cents */
  stripe_flat: 0.3,
  crypto: 0.01,
};

export const DONATION_INCREMENTS: Increment[] = [
  { value: 40, label: "" },
  { value: 100, label: "" },
  { value: 200, label: "" },
  { value: 400, label: "" },
];
export const BG_ID = IS_TEST ? 8 : 1;

export const logoUrl = (path: string) => `https://nowpayments.io${path}`;
