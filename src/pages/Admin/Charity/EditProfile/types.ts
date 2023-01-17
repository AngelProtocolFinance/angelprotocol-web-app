import { CountryOption } from "services/types";
import { EndowmentProfileUpdate } from "types/aws";
import { ImgLink } from "components/ImgEditor";

type K = keyof EndowmentProfileUpdate;
const _logo: K = "logo";
const _img: K = "image";
const _country: K = "hq_country";
const _sdgs: K = "categories_sdgs";
const _general: K = "categories_general";
const _id: K = "id";
const _tier: K = "tier";
const _owner: K = "owner";
const _active_countries: K = "active_in_countries";

export type FlatFormValues = Omit<
  EndowmentProfileUpdate,
  /** to flatten */
  | typeof _sdgs
  /** don't include for now */
  | typeof _general
  | typeof _active_countries
  /** not editable fields*/
  | typeof _id
  | typeof _tier
  | typeof _owner
> & { sdg: number };

export type FormValues = Omit<
  FlatFormValues,
  typeof _logo | typeof _img | typeof _country
> & {
  [_logo]: ImgLink;
  [_img]: ImgLink;
  [_country]: CountryOption;
  initial: FlatFormValues;
};
