import type { Except } from "type-fest";
import type { PartialExcept } from "types/utils";
import type { DonateMethodId, UNSDG_NUMS } from "../../lists";

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
  targetRaise?: number | null;
  totalDonations?: number;
};

export type Media = {
  type: "video";
  url: string;
  id: string;
  featured: boolean;
  dateCreated: string;
}; // {article} | {album}
export type MediaQueryParams = {
  type?: "video"; //future: article | album
  featured?: boolean;
  nextPageKey?: string;
  limit?: number;
};

export type MediaUpdate = Partial<Pick<Media, "url" | "featured">>;

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
  /** allowed by default */
  progDonationsAllowed?: boolean;
  splitLiqPct?: number;
  splitFixed?: boolean;
  payout_minimum?: number;
  donateMethods?: DonateMethodId[];
};

export type EndowmentProfile = Endowment;

export type AletPrefUpdate = {
  endowId: number;
  banking: boolean;
  donation: boolean;
};

export type UserEndow = {
  name?: string;
  logo?: string;
  email: string;
  endowID: number;
  alertPref?: {
    banking: boolean;
    donation: boolean;
  };
};

export interface EndowAdmin {
  email: string;
  familyName?: string;
  givenName?: string;
}

/** from CloudSearch index instead of DB */
export type EndowmentCard = Pick<
  Endowment,
  "id" | "card_img" | "name" | "tagline" | "claimed"
  /** available but need not fetched */
  // "claimed"
  // "hq_country"
  // "sdgs"
  // "active_in_countries"
  // "endow_designation"
  // "kyc_donors_only"
> & {
  contributions_total: number;
  // contributions_count:number
};
export type EndowmentOption = Pick<EndowmentCard, "id" | "name">;

export type EndowmentSettingsAttributes = Extract<
  keyof Endowment,
  | "receiptMsg"
  | "sfCompounded"
  | "hide_bg_tip"
  | "progDonationsAllowed"
  | "splitLiqPct"
  | "splitFixed"
  | "payout_minimum"
  | "donateMethods"
>;
//most are optional except id, but typed as required to force setting of default values - "", [], etc ..
export type EndowmentProfileUpdate = Except<
  Required<Endowment>,
  | "endow_designation"
  | "fiscal_sponsored"
  | "claimed"
  | EndowmentSettingsAttributes
> & {
  endow_designation: EndowDesignation | "";
};

export type EndowmentSettingsUpdate = Pick<
  Required<Endowment>,
  EndowmentSettingsAttributes
>;

export type NewProgram = Omit<Program, "id" | "milestones"> & {
  milestones: Omit<Milestone, "id">[];
};
export type ProgramUpdate = PartialExcept<
  Omit<Program, "milestones" | "targetRaise">,
  "id"
> & { targetRaise?: number | null /** unsets the target */ };

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

export type EndowmentBookmark = {
  endowId: number;
  name: string;
  logo?: string; // old bookmarks do not have this field saved yet
};

export type UserAttributes = {
  familyName: string;
  givenName: string;
  prefCurrencyCode?: string;
};

export type UserUpdate = Partial<UserAttributes>;
