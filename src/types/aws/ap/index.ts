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
  /** may be empty */
  twitter?: string;
  /** may be empty */
  facebook?: string;
  /** may be empty */
  linkedin?: string;
  /** may be empty */
  instagram?: string;
  /** may be empty */
  discord?: string;
  /** may be empty */
  youtube?: string;
  /** may be empty */
  tiktok?: string;
};

export type Endowment = {
  id: number;
  /** may be empty */
  slug?: string;
  registration_number: string;
  name: string;
  endow_designation: EndowDesignation;
  /** may be empty */
  overview?: string;
  /** may be empty */
  tagline?: string;
  image?: string;
  logo?: string;
  card_img?: string;
  hq_country: string;
  active_in_countries: string[];
  /** may be empty */
  street_address?: string;
  social_media_urls: SocialMediaURLs;
  url?: string;
  sdgs: UNSDG_NUMS[];
  /** may be empty */
  receiptMsg?: string;

  kyc_donors_only: boolean;
  fiscal_sponsored: boolean;
  claimed: boolean;

  //can be optional, default false and need not be explicit
  hide_bg_tip?: boolean;
  sfCompounded?: boolean;
  published?: boolean;
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
export type MilestoneDelete = {
  endowId: number;
  programId: string;
  milestoneId: string;
};

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
