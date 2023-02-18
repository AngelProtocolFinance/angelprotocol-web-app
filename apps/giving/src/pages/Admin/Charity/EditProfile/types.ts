import { ImgLink } from "@/components/ImgEditor";
import { OptionType } from "@/components/Selector";
import { UNSDG_NUMS } from "@ap/types";
import { EndowmentProfileUpdate } from "@ap/types/aws";
import { CountryOption } from "@ap/types/services";

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

export type FlatFormValues = Omit<
  EndowmentProfileUpdate,
  /** to flatten */
  /** don't include for now */
  | typeof _general
  /** not editable fields*/
  | typeof _id
  | typeof _tier
  | typeof _owner
>;

export type FormValues = Omit<
  FlatFormValues,
  | typeof _logo
  | typeof _img
  | typeof _country
  | typeof _sdgs
  | typeof _activity_countries
> & {
  [_logo]: ImgLink;
  [_img]: ImgLink;
  [_country]: CountryOption;
  [_sdgs]: OptionType<UNSDG_NUMS>[];
  [_activity_countries]: OptionType<string>[];
  initial: FlatFormValues;
};
