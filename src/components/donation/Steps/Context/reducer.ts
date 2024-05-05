import type { Donor } from "types/aws";
import type {
  CryptoResultStep,
  DonationDetails,
  DonationState,
  DonationStep,
  SubmitStep,
  SummaryStep,
  TipFormat,
  TipStep,
  TxStatus,
} from "../types";

export type Action =
  | { type: "step"; payload: DonationStep }
  | { type: "reset" }
  | {
      type: "form";
      payload: DonationDetails;
    }
  | { type: "split"; payload: number }
  | { type: "tip"; payload: { tip: number; format: TipFormat } }
  | { type: "donor"; payload: Donor }
  | { type: "tx-status"; payload: TxStatus };

export function reducer(state: DonationState, action: Action): DonationState {
  if (action.type === "reset") {
    return { step: "donate-form", recipient: state.recipient };
  }

  if (action.type === "form") {
    const { payload } = action;
    //when changing donation method, reset
    const curr: DonationState =
      state.step === "donate-form" &&
      state.details?.method !== action.payload.method
        ? { step: "donate-form", recipient: state.recipient }
        : state;

    //skip donor,splits for stocks,daf, as not being used
    if (payload.method === "stocks" || payload.method === "daf") {
      return {
        ...curr,
        step: "submit",
        details: payload,
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
      details: payload,
    };
  }

  if (action.type === "split") {
    if (state.recipient.hide_bg_tip) {
      return {
        ...(state as SummaryStep),
        step: "summary",
        liquidSplitPct: action.payload,
      };
    }
    return {
      ...(state as TipStep),
      step: "tip",
      liquidSplitPct: action.payload,
    };
  }

  if (action.type === "tip") {
    return {
      ...(state as SummaryStep),
      step: "summary",
      tip: action.payload.tip,
      format: action.payload.format,
    };
  }

  if (action.type === "donor") {
    return {
      ...(state as SubmitStep),
      step: "submit",
      donor: action.payload,
    };
  }

  if (action.type === "tx-status") {
    return {
      ...(state as CryptoResultStep),
      step: "tx",
      status: action.payload,
    };
  }

  action.type satisfies "step";

  return { ...state, step: action.payload as any };
}
