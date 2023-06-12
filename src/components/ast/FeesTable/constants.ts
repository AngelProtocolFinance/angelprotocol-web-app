import { Fee } from "types/ast";

export const keys: { [K in keyof Fee]: K } = {
  isActive: "isActive",
  receiver: "receiver",
  rate: "rate",
};
