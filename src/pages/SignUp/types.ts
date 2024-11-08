import type { SubmissionResult } from "@conform-to/dom";
import type { SignUp } from "types/auth";

export interface CodeRecipientEmail {
  /** lowercased */
  raw: string;
  obscured: string;
}

export interface InitState {
  type: "init";
}

export interface ConfirmState {
  type: "confirm";
  codeRecipientEmail: CodeRecipientEmail;
}

export interface SuccessState {
  type: "success";
}

export type SignupState = InitState | ConfirmState | SuccessState;
export type StateSetter = React.Dispatch<React.SetStateAction<SignupState>>;

export type FormValues = SignUp;

export type ActionData =
  | { __error: string }
  | SubmissionResult
  | undefined
  | { state: SignupState };

export const isActionErr = (data: ActionData): data is { __error: string } =>
  data ? "__error" in data : false;
export const isValiErr = (data: ActionData): data is SubmissionResult =>
  data ? "status" in data : false;
