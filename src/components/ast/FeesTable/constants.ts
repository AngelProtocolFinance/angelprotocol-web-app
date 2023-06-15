import { Fee } from "types/ast";

export const feeKeys: { [K in keyof Fee]: K } = {
  isActive: "isActive",
  receiver: "receiver",
  rate: "rate",
};
