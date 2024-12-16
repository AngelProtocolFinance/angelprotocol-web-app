import type { SubmissionResult } from "@conform-to/react";

export type ActionData<T> =
  | { __error: string }
  | SubmissionResult
  | undefined
  | T;

export const isActionErr = (
  data: ActionData<any>
): data is { __error: string } =>
  data && typeof data === "object" ? "__error" in data : false;
export const isValiErr = (data: ActionData<any>): data is SubmissionResult =>
  data && typeof data === "object" ? "status" in data : false;

export const isData = <T>(data: ActionData<T>): data is T =>
  !!data && !isActionErr(data) && !isValiErr(data);
