import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { TagPayload } from "services/types";
import { TxResponse } from "types/cosmos";
import { Tx } from "types/utils";

export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

export type TxLoading = { loading: string };
export type TxError = { error: string; tx?: Tx; report?: string };
export type TxSuccess = {
  success: TxSuccessMeta;
  tx?: Tx;
};

export type TxState = TxLoading | TxError | TxSuccess;

export type TxOnSuccess = (res: TxResponse, chainId: string) => void;

export type TxArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  msgs: Any[];
  onSuccess?: TxOnSuccess;
};
