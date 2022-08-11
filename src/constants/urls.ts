import { IconTypes } from "components/Icon";

export const APIs = {
  aws: "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com",
  apes: "https://9t0u8zpqjk.execute-api.us-east-1.amazonaws.com",
  flipside: "https://flipside.leslug.com/angel",
};

export const PRIVACY_POLICY =
  "https://storageapi2.fleek.co/57b943eb-ed70-478a-8899-c7859400f77b-bucket/documents/Website and WebApp Privacy Policy (v.110121).pdf";

export const LITEPAPER =
  "https://storageapi.fleek.co/57b943eb-ed70-478a-8899-c7859400f77b-bucket/documents/ap-litepaper-v3.pdf";

type SocialMediaLink = {
  id: number;
  iconType: IconTypes;
  link: string;
  textColor: string;
  title: string;
};

export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    id: 1,
    iconType: "Twitter",
    link: "https://twitter.com/angelprotocol",
    textColor: "text-gray-50 hover:text-grey-50/75",
    title: "Twitter",
  },
  {
    id: 2,
    iconType: "Telegram",
    link: "https://t.me/angelprotocoI",
    textColor: "text-blue-50 hover:text-blue-50/75",
    title: "Telegram",
  },
  {
    id: 3,
    iconType: "Youtube",
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    textColor: "text-white hover:text-white/75",
    title: "YouTube",
  },
  {
    id: 4,
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
    textColor: "text-white hover:text-white/75",
    title: "Medium",
  },
  {
    id: 5,
    iconType: "DiscordLine",
    link: "https://discord.gg/RhqA652ySA",
    textColor: "text-white hover:text-white/75",
    title: "Discord",
  },
];

export const COUNTRIES_REST_ENDPOINT = "https://restcountries.com/v3.1";
