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

export type MergedEndowment = Endowment & {
  total_liq: number;
  total_lock: number;
  overall: number;
};
export interface Details {
  description: string;
  url: string;
  name: string;
  icon: string;
  iconLight?: boolean;
  tier: number;
}

export interface Profile {
  url?: string;
  charity_image?: string; //url of image
  charity_owner: string; // charity owner wallet address
  charity_registration_number: string; //"CN201225725"
  annual_revenue: string; //"Under $100k"
  country_city_origin: string; //"Philippines, Zamboanga City"
  charity_overview: string; //long text
  charity_email: string; //"jay@yellowboat.org"
  linkedin_page: string; //"yellowboatph" used as https://linked.com/{linkedin_page}
  charity_programs: string; //long text
  charity_name: string; //"Yellow Boat of Hope Foundation"
  number_of_employees: string; //"5-25"
  average_annual_budget: string; //"$50,000"
  endowment_address: string; //"terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz"
  twitter_handle: string; //"@YellowBoat" used as https://twitter.com/{twitter_handle}
  charity_navigator_rating: string; //""
  news_media_articles: string; //""You can view our Newsroom here: https://yellowboat.org/about-us/newsroom/.""
  un_sdg: string; //"4"
  facebook_page: string; // "YellowBoatPH" used as https://facebook.com/{facebook_page}
  is_placeholder?: true;
}

export type ProfileUpdateProps = { profile: Profile };

export interface QueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}
//owner:endowment
export type Lookup = { [index: string]: string };
export type Accounts = { [index: string]: Details };
