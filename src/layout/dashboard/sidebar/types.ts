import type { Church } from "lucide-react";

export type Link = {
  title: string;
  to: string;
  icon: {
    fn: typeof Church;
    size: number;
  };
  end?: boolean;
  disabled?: boolean;
};

export type LinkGroup = {
  title?: string;
  links: Link[];
};
