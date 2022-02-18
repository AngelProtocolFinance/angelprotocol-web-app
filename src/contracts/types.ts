import { Coins } from "@terra-money/terra.js";

export enum sc {
  index_fund = "index_fund",
  registrar = "registrar",
  anchor = "anchor",
  anchor_vault1 = "anchor_vault1",
  anchor_vault2 = "anchor_vault2", //mainnet doesn't have anchor vault2
  apCW4 = "apCW4",
  apCW3 = "apCW3",
  gaCW3 = "gaCW3", //guardian angels CW3
  coCW4 = "coCW4", //charity owner CW4
  halo_token = "halo_token",
  halo_gov = "halo_gov",
  airdrop = "airdrop",
  lbp_factory = "lbp_factory",
  lbp_pair = "lbp_pair",
  lbp_router = "lbp_router",
  lbp_lp = "lbp_lp",
  loop_factory = "loop_factory",
  loop_router = "loop_router",
  loop_haloust_pair = "loop_haloust_pair",
  loop_haloust_lp = "loop_haloust_lp",
}

export type URLs = {
  [index: string]: string;
};

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

//Index Fund types
export type Donation = { address: string; total_ust: string };
export interface Donors {
  donors: Donation[];
}

//Registrar types
export type SplitConfig = { max: string; min: string; default: string };
export interface SplitRes {
  split_to_liquid: SplitConfig;
}

export type Endowment = { address: string; status: string };
export type Endowments = { endowments: Endowment[] };

//Accounts
export interface Source {
  locked: string; //"0"
  liquid: string; //"0"
  vault: string; //"terra123addr"
}

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
