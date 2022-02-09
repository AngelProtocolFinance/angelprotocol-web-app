import { EditableProfileAttr } from "./types";

export default function EditForm() {
  return <form>edit form</form>;
}

const fieldLabels: { [key in keyof EditableProfileAttr]: string } = {
  //landing
  un_sdg: "SDG #", //"4" <--dropdown ?
  charity_name: "Name of charity", //"Yellow Boat of Hope Foundation"
  charity_image: "Banner", //url of image
  charity_overview: "", //long text
  charity_registration_number: "", //"CN201225725"
  country_city_origin: "", //"Philippines, Zamboanga City"

  //stats
  average_annual_budget: "", //"$50,000"
  annual_revenue: "", //"Under $100k"
  number_of_employees: "", //"5-25"

  //contacts
  charity_email: "", //"jay@yellowboat.org"

  //social
  linkedin_page: "", //"yellowboatph" used as https://linked.com/{linkedin_page}
  twitter_handle: "", //"@YellowBoat" used as https://twitter.com/{twitter_handle}
  facebook_page: "", // "YellowBoatPH" used as https://facebook.com/{facebook_page}

  //content
  charity_navigator_rating: "", //""
  //meta
};

/**
 *   charity_owner: string; // charity owner wallet address
  endowment_address: string; //"terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz"
  url?: string;

  //landing
  un_sdg: string; //"4"
  charity_name: string; //"Yellow Boat of Hope Foundation"
  charity_image?: string; //url of image
  charity_overview: string; //long text

  //stats
  charity_registration_number: string; //"CN201225725"
  country_city_origin: string; //"Philippines, Zamboanga City"
  average_annual_budget: string; //"$50,000"
  annual_revenue: string; //"Under $100k"
  number_of_employees: string; //"5-25"

  //contacts
  charity_email: string; //"jay@yellowboat.org"

  //social
  linkedin_page: string; //"yellowboatph" used as https://linked.com/{linkedin_page}
  twitter_handle: string; //"@YellowBoat" used as https://twitter.com/{twitter_handle}
  facebook_page: string; // "YellowBoatPH" used as https://facebook.com/{facebook_page}

  //content
  charity_programs: string; //long text
  charity_navigator_rating: string; //""
  news_media_articles: string; //""You can view our Newsroom here: https://yellowboat.org/about-us/newsroom/.""

  //meta
  is_placeholder?: true;
 */
