import { IconType } from "@ap/components/icon";

export type Link = {
  title: string;
  icon?: {
    type: IconType;
    size: number;
  };
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
