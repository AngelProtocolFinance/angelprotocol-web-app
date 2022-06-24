import {
  MsgExecuteContractEncodeObject,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { Coin, EncodeObject } from "@cosmjs/proto-signing";
import { StdFee } from "@cosmjs/stargate";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";

export type Tx = {
  msgs: EncodeObject[];
  fee: StdFee;
};

export { MsgExecuteContract, SigningCosmWasmClient };
export type { MsgExecuteContractEncodeObject, EncodeObject, Coin, StdFee };
