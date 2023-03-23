import { Keplr } from "@keplr-wallet/types";
import { CapitalizedEndowmentType } from "../../contracts";
import { NetworkType, UNSDG_NUMS } from "../../lists";

type EndowmentBase = {
  hq_country: string;
  endow_designation: EndowDesignation;
  active_in_countries?: string[];
  categories: { sdgs: UNSDG_NUMS[] };
  id: number;
  image: string;
  kyc_donors_only: boolean;

  name: string;
  tagline: string;
};

export type EndowmentProfile = EndowmentBase & {
  contact_email: string;
  logo: string;
  overview: string;
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

  // represents total cumulative balances
  total_liq: number;
  total_lock: number;
  overall: number;

  // represents tokens on hand balances (takes into account withdrawn funds)
  on_hand_liq: number;
  on_hand_lock: number;
  on_hand_overall: number;

  url?: string;
};

export type EndowmentCard = EndowmentBase & {
  endow_type: CapitalizedEndowmentType;
  published: boolean;
};

export type EndowmentIdName = Pick<EndowmentBase, "id" | "name">;

export type EndowmentProfileUpdate = {
  //required
  id: number;
  owner: string;

  /** optional, though set as required in this type
  to force setting of default values - "", [], etc ..*/
  active_in_countries: string[];
  categories_general: string[];
  categories_sdgs: UNSDG_NUMS[];
  hq_country: string;
  endow_designation: string;
  image: string;
  kyc_donors_only: boolean;
  logo: string;
  name: string;
  published: boolean;
  overview: string;
  registration_number: string;
  social_media_url_facebook: string;
  social_media_url_linkedin: string;
  social_media_url_twitter: string;
  social_media_url_discord: string;
  social_media_url_instagram: string;
  social_media_url_youtube: string;
  social_media_url_tiktok: string;
  street_address: string;
  tagline: string;
  tier: number /** 1 - 3  */;
  url: string | null;
};

export type SortDirection = "asc" | "desc";
export type EndowmentsSortKey = "name_internal" | "overall";

export type EndowDesignation =
  | "Charity"
  | "Religious Organization"
  | "University"
  | "Hospital"
  | "Other";

export type EndowmentsQueryParams = {
  query: string; //set to "matchAll" if no search query
  sort: "default" | `${EndowmentsSortKey}+${SortDirection}`;
  start?: number; //to load next page, set start to ItemCutOff + 1
  endow_types: string | null; // comma separated CapitalizedEndowmentType values
  endow_designation?: string; // comma separated EndowDesignation values
  sdgs: string | 0; // comma separated sdg values. The backend recognizes "0" as "no SDG was selected"
  tiers: string | null; // comma separated Exclude<EndowmentTier, "Level1"> values ("Level1" excluded for now)
  kyc_only: string | null; // comma separated boolean values
  hq_country?: string; //comma separated values
  active_in_countries?: string; //comma separated values
  limit?: number; // Number of items to be returned per request. If not provided, API defaults to return all
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

type AminoSignRes = Awaited<ReturnType<Keplr["signAmino"]>>;
type Signed = AminoSignRes["signed"];
type Signature = AminoSignRes["signature"];
export type ADR36Payload = Pick<Signed, "chain_id" | "fee" | "memo"> & {
  msg: Signed["msgs"];
  signatures: Signature[];
};
