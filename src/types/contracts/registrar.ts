import { SplitDetails } from "./common";

export type RebalanceDetails = {
  rebalance_liquid_invested_profits: boolean;
  locked_interests_to_liquid: boolean;
  interest_distribution: string;
  locked_principle_to_liquid: boolean;
  principle_distribution: string;
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
