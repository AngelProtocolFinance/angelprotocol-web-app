import {
  CW4Member,
  CapitalizedEndowmentType,
  Categories,
  EndowmentTierNum,
  SocialMedialUrls,
  Threshold,
  Vote,
} from "../common";
import { Expiration } from "./index";

export type NewProfile = {
  overview: string;
  url?: string;
  registration_number?: string;
  country_of_origin?: string;
  street_address?: string;
  contact_email?: string;
  social_media_urls: SocialMedialUrls;
  number_of_employees?: number;
  average_annual_budget?: string;
  annual_revenue?: string;
  charity_navigator_rating?: string;
};

export interface ApplicationVote {
  proposal_id: number;
  vote: Vote;
  reason?: string;
}
