import { SocialMedia } from "./types";
import { IconTypes } from "components/Icon";

type SocialMediaLinks = {
  [index in SocialMedia]: { iconType: IconTypes; link: string };
};

export const SOCIAL_MEDIA_LINKS: SocialMediaLinks = {
  Twitter: {
    iconType: "Twitter",
    link: "https://twitter.com/angelprotocol",
  },
  Telegram: {
    iconType: "Telegram",
    link: "https://t.me/angelprotocoI",
  },
  Discord: {
    iconType: "Discord",
    link: "https://discord.gg/RhqA652ySA",
  },
  YouTube: {
    iconType: "Youtube",
    link: "https://www.youtube.com/channel/UCPYj_fooJCfc_tc52rPiw1w",
  },
  Medium: {
    iconType: "Medium",
    link: "https://angelprotocol.medium.com",
  },
  Facebook: {
    iconType: "FacebookCircle",
    link: "https://www.facebook.com/AngelProtocolFB/",
  },
  Linkedin: {
    iconType: "Linkedin",
    link: "https://www.linkedin.com/company/angel-protocol/",
  },
  Instagram: {
    iconType: "Instagram",
    link: "https://www.instagram.com/angelprotocol/",
  },
};
