export type Holding = { address: string; amount: string };
export interface Holdings {
  locked_native: Holding[];
  locked_cw20: Holding[];
  liquid_native: Holding[];
  liquid_cw20: Holding[];
  is_placeholder?: true;
}

export interface EndowmentDetails {
  owner: string; //"cw3 owner";
  name: string;
  //..update attr on demand

  isPlaceHolder?: true;
}

export interface Profile {
  name: string;
  overview: string;
  un_sdg?: number;
  tier?: number;
  logo?: string;
  image?: string;
  url?: string;
  registration_number?: string;
  country_city_origin?: string;
  contact_email?: string;
  social_media_urls: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  number_of_employees?: number;
  average_annual_budget?: string;
  annual_revenue?: string;
  charity_navigator_rating?: string;
}
