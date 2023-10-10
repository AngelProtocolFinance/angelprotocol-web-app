import { EndowmentType, NetworkType, UNSDG_NUMS } from "../../lists";

export type EndowmentTierNum = 1 | 2 | 3;

type EndowmentBalances = {
  // represents total cumulative balances
  total_liq: number;
  total_lock: number;
  overall: number;

  // represents tokens on hand balances (takes into account withdrawn funds)
  on_hand_liq: number;
  on_hand_lock: number;
  on_hand_overall: number;
};

export type MileStone = {
  milestone_date: string; //isoDate
  milestone_description: string;
  milestone_media: string;
  milestone_title: string;
};

export type Program = {
  program_banner: string;
  program_description: string;
  program_id: string;
  program_title: string;
  program_milestones: MileStone[];
};

export type EndowDesignation =
  | "Charity"
  | "Religious Organization"
  | "University"
  | "Hospital"
  | "Other";

type EndowmentBase = {
  hq_country?: string;
  endow_designation: EndowDesignation;
  active_in_countries?: string[];
  sdgs: UNSDG_NUMS[];
  id: number;
  logo: string;
  kyc_donors_only: boolean;
  contributor_verification_required: boolean;
  program: Program[];

  name: string;
  tagline: string;
};

export type EndowmentProfile = EndowmentBase & {
  fiscal_sponsored: boolean;
  contact_email: string;
  image: string;
  overview?: string;
  published: boolean;
  registration_number?: string;
  social_media_urls: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    discord?: string;
    youtube?: string;
    tiktok?: string;
  };
  street_address?: string;

  url?: string;
} & EndowmentBalances;

export type EndowmentCard = EndowmentBase & {
  endow_type: EndowmentType;
  published: boolean;
};

export type EndowmentOption = Pick<EndowmentBase, "id" | "name">;

export type EndowmentProfileUpdate = {
  //required
  id: number;
  owner: string;

  /** optional, though set as required in this type
  to force setting of default values - "", [], etc ..*/

  active_in_countries: string[];
  categories: {
    general: string[];
    sdgs: UNSDG_NUMS[];
  };
  charity_navigator_rating: string;
  contact_email: string;
  // categories_sdgs: UNSDG_NUMS[];
  contributor_verification_required: boolean;
  endow_designation: string;
  hq_country: string;
  image: string;
  kyc_donors_only: boolean;
  logo: string;
  name: string;

  overview: string;
  program: Program[];
  program_id: string;
  published: boolean;
  registration_number: string;
  sdgs: UNSDG_NUMS[];
  social_media_urls: {
    facebook: string;
    linkedin: string;
    twitter: string;
    discord: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  street_address: string;
  tagline: string;
  tier: EndowmentTierNum /** 1 - 3  */;
  url: string | null;
};

export type SortDirection = "asc" | "desc";
export type EndowmentsSortKey = "name_internal" | "overall";

export type EndowmentsQueryParams = {
  query: string; //set to "matchAll" if no search query
  sort: "default" | `${EndowmentsSortKey}+${SortDirection}`;
  page?: number; //to load next page, set to Page + 1
  endow_types: string | null; // comma separated EndowmentType values
  endow_designation?: string; // comma separated EndowDesignation values
  sdgs: string | 0; // comma separated sdg values. The backend recognizes "0" as "no SDG was selected"
  tiers: string | null; // comma separated Exclude<EndowmentTier, "Level1"> values ("Level1" excluded for now)
  kyc_only: string | null; // comma separated boolean values
  hq_country?: string; //comma separated values
  active_in_countries?: string; //comma separated values
  hits?: number; // Number of items to be returned per request. If not provided, API defaults to return all
  published: string;
};

export interface LeaderboardEntry {
  // chain: NetworkType;
  charity_logo: string;
  charity_name: string;
  endowment_id: number;
  total_liq: number;
  total_lock: number;
  overall: number;
  //tier: EndowmentTier
  //charity_owner:string
}

export type AWSstrategy = {
  strategy_key: string;
  chain_id: string;
  routerAxelarChainName: string;
  router: string;
  apy: number; // 5.2
  contract: string;
  description: string;
  icon: string;
  market_cap: number; // 100,024,000 USD
  name: string;
  provider: { name: string; url: string; icon: string };
  rating: string; // "AAA";
  type: string; // "Uncollateralized Lending";
  vaults: { locked: string; liquid: string };
  website: string;
};

export interface Update {
  endowments: LeaderboardEntry[];
  last_update: string;
}

export type Airdrops = Airdrop[];
export type Airdrop = {
  stage: number;
  haloTokens: string; // uhalo amount
  proof: string[];
  // chainId: "bombay-12";
  // stage: 1;
  // haloTokens: "10000000";
  // proof: string[];
  // claimable: true;
  // address: "terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l";
  // pk: "bombay-12:terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l";
};

export type EndowmentBookmark = {
  endowId: number;
  name: string;
  logo?: string; // old bookmarks do not have this field saved yet
};

export type WalletProfile = {
  wallet: string;
  network: NetworkType;
  admin: EndowmentBookmark[];
  bookmarks: EndowmentBookmark[];
};

export interface DonationsMetricList {
  donations_daily_count: number;
  donations_daily_amount: number;
  donations_total_amount: number;
}
