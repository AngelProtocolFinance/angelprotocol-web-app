import { SocialMedia } from "./types";
import { IconTypes } from "components/Icon";

type SocialMediaLink = {
  iconType: IconTypes;
  link: string;
  title: SocialMedia;
};

export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    iconType: "Twitter",
    link: "https://twitter.com/angelprotocol",
    title: "Twitter",
  },
  {
    iconType: "Telegram",
    link: "https://t.me/angelprotocoI",
    title: "Telegram",
  },
  {
    iconType: "Discord",
    link: "https://discord.gg/RhqA652ySA",
    title: "Discord",
  },
  {
    iconType: "Youtube",
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
    title: "YouTube",
  },
  {
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
    title: "Medium",
  },
  {
    iconType: "FacebookCircle",
    link: "https://www.facebook.com/AngelProtocolFB/",
    title: "Facebook",
  },
  {
    iconType: "Linkedin",
    link: "https://www.linkedin.com/company/angel-protocol/",
    title: "Linkedin",
  },
  {
    iconType: "Instagram",
    link: "https://www.instagram.com/angelprotocol/",
    title: "Instagram",
  },
];
