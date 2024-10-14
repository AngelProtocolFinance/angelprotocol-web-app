import type { Except } from "type-fest";
import type { PartialExcept } from "types/utils";
import * as v from "valibot";
import type { DonateMethodId, UNSDG_NUMS } from "../../lists";

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

/** sums up to 100 */
export interface Allocation {
  /** e.g. 20 */
  cash: number;
  /** e.g. 30 */
  liq: number;
  /** e.g. 50 */
  lock: number;
}

const str = v.pipe(v.string(), v.trim());

export const incrementVal = v.pipe(
  str,
  v.nonEmpty("required"),
  v.transform((x) => +x),
  v.number("must be a number"),
  v.minValue(0, "must be greater than 0"),
  //parsed output
  v.transform((x) => x.toString())
);

export const incrementLabelMaxChars = 30;
export const incrementLabel = v.pipe(
  str,
  v.maxLength(incrementLabelMaxChars, "cannot exceed 30 characters")
);

export const increment = v.object({
  value: incrementVal,
  label: incrementLabel,
});

type Increment = v.InferInput<typeof increment>;

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
  allocation?: Allocation;
  increments?: Increment[];

  //can be optional, default false and need not be explicit
  hide_bg_tip?: boolean;
  published?: boolean;
  /** allowed by default */
  progDonationsAllowed?: boolean;
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

export type EndowmentSettingsAttributes = keyof Pick<
  Endowment,
  | "receiptMsg"
  | "hide_bg_tip"
  | "progDonationsAllowed"
  | "donateMethods"
  | "increments"
>;

//most are optional except id, but typed as required to force setting of default values - "", [], etc ..
export type EndowmentProfileUpdate = Except<
  Required<Endowment>,
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
  Required<Endowment>,
  EndowmentSettingsAttributes
>;
export type EndowmentAllocationUpdate = Pick<Required<Endowment>, "allocation">;

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

const csvToStrs = (x: string) => x.split(",").filter((x) => x);
const csvToBools = (x: string) => csvToStrs(x).map((x) => x === "true");
const csvToNums = (x: string) => csvToStrs(x).map((x) => +x);

const str = v.pipe(v.string(), v.nonEmpty());

const boolArr = v.pipe(
  v.string(),
  v.transform(csvToBools),
  v.everyItem((x) => v.safeParse(v.boolean(), x).success)
);
const strArr = v.pipe(
  v.string(),
  v.transform(csvToStrs),
  v.everyItem((x) => v.safeParse(str, x).success),
  v.sortItems((a, b) => a.localeCompare(b))
);

const sdg = v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(17));

export const endowQParams = v.object({
  query: v.optional(v.string()),
  sdgs: v.optional(
    v.pipe(
      v.string(),
      v.transform(csvToNums),
      v.everyItem((x) => v.safeParse(sdg, x).success),
      v.sortItems((a, b) => a - b)
    )
  ),
  kyc_only: v.optional(boolArr),
  countries: v.optional(strArr),
  endow_designation: v.optional(strArr),
  claimed: v.optional(boolArr),
});

export type EndowQParams = v.InferInput<typeof endowQParams>;
export type ParsedEndowQParams = v.InferOutput<typeof endowQParams>;
