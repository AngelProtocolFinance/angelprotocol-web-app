import { Except } from "type-fest";
import { APIEnvironment, UNSDG_NUMS } from "../../lists";

export type EndowmentTierNum = 1 | 2 | 3;

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

type SocialMediaURLs = {
  /** empty string by default */
  twitter: string;
  /** empty string by default */
  facebook: string;
  /** empty string by default */
  linkedin: string;
  /** empty string by default */
  instagram: string;
  /** empty string by default */
  discord: string;
  /** empty string by default */
  youtube: string;
  /** empty string by default */
  tiktok: string;
};

export type Endowment = {
  id: number;
  active_in_countries: string[];
  contact_email: string;
  endow_designation: EndowDesignation;
  fiscal_sponsored: boolean;
  hq_country: string;
  image: string;
  kyc_donors_only: boolean;
  logo: string;
  name: string;
  /** empty string by default */
  overview: string;
  program: Program[];
  published: boolean;
  registration_number: string;
  sdgs: UNSDG_NUMS[];
  social_media_urls: SocialMediaURLs;
  /** empty string by default */
  street_address: string;
  tagline: string;
  url: string;
};

export type EndowmentProfile = Endowment;

export type EndowmentCard = Pick<
  Endowment,
  | "id"
  | "active_in_countries"
  | "endow_designation"
  | "hq_country"
  | "kyc_donors_only"
  | "logo"
  | "name"
  | "sdgs"
  | "tagline"
>;
export type EndowmentOption = Pick<Endowment, "id" | "name">;

//most are optional except id, but typed as required to force setting of default values - "", [], etc ..
export type EndowmentProfileUpdate = Except<
  Endowment,
  "endow_designation" | "fiscal_sponsored"
> & {
  endow_designation: EndowDesignation | "";
  program_id: string;
};

export type SortDirection = "asc" | "desc";
export type EndowmentsSortKey = "name_internal" | "overall";

export type EndowmentsQueryParams = {
  query: string; //
  sort?: `${EndowmentsSortKey}+${SortDirection}`;
  page?: number; //to load next page, set to Page + 1
  endow_designation?: string; // comma separated EndowDesignation values
  sdgs?: string; // comma separated sdg values.
  kyc_only?: string; // comma separated boolean values
  countries?: string; //comma separated country names
  hits?: number; // Number of items to be returned per request. If not provided, API defaults to return all
  published: "true";
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

export type EndowmentBookmark = {
  endowId: number;
  name: string;
  logo?: string; // old bookmarks do not have this field saved yet
};

export type WalletProfile = {
  wallet: string;
  network: APIEnvironment;
  admin: EndowmentBookmark[];
  bookmarks: EndowmentBookmark[];
};

export interface DonationsMetricList {
  donations_daily_amount: number;
  donations_daily_count: number;
  donations_total_amount_v2: number;
}
