import { EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { CreateTxOptions, Msg } from "@terra-money/terra.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { EVMTx, SimulContractTx, SimulSendNativeTx } from "./evm";
import { TagPayload } from "./third-party/redux";

// //////////// SEND TX ////////////
export type CosmosTx = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export type EstimatedTx =
  | { type: "cosmos"; val: CosmosTx }
  | {
      type: "terra";
      val: CreateTxOptions;
      signer: ConnectedWallet /**future client/provider will be included in wallet */;
    }
  | { type: "evm"; val: EVMTx };

export type SubmittedTx = { hash: string; chainID: string };

export type TxLoading = { loading: string };
export type TxError = { error: string; tx?: SubmittedTx };
export type TxSuccess = SubmittedTx & { attrValue?: string };

export type TxResult = TxError | TxSuccess;

// //////////// ESTIMATE TX ////////////
export type TxContent =
  | { type: "cosmos"; val: EncodeObject[] }
  | { type: "terra"; val: Msg[] }
  | { type: "evm"; val: SimulContractTx | SimulSendNativeTx };

export type Fee = { amount: number; symbol: string };
export type Estimate = { fee: Fee; tx: EstimatedTx };

// //////////// SENDER HOOK ////////////
export type TxSuccessMeta = {
  message: string;
  link?: { url: string; description: string };
};

export type SenderArgs = {
  tagPayloads?: TagPayload[];
  successMeta?: TxSuccessMeta;
  isAuthorized?: boolean;
  tx: TxContent;
};
