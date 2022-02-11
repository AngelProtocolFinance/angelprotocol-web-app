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

export type CharityInfoBalance = {
  address: string;
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

export type EditableProfileAttr = Omit<
  Profile,
  | "url"
  | "charity_owner" //terra
  | "endowment_address" //terra
  | "total_liq"
  | "total_lock"
  | "overall"
  | "charity_programs" //content
  | "news_media_articles" //content
>;

export type ProfileUpdateProps = { profile: Profile };

export interface QueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}
//owner:endowment
export type Lookup = { [index: string]: string };
export type Accounts = { [index: string]: Details };
