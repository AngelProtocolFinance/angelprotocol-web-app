import type { IInterestLog as FV } from "lib/liquid";
export {
  type IInterestLog as FV,
  interest_log as fv,
} from "lib/liquid/schemas";

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
