import type { FieldErrors, FieldValues } from "react-hook-form";

/** based on ReturnData (not exported from react-hook-form) */
export interface IFormInvalid<T extends FieldValues = {}> {
  errors: FieldErrors<T>;
  receivedValues: Partial<T>;
}

const err_key = "__err" as const;
export const ok_key = "__ok" as const;
interface Err {
  [err_key]: string;
}

export interface Ok {
  [ok_key]: string;
}

export type ActionData<T = Ok> = Err | IFormInvalid<any> | undefined | T;

export const is_err = (data: ActionData<any>): data is Err =>
  data != null && typeof data === "object" && err_key in data;
export const is_form_err = (data: ActionData<any>): data is IFormInvalid<any> =>
  data != null && typeof data === "object" && "errors" in data;
export const is_data = <T>(data: ActionData<T>): data is NoInfer<T> =>
  data != null && !is_err(data) && !is_form_err(data);
export const is_ok = (data: ActionData<unknown>): data is Ok =>
  is_data(data) && ok_key in (data as Ok);
