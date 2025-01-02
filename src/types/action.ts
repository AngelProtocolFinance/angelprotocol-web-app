import type { SubmissionResult } from "@conform-to/react";

const err_key = "__err" as const;
const ok_key = "__ok" as const;
interface Err {
  [err_key]: string;
}
export type ActionData<T = { [ok_key]: string }> =
  | Err
  | SubmissionResult
  | undefined
  | T;

export const isErr = (data: ActionData<any>): data is Err =>
  data && typeof data === "object" ? err_key in data : false;
export const isFormErr = (data: ActionData<any>): data is SubmissionResult =>
  data && typeof data === "object" ? "status" in data : false;
export const isData = <T>(data: ActionData<T>): data is T =>
  !!data && !isErr(data) && !isFormErr(data);
