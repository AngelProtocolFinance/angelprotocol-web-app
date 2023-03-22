import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { EVMTx, SimulContractTx, SimulSendNativeTx } from "./evm";
import { TagPayload } from "./third-party/redux";

type CosmosTx = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export type SubmittedTx = { hash: string; chainID: string };

export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

export type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
export type TxSuccess = {
  success: string;
  tx?: SubmittedTx & { attribute?: string };
};

export type EstimatedTx =
  | { type: "cosmos"; val: CosmosTx }
  | { type: "terra"; val: CreateTxOptions; wallet: ConnectedWallet }
  | { type: "evm"; val: EVMTx };

export type TxToSend =
  | { type: "cosmos"; val: EncodeObject[] }
  | { type: "terra"; val: Msg[] }
  | { type: "evm"; val: SimulContractTx | SimulSendNativeTx };

export type TxResult = TxError | TxSuccess;

export type SenderArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  isAuthorized?: boolean;
  tx: TxToSend;
};
