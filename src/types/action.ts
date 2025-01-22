import type { SubmissionResult } from "@conform-to/react";

const err_key = "__err" as const;
export const ok_key = "__ok" as const;
interface Err {
  [err_key]: string;
}

export interface Ok {
  [ok_key]: string;
}

export type ActionData<T = Ok> = Err | SubmissionResult | undefined | T;

export const isErr = (data: ActionData<any>): data is Err =>
  data != null && typeof data === "object" && err_key in data;
export const isFormErr = (data: ActionData<any>): data is SubmissionResult =>
  data != null && typeof data === "object" && "status" in data;
export const isData = <T>(data: ActionData<T>): data is NoInfer<T> =>
  data != null && !isErr(data) && !isFormErr(data);
export const isOk = (data: ActionData<unknown>): data is Ok =>
  isData(data) && ok_key in (data as Ok);
