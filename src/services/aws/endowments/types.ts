export interface Endowment {
  icon: string;
  owner: string;
  address: string;
  description: string;
  url: string;
  name: string;
  iconLight?: boolean;
  tier: number;
}

//TODO: remove this once endowments[] is from chain
export interface AWSCharityProfile {
  //terra
  charity_owner: string; // charity owner wallet address
  endowment_address: string; //"terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz"
  total_liq: number;
  total_lock: number;
  overall: number;

  //landing
  un_sdg: string; //"4"
  charity_name: string; //"Yellow Boat of Hope Foundation"
  charity_image: string; //url of image
  charity_overview: string; //long text
  charity_registration_number: string; //"CN201225725"
  country_city_origin: string; //"Philippines, Zamboanga City"

  //stats
  average_annual_budget: string; //"$50,000"
  annual_revenue: string; //"Under $100k"
  number_of_employees: string; //"5-25"

  //contacts
  charity_email: string; //"jay@yellowboat.org"

  //social
  url?: string; //
  linkedin_page: string; //"yellowboatph" used as https://linked.com/{linkedin_page}
  twitter_handle: string; //"@YellowBoat" used as https://twitter.com/{twitter_handle}
  facebook_page: string; // "YellowBoatPH" used as https://facebook.com/{facebook_page}

  //content
  charity_programs: string; //long text
  charity_navigator_rating: string; //""
  news_media_articles: string; //""You can view our Newsroom here: https://yellowboat.org/about-us/newsroom/.""

  //meta
  is_placeholder?: true;
  placeholderUrl?: string;
  tier?: number;
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

export type CategorizedProfiles = {
  [index: number]: AWSCharityProfile[];
};
