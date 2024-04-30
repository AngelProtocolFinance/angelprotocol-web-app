import { Except } from "type-fest";
import { PartialExcept } from "types/utils";
import { APIEnvironment, UNSDG_NUMS } from "../../lists";

export type EndowmentTierNum = 1 | 2 | 3;

export type Milestone = {
  id: string;
  /** iso date */
  date: string;
  description?: string;
  media?: string;
  title: string;
};

export type Program = {
  banner?: string;
  description: string;
  id: string;
  title: string;
  milestones: Milestone[];
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
  slug?: string;
  active_in_countries: string[];
  endow_designation: EndowDesignation;
  fiscal_sponsored: boolean;
  hq_country: string;
  /** empty string by default */
  image: string;
  kyc_donors_only: boolean;
  /** optional as older endowments don't have it set */
  hide_bg_tip?: boolean;
  /** empty string by default */
  logo: string;
  name: string;
  /** empty string by default */
  card_img?: string;
  /** empty string by default */
  overview: string;
  published: boolean;
  registration_number: string;
  sdgs: UNSDG_NUMS[];
  social_media_urls: SocialMediaURLs;
  /** empty string by default */
  street_address: string;
  /** empty string by default */
  tagline?: string;
  receiptMsg?: string;
  url?: string;
  /** not claimed only if `false` */
  claimed?: boolean;
  sfCompounded?: boolean;
};

export type EndowmentProfile = Endowment;

export type EndowmentCard = Pick<
  Endowment,
  | "id"
  | "active_in_countries"
  | "card_img"
  | "endow_designation"
  | "hq_country"
  | "kyc_donors_only"
  | "logo"
  | "name"
  | "sdgs"
  | "tagline"
  | "claimed"
>;
export type EndowmentOption = Pick<Endowment, "id" | "name" | "hide_bg_tip">;

//most are optional except id, but typed as required to force setting of default values - "", [], etc ..
export type EndowmentProfileUpdate = Except<
  Required<Endowment>,
  "endow_designation" | "fiscal_sponsored" | "receiptMsg" | "claimed"
> & {
  endow_designation: EndowDesignation | "";
};

export type EndowmentSettingsUpdate = Pick<
  Required<Endowment>,
  "id" | "receiptMsg" | "sfCompounded"
>;

export type NewProgram = Omit<Program, "id" | "milestones"> & {
  milestones: Omit<Milestone, "id">[];
};
export type ProgramUpdate = PartialExcept<Omit<Program, "milestones">, "id">;

export type NewMilestone = Omit<Milestone, "id">;
export type MilestoneUpdate = PartialExcept<Milestone, "id">;

export type SortDirection = "asc" | "desc";
export type EndowmentsSortKey = "name_internal" | "overall";

export type EndowmentsQueryParams = {
  /** can be empty string */
  query: string;
  sort?: `${EndowmentsSortKey}+${SortDirection}`;
  page: number; //to load next page, set to Page + 1
  endow_designation?: string; // comma separated EndowDesignation values
  sdgs?: string; // comma separated sdg values.
  kyc_only?: string; // comma separated boolean values
  countries?: string; //comma separated country names
  /** boolean csv */
  claimed?: string;
};

export interface LeaderboardEntry {
  charity_logo: string;
  charity_name: string;
  endowment_id: number;
  total_liq: number;
  total_lock: number;
  overall: number;
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
