import { SocialMedia } from "./types";
import { IconTypes } from "components/Icon";

type SocialMediaLink = {
  iconType: IconTypes;
  link: string;
  type: SocialMedia;
};

export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    iconType: "Twitter",
    link: "https://twitter.com/angelprotocol",
    type: "Twitter",
  },
  {
    iconType: "Telegram",
    link: "https://t.me/angelprotocoI",
    type: "Telegram",
  },
  {
    iconType: "Discord",
    link: "https://discord.gg/RhqA652ySA",
    type: "Discord",
  },
  {
    iconType: "Youtube",
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    type: "YouTube",
  },
  {
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
    type: "Medium",
  },
  {
    iconType: "FacebookCircle",
    link: "https://www.facebook.com/AngelProtocolFB/",
    type: "Facebook",
  },
  {
    iconType: "Linkedin",
    link: "https://www.linkedin.com/company/angel-protocol/",
    type: "Linkedin",
  },
  {
    iconType: "Instagram",
    link: "https://www.instagram.com/angelprotocol/",
    type: "Instagram",
  },
];
