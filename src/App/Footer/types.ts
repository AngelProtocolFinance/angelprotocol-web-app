import { IconType } from "components/Icon";

type SocialMedia =
  | "Twitter"
  | "Telegram"
  | "Discord"
  | "YouTube"
  | "Medium"
  | "Facebook"
  | "Linkedin"
  | "Instagram";

export type SocialMediaLinks = {
  [index in SocialMedia]: { iconType: IconType; link: string };
};

export type Section = {
  title: string;
  links: {
    text: string;
    href?: string;
  }[];
};
