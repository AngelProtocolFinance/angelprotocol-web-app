import { TxError, TxLoading, TxState, TxSuccess } from "./types";

export function isLoading(state: TxState): state is TxLoading {
  const key: keyof TxLoading = "loading";
  return key in state;
}

export function isError(state: TxState): state is TxError {
  const key: keyof TxError = "error";
  return key in state;
}

export function isSuccess(state: TxState): state is TxSuccess {
  const key: keyof TxSuccess = "success";
  return key in state;
}
