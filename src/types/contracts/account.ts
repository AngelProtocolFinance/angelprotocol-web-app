import { Coin } from "types/cosmos";
import {
  Asset,
  CapitalizedEndowmentType,
  Categories,
  EndowmentStatus,
  EndowmentTier,
  EndowmentType,
  SocialMedialUrls,
} from "./common";
import { CW20 } from "./cw20";

export interface GenericBalance {
  native: Coin[];
  cw20: CW20[];
}

export interface BalanceInfo {
  locked: GenericBalance;
  liquid: GenericBalance;
}

type VaultWithBalance = [string /** vauld addr */, string /** vault balance */];

export interface EndowmentBalance {
  tokens_on_hand: BalanceInfo;
  oneoff_locked: VaultWithBalance[];
  oneoff_liquid: VaultWithBalance[];
  strategies_locked: VaultWithBalance[];
  strategies_liquid: VaultWithBalance[];
}

interface RebalanceDetails {
  rebalance_liquid_invested_profits: boolean; // should invested portions of the liquid account be rebalanced?
  locked_interests_to_liquid: boolean; // should Locked acct interest earned be distributed to the Liquid Acct?
  interest_distribution: string; // % of Locked acct interest earned to be distributed to the Liquid Acct
  locked_principle_to_liquid: boolean; // should Locked acct principle be distributed to the Liquid Acct?
  principle_distribution: string; // % of Locked acct principle to be distributed to the Liquid Acct
}

export interface Strategy {
  vault: string; // Vault SC Address
  percentage: string; // percentage of funds to invest
}

type Vaults<T> = {
  liquid: T;
  locked: T;
};

export type AccountStrategies = Vaults<Strategy[]>;
type OneOffVaults = Vaults<string[]>;

export interface EndowmentDetails {
  owner: string;
  status: EndowmentStatus;
  endow_type: CapitalizedEndowmentType;
  withdraw_before_maturity: boolean;
  maturity_time?: number;
  maturity_height?: number;
  strategies: AccountStrategies;
  oneoff_vaults: OneOffVaults;
  rebalance: RebalanceDetails;
  kyc_donors_only: boolean;
  deposit_approved: boolean;
  withdraw_approved: boolean;
  pending_redemptions: number;
  logo?: string;
  image?: string;
  name: string;
  categories: Categories;
  tier?: number;
  copycat_strategy?: number;
  proposal_link?: number;
}

export type Holding = { address: string; amount: string };
export interface Holdings {
  locked_native: Holding[];
  locked_cw20: Holding[];
  liquid_native: Holding[];
  liquid_cw20: Holding[];
  is_placeholder?: true;
}

export interface Source {
  locked: string; //"0"
  liquid: string; //"0"
  vault: string; //"juno123addr.."
}

export type EndowmentQueryOptions = {
  proposal_link?: number;
  start_after?: number;
  limit?: number;
};

export type EndowmentEntry = {
  id: number; //int
  owner: String;
  status: keyof EndowmentStatus;
  endow_type: CapitalizedEndowmentType;
  name: string;
  logo: string;
  image: string;
  tier: EndowmentTier;
  categories: Categories;
};

export interface ProfileResponse {
  name: string; // name of the Charity Endowment
  overview: string;
  categories: Categories;
  tier: number;
  logo: string;
  image: string;
  url?: string;
  registration_number?: string;
  country_of_origin?: string;
  street_address?: string;
  contact_email?: string;
  social_media_urls: SocialMedialUrls;
  number_of_employees?: number;
  // average_annual_budget?: string;
  // annual_revenue?: string;
  charity_navigator_rating?: string;
}

export interface ProfileUpdate {
  //separate shape for update
  id: number;
  overview: string;
  url: string;
  registration_number?: string;
  country_of_origin?: string;
  street_address?: string;
  contact_email?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  // number_of_employees?: number;s
  // average_annual_budget?: string;
  // annual_revenue?: string;
  // charity_navigator_rating?: string;
}

export interface EndowmentSettingsPayload {
  id: number;
  owner?: string;
  kyc_donors_only?: boolean;
  endow_type?: EndowmentType; //editable by config.owner
  name?: string;
  categories?: Categories;
  tier?: number; //editable by config.owner
  logo?: string;
  image?: string;
}

export interface DepositPayload {
  id: number;
  locked_percentage: string; //"0.7"
  liquid_percentage: string; //"0.3"
}

export type AccountType = "locked" | "liquid";

export interface WithdrawPayload {
  id: number;
  acct_type: AccountType;
  beneficiary: string;
  assets: Asset[];
}

export type Beneficiary =
  | { endowment: { id: number } }
  | { indexfund: { id: number } }
  | { wallet: { address: string } };

export type StatusChangePayload = {
  endowment_id: number;
  status: EndowmentStatus[keyof EndowmentStatus];
  beneficiary?: Beneficiary;
};

export type UpdateStategyPayload = {
  id: number;
  acct_type: AccountType;
  strategies: Strategy[];
};
