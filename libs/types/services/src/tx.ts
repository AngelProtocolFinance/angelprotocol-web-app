import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { TagPayload } from "@ap/types";
import { Chain } from "@ap/types/aws";

export type Tx = { hash: string; chainID: string };

export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

export type TxLoading = { loading: string };
export type TxError = { error: string; tx?: Tx };
export type TxSuccess = {
  success: TxSuccessMeta;
  tx?: Tx & { rawLog?: string };
};

export type TxState = TxLoading | TxError | TxSuccess;

export type TxOnSuccess = (res: DeliverTxResponse, chain: Chain) => void;

export type TxArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  isAuthorized?: boolean;
  msgs: EncodeObject[];
  onSuccess?(res: DeliverTxResponse, chain: Chain): void;
};

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
