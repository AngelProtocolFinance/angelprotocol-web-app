import {
  CapitalizedEndowmentType,
  Categories,
  EndowmentStatus,
  EndowmentTier,
  SocialMedialUrls,
} from "../../contracts";
import { NetworkType } from "../../lists";

export type EndowmentProfileUpdate = {
  id: number;
  owner: string;

  // optional
  active_in_countries: string;
  categories_general: string[];
  categories_sdgs: number[];
  contact_email: string;
  hq_city: string;
  hq_country: string;
  image: string;
  kyc_donors_only: boolean;
  logo: string;
  name: string;
  overview: string;
  registration_number: string;
  social_media_url_facebook: string;
  social_media_url_linkedin: string;
  social_media_url_twitter: string;
  street_address: string;
  tagline: string;
  tier: number /** 1 - 3  */;
  url: string;
};

export type EndowmentProfile = {
  id: number;
  name: "Anna's Pals";
  registration_number: "47-5204938";
  street_address: "Boston, MA";
  categories: {
    sdgs: [3];
    general: [];
  };
  hq: { country: string; city: string };
  kyc_donors_only?: boolean;

  //content
  image: string;
  logo: string;
  tagline: string;
  overview: string;

  //contacts
  social_media_urls: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  contact_email: "no-reply@angelprotocol.io";
  url: null | string;

  //balances
  total_lock: number;
  total_liq: number;
  overall: number;
};

export type Endowment = {
  //EndowmentEntry
  id: number; //int
  owner: string;
  status: keyof EndowmentStatus;
  endow_type: CapitalizedEndowmentType;
  name: string;
  logo: string;
  image: string;
  tier: EndowmentTier;
  categories: Categories;
  kyc_donors_only: boolean;

  //profile
  overview: string;
  url?: string;
  registration_number?: string;
  country_of_origin?: string;
  street_address?: string;
  contact_email?: string;
  social_media_urls: SocialMedialUrls;
  number_of_employees?: number;
  average_annual_budget?: string;
  annual_revenue?: string;
  charity_navigator_rating?: string;
};

export type SortDirection = "asc" | "desc";
export type EndowmentsSortKey = "name_internal" | "overall";

export type EndowmentsQueryParams = {
  query: string; //set to "matchAll" if no search query
  sort: "default" | `${EndowmentsSortKey}+${SortDirection}`;
  start?: number; //to load next page, set start to ItemCutOff + 1
  endow_types: string | null; // comma separated CapitalizedEndowmentType values
  sdgs: string | 0; // comma separated sdg values. The backend recognizes "0" as "no SDG was selected"
  tiers: string | null; // comma separated Exclude<EndowmentTier, "Level1"> values ("Level1" excluded for now)
  kyc_only: string | null; // comma separated boolean values
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
  id: number;
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
