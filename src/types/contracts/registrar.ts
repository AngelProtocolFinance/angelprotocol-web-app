import { CW4Member, Threshold } from ".";
import { Profile } from "./account";

export type EndowmentStatus = {
  Inactive: 0;
  Approved: 1;
  Frozen: 2;
  Closed: 3;
};

export type EndowmentType = "charity" | "normal";
export type EndowmentStatusNum = EndowmentStatus[keyof EndowmentStatus];
export type EndowmentStatusStrNum = `${EndowmentStatusNum}`;

export type EndowmentTier = "Level1" | "Level2" | "Level3";
export type EndowmentTierNum = 1 | 2 | 3;
export type EndowmentEntry = {
  id: number; //int
  owner: String;
  status: keyof EndowmentStatus;
  endow_type: Capitalize<EndowmentType>;
  name?: string;
  logo?: string;
  image?: string;
  tier?: EndowmentTier;
  un_sdg?: number;
};

export type CategorizedEndowments = {
  [index: number]: EndowmentEntry[];
};

export type EndowmentQueryOptions = {
  name?: string;
  owner?: string;
  status?: EndowmentStatusStrNum;
  tier?: EndowmentTier;
  endow_type?: EndowmentType;
};

export interface EndowmentQueryMsg {
  address: string;
  msg: {
    endowment_list: EndowmentQueryOptions;
  };
}

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
  charity_shares_contract?: string;
};

export type VaultRateInfo = {
  vault_addr: string; //"juno172u..
  fx_rate: string; //"1.206784043460040765"
};

type AccountType = "locked" | "liquid";

export type VaultListOptions = {
  network?: string;
  endowment_type?: EndowmentType;
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

export type StatusChangePayload = {
  endowment_id: number;
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

export type RegistrarCreateEndowmentPayload = {
  owner: string;
  beneficiary: string;
  withdraw_before_maturity: false;
  maturity_time: undefined; //don't set maturity for charities
  maturity_height: undefined; ///don't set maturity for charities
  profile: Profile;
  cw4_members: CW4Member[];
  kyc_donors_only: boolean;
  cw3_threshold: Threshold;
  cw3_max_voting_period: 86400; //seconds - 24H
};
