import { Coin } from "@cosmjs/proto-signing";
import {
  EndowmentStatus,
  EndowmentStatusStrNum,
  EndowmentTier,
  EndowmentType,
} from ".";
import { CW20 } from "./cw20";

export interface GenericBalance {
  native: Coin[];
  cw20: CW20[];
}

export interface BalanceInfo {
  locked: GenericBalance;
  liquid: GenericBalance;
}

interface RebalanceDetails {
  rebalance_liquid_invested_profits: boolean; // should invested portions of the liquid account be rebalanced?
  locked_interests_to_liquid: boolean; // should Locked acct interest earned be distributed to the Liquid Acct?
  interest_distribution: string; // % of Locked acct interest earned to be distributed to the Liquid Acct
  locked_principle_to_liquid: boolean; // should Locked acct principle be distributed to the Liquid Acct?
  principle_distribution: string; // % of Locked acct principle to be distributed to the Liquid Acct
}

interface StrategyComponent {
  vault: string; // Vault SC Address
  locked_percentage: string; // percentage of funds to invest
  liquid_percentage: string; // percentage of funds to invest
}

export interface EndowmentDetails {
  owner: string;
  beneficiary: string;
  withdraw_before_maturity: boolean;
  maturity_time?: number;
  maturity_height?: number;
  strategies: StrategyComponent[];
  rebalance: RebalanceDetails;
  guardians: string[];
}

type Categories = {
  sdgs: number[]; // u8 maps one of the 17 UN SDG
  general: number[]; //??
};

export interface Profile {
  name: string; // name of the Charity Endowment
  overview: string;
  categories: Categories;
  tier: number; // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
  logo: string;
  image: string;
  url?: string;
  registration_number?: string;
  country_of_origin?: string;
  street_address?: string;
  contact_email?: string;
  social_media_urls: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  number_of_employees?: number;
  average_annual_budget?: string;
  annual_revenue?: string;
  charity_navigator_rating?: string;
  endow_type: Capitalize<EndowmentType>;
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
  name?: string;
  owner?: string;
  status?: EndowmentStatusStrNum;
  tier?: EndowmentTier;
  endow_type?: EndowmentType;
};

export type EndowmentEntry = {
  id: number; //int
  owner: String;
  status: keyof EndowmentStatus;
  endow_type: Capitalize<EndowmentType>;
  name?: string;
  logo?: string;
  image?: string;
  tier?: EndowmentTier;
  categories: Categories;
};

export type CategorizedEndowments = {
  [index: number]: EndowmentEntry[];
};

export interface UpdateProfilePayload {
  //separate shape for update
  id: number;
  name: string;
  overview: string;
  categories: Categories;
  tier?: number;
  logo: string;
  image: string;
  url: string;
  registration_number?: string;
  country_of_origin?: string;
  street_address?: string;
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
export interface DepositPayload {
  id: number;
  locked_percentage: string; //"0.7"
  liquid_percentage: string; //"0.3"
}

type Asset = {
  info: { native: string } | { cw20: string };
  amount: string;
};

export interface WithdrawPayload {
  id: number;
  acct_type: "locked" | "liquid";
  beneficiary: string;
  assets: Asset[];
}
