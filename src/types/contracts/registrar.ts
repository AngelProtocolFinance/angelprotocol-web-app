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

export type RegistrarConfigExtension = {
  accounts_contract?: string;
  accounts_settings_controller?: string;
  applications_review: string;
  charity_shares_contract?: string;
  collector_addr: string;
  cw3_code?: number;
  cw4_code?: number;
  donation_match_charites_contract?: string;
  donation_match_code?: number;
  gov_contract?: string;
  halo_token_lp_contract?: string;
  halo_token?: string;
  index_fund?: string;
  subdao_bonding_token_code?: number;
  subdao_cw20_token_code?: number;
  subdao_cw900_code?: number;
  subdao_distributor_code?: number;
  subdao_gov_code?: number;
  swap_factory?: string;
  swaps_router?: string;
};

export type RegistrarConfig = {
  owner: string;
  version: string;
  treasury: string;
  rebalance: RebalanceDetails;
  split_to_liquid: SplitDetails;
  accepted_tokens: AcceptedTokens;
  axelar_gateway: string;
  axelar_ibc_channel: string;
  axelar_chain_id: string;
};

export type RegistrarConfigExtensionPayload = {
  accounts_contract?: string;
  accounts_settings_controller?: string;
  applications_review?: string;
  charity_shares_contract?: string;
  collector_addr?: string;
  donation_match_charites_contract?: string;
  fundraising_contract?: string;
  gov_contract?: string;
  halo_token_lp_contract?: string;
  halo_token?: string;
  index_fund_contract?: string;
  swap_factory?: string;
  swaps_router?: string;
  /// WASM CODES
  cw3_code?: number;
  cw4_code?: number;
  donation_match_code?: number; // donation matching contract wasm code
  subdao_bonding_token_code?: number; // subdao gov token (w/ bonding-curve) wasm code
  subdao_cw20_token_code?: number; // subdao gov token (basic CW20) wasm code
  subdao_cw900_code?: number; // subdao gov ve-CURVE contract for locked token voting
  subdao_distributor_code?: number; // subdao gov fee distributor wasm code
  subdao_gov_code?: number; // subdao gov wasm code
};

export type RegistrarOwnerPayload = {
  new_owner: string;
};
