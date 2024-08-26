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

export type LinkGroup = {
  title: string;
  links: {
    text: string;
    href?: string;
    exact?: boolean;
  }[];
};
