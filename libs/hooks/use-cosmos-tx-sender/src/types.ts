import { EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { Chain } from "@ap/types/aws";
import { TagPayload } from "@ap/types/services";

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
