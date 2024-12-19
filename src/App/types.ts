import type { Church } from "lucide-react";

export type Link = {
  title: string;
  icon?: {
    type: typeof Church;
    size: number;
  };
  href: string;
  external?: boolean;
  end?: boolean;
  sub?: boolean;
};

export type LinkGroup = {
  title: string;
  links: {
    text: string;
    href?: string;
    exact?: boolean;
  }[];
};
