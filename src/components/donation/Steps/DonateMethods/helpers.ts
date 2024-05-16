import type { DonationDetails, DonationState, FormStep } from "../types";

export const isNewMethod = (
  prev: DonationState,
  method: NonNullable<FormStep["details"]>["method"]
) => prev.step === "donate-form" && prev.details?.method !== method;

export const nextFormState = (
  prev: DonationState,
  details: DonationDetails
): DonationState => {
  const { init } = prev;

  if (init.widgetConfig?.splitDisabled) {
    return {
      ...prev,
      details,
      //also skip tip if applicable
      step: init.recipient.hide_bg_tip ? "summary" : "tip",
      tip: undefined,
      liquidSplitPct: init.widgetConfig.liquidSplitPct,
    };
  }
  return { ...prev, details, step: "splits" };
};
