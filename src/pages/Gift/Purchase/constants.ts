import type { TError, TLoading, TxResult } from "slices/gift";

export const hashKey: keyof TxResult = "hash";
export const loadingKey: keyof TLoading = "msg";
export const errKey: keyof TError = "error";
