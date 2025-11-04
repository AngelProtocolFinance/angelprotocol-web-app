import type { Icon } from "lucide-react";

export type Link = {
  title: string;
  to: string;
  icon: {
    fn: typeof Icon;
    size: number;
  };
  end?: boolean;
  disabled?: boolean;
};

export type LinkGroup = {
  title?: string;
  links: Link[];
};
