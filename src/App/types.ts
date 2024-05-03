import type { IconType } from "components/Icon";

export type Link = {
  title: string;
  icon?: {
    type: IconType;
    size: number;
  };
  href: string;
  external?: boolean;
  end?: boolean;
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

export type SocialMediaLink = Required<Omit<Link, "external" | "end">> & {
  title: SocialMedia;
};

export type LinkGroup = {
  title: string;
  links: {
    text: string;
    href?: string;
    exact?: boolean;
  }[];
};
