import { IconType } from "components/Icon";

export type Link = {
  title: string;
  to: string;
  icon: {
    type: IconType;
    size: number;
  };
};

export type LinkGroup = {
  title?: string;
  links: Link[];
};
