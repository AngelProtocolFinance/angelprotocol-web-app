import type { Schema } from "./form/types";

export interface FormState {
  type: "form";
  data?: Schema;
}

export interface ReviewState {
  type: "review";
  data: Schema;
}

export type State = FormState | ReviewState;
