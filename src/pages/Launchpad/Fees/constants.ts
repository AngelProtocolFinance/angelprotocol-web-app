import { TFee } from "slices/launchpad/types";

export const keys: { [K in keyof TFee]: K } = {
  isActive: "isActive",
  receiver: "receiver",
  rate: "rate",
};
