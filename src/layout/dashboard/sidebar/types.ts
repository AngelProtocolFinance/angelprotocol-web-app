import type { LucideIcon } from "lucide-react";

export type Link = {
  title: string;
  to: string;
  icon: {
    fn: LucideIcon;
    size: number;
  };
  end?: boolean;
  disabled?: boolean;
};

export type LinkGroup = {
  title?: string;
  links: Link[];
};
