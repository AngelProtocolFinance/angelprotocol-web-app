import type { IInterestLog as FV } from "@better-giving/liquid";
export {
  type IInterestLog as FV,
  interest_log as fv,
} from "@better-giving/liquid/schemas";

export interface FormState {
  type: "form";
  fv?: FV;
  shares?: Record<string, number>;
}

export interface ReviewState {
  type: "review";
  fv: FV;
  shares: Record<string, number>;
}

export type State = FormState | ReviewState;
