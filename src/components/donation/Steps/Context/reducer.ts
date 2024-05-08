import type {
  CryptoResultStep,
  DonationState,
  DonationStep,
  SubmitStep,
  SummaryStep,
  TipStep,
  Update,
} from "../types";

export function reducer(state: DonationState, update: Update): DonationState {
  if (update === "reset") {
    return {
      step: "donate-form",
      recipient: state.recipient,
      config: state.config,
      intentId: state.intentId,
    };
  }

  if ("method" in update) {
    //when changing donation method, reset
    const curr: DonationState =
      state.step === "donate-form" && state.details?.method !== update.method
        ? {
            step: "donate-form",
            recipient: state.recipient,
            config: state.config,
            intentId: state.intentId,
          }
        : state;

    //skip donor,splits for stocks,daf, as not being used
    if (update.method === "stocks" || update.method === "daf") {
      return {
        ...curr,
        step: "submit",
        details: update,
        //these steps where skipped so provide placeholders
        tip: 0,
        format: "pct",
        donor: { firstName: "", lastName: "", email: "" },
        liquidSplitPct: 50,
      };
    }

    return {
      ...curr,
      step: "splits",
      details: update,
    };
  }

  if ("liquidSplitPct" in update) {
    if (state.recipient.hide_bg_tip) {
      return {
        ...(state as SummaryStep),
        step: "summary",
        liquidSplitPct: update.liquidSplitPct,
      };
    }
    return {
      ...(state as TipStep),
      step: "tip",
      liquidSplitPct: update.liquidSplitPct,
    };
  }

  if ("tip" in update) {
    return {
      ...(state as SummaryStep),
      step: "summary",
      tip: update.tip,
      format: update.format,
    };
  }

  if ("donor" in update) {
    return {
      ...(state as SubmitStep),
      step: "submit",
      donor: update.donor,
    };
  }

  if ("txStatus" in update) {
    return {
      ...(state as CryptoResultStep),
      step: "tx",
      status: update.txStatus,
    };
  }

  update satisfies { step: DonationStep };

  return { ...state, step: update.step as any };
}
