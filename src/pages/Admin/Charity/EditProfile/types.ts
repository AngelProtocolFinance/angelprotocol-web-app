import { CountryOption } from "services/types";
import { EndowmentCloudSearchFields } from "types/aws";
import { UNSDG_NUMS } from "types/lists";
import { ImgLink } from "components/ImgEditor";
import { OptionType } from "components/Selector";

export type EndowmentProfileUpdate = Required<EndowmentCloudSearchFields>;

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
const _endow_type: K = "endow_type";
const _total_liq: K = "total_liq";
const _total_lock: K = "total_lock";
const _overall: K = "overall";
const _on_hand_liq: K = "on_hand_liq";
const _on_hand_lock: K = "on_hand_lock";
const _on_hand_overall: K = "on_hand_overall";

export type FlatFormValues = Omit<
  EndowmentProfileUpdate,
  /** to flatten */
  /** don't include for now */
  | typeof _general
  /** not editable fields*/
  | typeof _id
  | typeof _tier
  | typeof _owner
  | typeof _endow_type
  | typeof _total_liq
  | typeof _total_lock
  | typeof _overall
  | typeof _on_hand_liq
  | typeof _on_hand_lock
  | typeof _on_hand_overall
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
