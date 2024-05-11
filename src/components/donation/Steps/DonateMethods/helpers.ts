import type { DonationState, FormStep } from "../types";

export const isNewMethod = (
  prev: DonationState,
  method: NonNullable<FormStep["details"]>["method"]
) => prev.step === "donate-form" && prev.details?.method !== method;
