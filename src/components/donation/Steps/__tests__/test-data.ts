import type { Endow } from "@better-giving/endowment";
import type { DonateData } from "api/donate-loader";
import { usdOption } from "../common/constants";

const endow: Endow = {
  id: 1,
  registration_number: "E001",
  name: "Global Education Fund",
  endow_designation: "Charity",
  hq_country: "United States",
  active_in_countries: ["United States", "India", "Kenya"],
  social_media_urls: {
    twitter: "https://twitter.com/globaledfund",
    facebook: "https://facebook.com/globaledfund",
  },
  sdgs: [1],
  kyc_donors_only: false,
  fiscal_sponsored: true,
  claimed: true,
  env: "staging",
};

export const testDonateData: DonateData = {
  id: 1,
  endow,
  user: null,
  currencies: Promise.resolve({
    all: [usdOption, { code: "eur", min: 1, rate: 1 }],
  }),
  programs: Promise.resolve([]),
  balance: Promise.resolve({} as any),
};
