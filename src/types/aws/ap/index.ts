import type {
  Endow,
  EndowDesignation,
  EndowsPage,
} from "@better-giving/endowment";
import type { Except } from "type-fest";

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

export interface UserFund {
  name: string;
  logo: string;
  email: string;
  /** uuidv4 */
  id: string;
  active: boolean;
}

export interface EndowAdmin {
  email: string;
  familyName?: string;
  givenName?: string;
}

/** from CloudSearch index instead of DB */

export interface EndowCardsPage
  extends EndowsPage<
    | "id"
    | "card_img"
    | "name"
    | "tagline"
    | "claimed"
    | "contributions_total"
    | "target"
  > {
  /** available but need not fetched */
  // "claimed"
  // "hq_country"
  // "sdgs"
  // "active_in_countries"
  // "endow_designation"
  // "kyc_donors_only"
}
export interface EndowOptionsPage extends EndowsPage<"id" | "name"> {}

export type EndowmentCard = EndowCardsPage["items"][number];
export type EndowmentOption = EndowOptionsPage["items"][number];

export type EndowmentSettingsAttributes = keyof Pick<
  Endow,
  | "receiptMsg"
  | "hide_bg_tip"
  | "progDonationsAllowed"
  | "donateMethods"
  | "increments"
  | "fund_opt_in"
  | "target"
>;

//most are optional except id, but typed as required to force setting of default values - "", [], etc ..
export type EndowmentProfileUpdate = Except<
  Required<Endow>,
  | "endow_designation"
  | "fiscal_sponsored"
  | "claimed"
  | "allocation"
  | "kyc_donors_only"
  | EndowmentSettingsAttributes
> & {
  endow_designation: EndowDesignation | "";
};

export type EndowmentSettingsUpdate = Pick<
  Required<Endow>,
  EndowmentSettingsAttributes
>;
export type EndowmentAllocationUpdate = Pick<Required<Endow>, "allocation">;

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
  page: number; //to load next page, set to Page + 1
  endow_designation?: string; // comma separated EndowDesignation values
  sdgs?: string; // comma separated sdg values.
  kyc_only?: string; // comma separated boolean values
  countries?: string; //comma separated country names
  /** boolean csv */
  claimed?: string;
  /** boolean csv */
  fund_opt_in?: string;
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
  avatarUrl?: string;
};

export type UserUpdate = Partial<UserAttributes>;
