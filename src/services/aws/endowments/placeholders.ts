import { Profile } from "types/services/aws/endowments";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import image from "assets/images/home-banner.jpg";

export const profile: Profile = {
  //terra
  charity_owner: "",
  endowment_address: "", //"terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz"
  total_liq: 100,
  total_lock: 100, //overall, total_liq, and total_lock are in human-readable format base 10 numbers
  overall: 200,

  //landing
  un_sdg: "0", //"4"
  charity_name: "Unknown", //"Yellow Boat of Hope Foundation"
  charity_image: image, //url of image
  charity_overview: "this charity profile hasn't been setup yet", //long text
  charity_registration_number: "00000", //"CN201225725"
  country_city_origin: "unknown", //"Philippines, Zamboanga City"

  //stats
  average_annual_budget: "0", //"$50,000"
  annual_revenue: "0", //"Under $100k"
  number_of_employees: "0", //"5-25"

  //contacts
  charity_email: "", //"jay@yellowboat.org"

  //social
  linkedin_page: "", //"yellowboatph" used as https://linked.com/{linkedin_page}
  facebook_page: "", //
  twitter_handle: "", //"@YellowBoat" used as https://twitter.com/{twitter_handle}

  //content
  charity_navigator_rating: "0", //""
  news_media_articles: "", //""You can view our Newsroom here: https://yellowboat.org/about-us/newsroom/.""
  charity_programs: "", //long text

  //meta
  placeholderUrl: image,
  is_placeholder: true,
};

export const charity_details = {
  description: "",
  url: "https://angelprotocol.io",
  name: "Charity",
  icon: defaultIcon,
  iconLight: false,
};
