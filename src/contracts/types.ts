import { Coin } from "@terra-money/terra.js";
import { EndowmentStatus } from "types/services/terra/registrar";

//Contract types
export type ContractAddrs = {
  [index: string]: string;
};

export type EmbeddedWasmMsg = {
  wasm: {
    execute: {
      contract_addr: string;
      funds: Coin.Data[];
      msg: string; //base64 endocoded msg object
    };
  };
};

export type EmbeddedBankMsg = {
  bank: {
    send: {
      amount: Coin.Data[];
      to_address: string;
    };
  };
};

//Accounts
export interface Source {
  locked: string; //"0"
  liquid: string; //"0"
  vault: string; //"terra123addr"
}

export interface UpdateProfilePayload {
  //separate shape for update
  name?: string;
  overview?: string;
  un_sdg?: number;
  tier?: number;
  logo?: string;
  image?: string;
  url?: string;
  registration_number?: string;
  country_city_origin?: string;
  contact_email?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  number_of_employees?: number;
  average_annual_budget?: string;
  annual_revenue?: string;
  charity_navigator_rating?: string;
  endow_type?: string;
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
  expiry_time?: number; //unix time on seconds
  expiry_height?: number; //block height
};

export type IndexFundOwnerPayload = {
  new_owner: string;
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

export type RegistrarConfigPayload = {
  accounts_code_id?: number;
  index_fund_contract?: string; //addr
  treasury?: string; //addr
  tax_rate?: string; //decimal string
  // approved_charities?: string[];
  default_vault?: string;
  guardians_multisig_addr?: string;
  endowment_owners_group_addr?: string;
  split_max?: string; //decimal string
  split_min?: string; //decimal string
  split_default?: string; //decimal string
  halo_token?: string;
  gov_contract?: string;
  charity_shares_contract?: string;
};

export type RegistrarOwnerPayload = {
  new_owner: string;
};
