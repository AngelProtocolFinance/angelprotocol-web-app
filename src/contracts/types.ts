import { Coins } from "@terra-money/terra.js";
import { EndowmentStatus } from "services/terra/registrar/types";

//Contract types
export type ContractAddrs = {
  [index: string]: string;
};

export type EmbeddedWasmMsg = {
  wasm: {
    execute: {
      contract_addr: string;
      funds: Coins.Data;
      msg: string; //base64 endocoded msg object
    };
  };
};

//Accounts
export interface Source {
  locked: string; //"0"
  liquid: string; //"0"
  vault: string; //"terra123addr"
}

//Halo gov
export type Vote = "yes" | "no";

export type PollExecuteMsg = {
  order: number;
  contract: string;
  msg: string;
};

//IndexFund
export type FundDetails = {
  id: number;
  name: string;
  description: string;
  members: string[];
  rotating_fund?: boolean;
  split_to_liquid?: string; //"0.63"
  expiry_time?: number; //epoch time
  expiry_height?: number; //block height
};

export type FundListRes = {
  funds: FundDetails[];
};

export interface FundConfig {
  fund_rotation?: number;
  fund_member_limit?: number;
  funding_goal?: string;
}

//Registrar
export type StatusChangePayload = {
  endowment_addr: string;
  status: EndowmentStatus[keyof EndowmentStatus];
  beneficiary?: string;
};
