import { Profile } from "services/aws/endowments/types";

export type EditableProfileAttr = Omit<
  Profile,
  | "url"
  | "charity_owner"
  | "charity_programs"
  | "endowment_address"
  | "news_media_articles"
>;
