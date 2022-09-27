import {
  CW4Member,
  Categories,
  EndowmentTierNum,
  EndowmentType,
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
  navigator_rating?: string;
};

export type NewEndowment = {
  owner: string; // address that originally setup the endowment account
  withdraw_before_maturity: boolean; // endowment allowed to withdraw funds from locked acct before maturity date
  maturity_time?: number; // datetime int of endowment maturity
  maturity_height?: number; // block equiv of the maturity_datetime
  name: string; // name of the Endowment
  categories: Categories; // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
  tier?: EndowmentTierNum; // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
  endow_type: Capitalize<EndowmentType>;
  logo: string;
  image: string;
  profile: NewProfile; // struct holding the Endowment info
  cw4_members: CW4Member[];
  kyc_donors_only: boolean;
  cw3_threshold: Threshold;
  cw3_max_voting_period: number;
  proposal_link?: number; // link back to the proposal that created an Endowment (set @ init)
};

export interface ApplicationProposal {
  ref_id: string;
  msg: NewEndowment;
  // note: we ignore API-spec'd earliest if passed, always opens immediately
  latest?: Expiration;
  meta?: string;
}

export interface ApplicationVote {
  proposal_id: number;
  vote: Vote;
  reason?: string;
}
