import { EndowmentType } from "./common";

export type RegistrarConfig = {
  owner: string;
  guardians_multisig_addr?: string;
  endowment_owners_group_addr?: string;
  version: string;
  accounts_code_id: number;
  treasury: string;
  tax_rate: string; //decimal string
  default_vault?: string;
  index_fund?: string;
  split_to_liquid: { min: string; max: string; default: string };
  halo_token?: string;
  gov_contract?: string;
  shares_contract?: string;
};

export type VaultRateInfo = {
  vault_addr: string; //"juno172u..
  fx_rate: string; //"1.206784043460040765"
};

type AccountType = "locked" | "liquid";

export type VaultListOptions = {
  network?: string;
  endowment_type?: Capitalize<EndowmentType>;
  acct_type?: AccountType;
  approved?: boolean;
  start_after?: string;
  limit?: number;
};

export type YieldVault = {
  address: string;
  network: string; // Points to key in NetworkConnections storage map
  input_denom: string;
  yield_token: string;
  approved: boolean;
  restricted_from: EndowmentType[];
  acct_type: AccountType;
};

export type VaultListRes = {
  vaults: YieldVault[];
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
  shares_contract?: string;
};

export type RegistrarOwnerPayload = {
  new_owner: string;
};
