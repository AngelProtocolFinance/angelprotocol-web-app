import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import image from "assets/images/home-banner.jpg";
import { Profile } from "./types";

export const profile: Profile = {
  charity_image: image, //url of image
  charity_owner: "",
  charity_registration_number: "00000", //"CN201225725"
  annual_revenue: "0", //"Under $100k"
  country_city_origin: "unknown", //"Philippines, Zamboanga City"
  charity_overview: "this charity profile hasn't been setup yet", //long text
  charity_email: "", //"jay@yellowboat.org"
  linkedin_page: "", //"yellowboatph" used as https://linked.com/{linkedin_page}
  charity_programs: "", //long text
  charity_name: "Unknown", //"Yellow Boat of Hope Foundation"
  number_of_employees: "0", //"5-25"
  average_annual_budget: "0", //"$50,000"
  endowment_address: "", //"terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz"
  twitter_handle: "", //"@YellowBoat" used as https://twitter.com/{twitter_handle}
  charity_navigator_rating: "0", //""
  news_media_articles: "", //""You can view our Newsroom here: https://yellowboat.org/about-us/newsroom/.""
  un_sdg: "0", //"4"
  facebook_page: "", //
  is_placeholder: true,
};

export const charity_details = {
  description: "",
  url: "https://angelprotocol.io",
  name: "Charity",
  icon: defaultIcon,
  iconLight: false,
};
