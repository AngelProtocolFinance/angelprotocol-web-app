import { Profile } from "services/types";
import { EndowmentProfileUpdate } from "types/aws";
import { Country } from "types/countries";
import { UNSDG_NUMS } from "types/lists";
import { ImgLink } from "components/ImgEditor";
import { OptionType } from "components/Selector";

type K = keyof EndowmentProfileUpdate;
const _logo: K = "logo";
const _img: K = "image";
const _country: K = "hq_country";
const _activity_countries: K = "active_in_countries";
const _sdgs: K = "categories_sdgs";
const _general: K = "categories_general";
const _id: K = "id";
const _tier: K = "tier";
const _owner: K = "owner";
const _npo_type: K = "endow_designation";
const _contributor_verification_required: K =
  "contributor_verification_required";
const _whitelistedContributors: K = "whitelistedContributors";
const _whitelistedBeneficiaries: K = "whitelistedBeneficiaries";
export type FlatFormValues = Omit<
  EndowmentProfileUpdate,
  /** to flatten */
  /** don't include for now */
  | typeof _general
  /** not editable fields*/
  | typeof _id
  | typeof _tier
  | typeof _owner
  | typeof _contributor_verification_required
  | typeof _whitelistedBeneficiaries
  | typeof _whitelistedContributors
>;

export type FormValues = Omit<
  FlatFormValues,
  | typeof _logo
  | typeof _img
  | typeof _country
  | typeof _sdgs
  | typeof _activity_countries
  | typeof _npo_type
> & {
  [_npo_type]: OptionType<string>;
  [_logo]: ImgLink;
  [_img]: ImgLink;
  [_country]: Country;
  [_sdgs]: OptionType<UNSDG_NUMS>[];
  [_activity_countries]: OptionType<string>[];

  //meta
  type: Profile["type"];
  initial: FlatFormValues;
};
