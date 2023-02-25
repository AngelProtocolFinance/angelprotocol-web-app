import { GiftCard, TError, TLoading, TxResult } from "@giving/slices/gift";

export const hashKey: keyof TxResult = "hash";
export const secretKey: keyof GiftCard = "secret";
export const loadingKey: keyof TLoading = "msg";
export const errKey: keyof TError = "error";
