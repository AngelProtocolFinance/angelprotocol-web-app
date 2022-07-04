import { IconTypes } from "components/Icon";
import { chainIDs } from "./chainIDs";
import { IS_TEST } from "./env";

type URL_GROUP = {
  [index: string]: string;
};

export const aws_endpoint =
  "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com";
export const apes_endpoint =
  "https://9t0u8zpqjk.execute-api.us-east-1.amazonaws.com";

export const flipside_endpoint = "https://flipside.leslug.com/angel";

//terra urls
export const terra_lcds: URL_GROUP = {
  [chainIDs.terra_main]: "https://phoenix-lcd.terra.dev",
  [chainIDs.terra_test]: "https://pisco-lcd.terra.dev",
  [chainIDs.terra_classic]: "https://fcd.terra.dev",
  [chainIDs.terra_local]: "http://localhost:3060",
};

export const terraLcdUrl = IS_TEST
  ? terra_lcds[chainIDs.terra_test]
  : terra_lcds[chainIDs.terra_main];

export const juno_lcds: URL_GROUP = {
  [chainIDs.juno_main]: "https://lcd-juno.itastakers.com",
  [chainIDs.juno_test]: "https://lcd.uni.juno.deuslabs.fi",
};

export const juno_rpcs: URL_GROUP = {
  [chainIDs.juno_main]: "https://rpc-juno.itastakers.com",
  [chainIDs.juno_test]: "https://rpc.uni.juno.deuslabs.fi",
};

export const junoLcdUrl = IS_TEST
  ? juno_lcds[chainIDs.juno_test]
  : juno_lcds[chainIDs.juno_main];

export const TERRA_FINDER = "https://finder.terra.money";

export const PRIVACY_POLICY =
  "https://storageapi2.fleek.co/57b943eb-ed70-478a-8899-c7859400f77b-bucket/documents/Website and WebApp Privacy Policy (v.110121).docx";

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
    link: "https://angelprotocol.medium.com/",
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
