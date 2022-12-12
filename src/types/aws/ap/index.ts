import {
  CapitalizedEndowmentType,
  Categories,
  EndowmentStatus,
  EndowmentTier,
  SocialMedialUrls,
} from "../../contracts";
import { NetworkType } from "../../lists";

/**
 * put all aws/ap definitions here, if big category exist, separate in a file
 */

export type Endowment = {
  //EndowmentEntry
  id: number; //int
  owner: String;
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
export type SortValue = "default" | `${EndowmentsSortKey}+${SortDirection}`;

export type EndowmentsQueryParams = {
  query: string; //set to "matchAll" if no search query
  sort: SortValue;
  start?: number; //to load next page, set start to ItemCutOff + 1
  endow_types?: string; // comma separated CapitalizedEndowmentType values
  sdgs?: string; // comma separated sdg values
  tier?: string; // comma separated Exclude<EndowmentTier, "Level1"> values ("Level1" excluded for now)
  kyc_only?: string; // comma separated boolean values
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

export type UserBookMarkInfo = {
  wallet: string;
  network: NetworkType;
  endowments: EndowmentBookmark[];
};

export interface DonationsMetricList {
  donations_daily_count: number;
  donations_daily_amount: number;
  donations_total_amount: number;
}
