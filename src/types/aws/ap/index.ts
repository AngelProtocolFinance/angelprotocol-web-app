import { APIEnvironment, EndowmentType, UNSDG_NUMS } from "../../lists";

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

type EndowmentBase = {
  hq_country: string;
  endow_designation: EndowDesignation;
  active_in_countries: string[];
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
  overview: string; //or empty
  published: boolean;
  registration_number: string;
  social_media_urls: {
    twitter: string; //or empty
    facebook: string; //or empty
    linkedin: string; //or empty
    instagram: string; //or empty
    discord: string; //or empty
    youtube: string; //or empty
    tiktok: string; //or empty
  };
  street_address: string; //or empty
  url: string;
  wise_recipient_id: number;
};

export type EndowmentCard = EndowmentBase & {
  endow_type: EndowmentType;
  published: boolean;
};

export type EndowmentOption = Pick<EndowmentBase, "id" | "name">;

export type EndowmentProfileUpdate = {
  //required
  id: number;

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
  endow_designation: EndowDesignation | "";
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
  donations_daily_count: number;
  donations_daily_amount: number;
  donations_total_amount: number;
}
