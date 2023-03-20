import { Endowment } from "types/aws";

export type EndowmentCard = Pick<
  Endowment,
  | "active_in_countries"
  | "name"
  | "image"
  | "id"
  | "endow_type"
  | "categories"
  | "tagline"
  | "hq_country"
  | "kyc_donors_only"
>;
