import { EMAIL_SUPPORT } from "./env";

export const GENERIC_ERROR_MESSAGE = `An unexpected error occurred and has been reported. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;

export const BYTES_IN_MB = 1e6;

export const PROCESSING_RATES = {
  chariot: 0.029,
  stripe: 0.024,
  crypto: {
    ethereum: 0.02,
    evm: 0.01,
    cosmos: 0.01,
    others: 0.015,
  },
};

export const DONATION_INCREMENTS = [40, 100, 200];
