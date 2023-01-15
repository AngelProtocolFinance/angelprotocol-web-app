import type { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
import { TagPayload } from "services/types";
import { TxResponse } from "types/cosmos";

export type Tx = { hash: string; chainID: string };

export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

export type TxLoading = { loading: string };
export type TxError = { error: string; tx?: Tx };
export type TxSuccess = {
  success: TxSuccessMeta;
  tx: Tx & { rawLog?: string };
};

export type TxState = TxLoading | TxError | TxSuccess;

export type TxOnSuccess = (res: TxResponse, chainId: string) => void;

export type TxArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  msgs: Any[];
  onSuccess?: TxOnSuccess;
};
