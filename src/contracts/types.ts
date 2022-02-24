import { Coins } from "@terra-money/terra.js";

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
