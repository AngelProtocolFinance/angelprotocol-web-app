import { CountryOption } from "services/types";
import { EndowmentProfileUpdate } from "types/aws";
import { ImgLink } from "components/ImgEditor";

type K = keyof EndowmentProfileUpdate;
const _logo: K = "logo";
const _img: K = "image";
const _country: K = "hq_country";
const _sdgs: K = "categories_sdgs";
const _id: K = "id";
const _tier: K = "tier";
const _owner: K = "owner";

export type FormValues = Omit<
  EndowmentProfileUpdate,
  | typeof _logo
  | typeof _img
  | typeof _country
  | typeof _sdgs
  /** not editable fields*/
  | typeof _id
  | typeof _tier
  | typeof _owner
> & {
  [_logo]: ImgLink;
  [_img]: ImgLink;
  [_country]: CountryOption;
  sdg: number;
};
