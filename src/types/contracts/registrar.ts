import { CapitalizedEndowmentType, EndowmentType } from "./common";

export type RebalanceDetails = {
  rebalance_liquid_invested_profits: boolean;
  locked_interests_to_liquid: boolean;
  interest_distribution: string;
  locked_principle_to_liquid: boolean;
  principle_distribution: string;
};

export type SplitDetails = {
  max: string;
  min: string;
  default: string;
};

export type AcceptedTokens = {
  native: string[];
  cw20: string[];
};

export type RegistrarConfig = {
  owner: string;
  applications_review: string;
  applications_impact_review: string;
  index_fund?: string;
  accounts_contract?: string;
  treasury: string;
  rebalance: RebalanceDetails;
  split_to_liquid: SplitDetails;
  halo_token?: string;
  gov_contract?: string;
  charity_shares_contract?: string;
  swaps_router?: string;
  cw3_code?: number;
  cw4_code?: number;
  accepted_tokens: AcceptedTokens;
};

export type VaultRateInfo = {
  vault_addr: string; //"juno172u..
  fx_rate: string; //"1.206784043460040765"
};

type AccountType = "locked" | "liquid";

export type VaultListOptions = {
  network?: string;
  endowment_type?: CapitalizedEndowmentType;
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
  accounts_contract?: string;
  index_fund_contract?: string;
  treasury?: string;
  split_max?: string; //decimal string
  split_min?: string; //decimal string
  split_default?: string; //decimal string
  halo_token?: string;
  gov_contract?: string;
  charity_shares_contract?: string;
  rebalance?: RebalanceDetails;
  cw3_code?: number;
  cw4_code?: number;
  accepted_tokens_native?: string[];
  accepted_tokens_cw20?: string[];
  applications_review?: string;
  applications_impact_review?: string;
  swaps_router?: string;
};

export type RegistrarOwnerPayload = {
  new_owner: string;
};
