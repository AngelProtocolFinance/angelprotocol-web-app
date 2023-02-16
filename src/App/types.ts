import { IconType } from "components/Icon";

export type Link = {
  title: string;
  iconType?: IconType;
  href: string;
};

type SocialMedia =
  | "Twitter"
  | "Telegram"
  | "Discord"
  | "YouTube"
  | "Medium"
  | "Facebook"
  | "Linkedin"
  | "Instagram";

export type SocialMediaLink = Required<Link> & { title: SocialMedia };

export type LinkGroup = {
  title: string;
  links: {
    text: string;
    href?: string;
  }[];
};
