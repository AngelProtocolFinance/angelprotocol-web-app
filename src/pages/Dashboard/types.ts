import { IconType } from "components/Icon";

export type Link = {
  title: string;
  to: string;
  icon: IconType;
};

export type LinkGroup = {
  title?: string;
  links: Link[];
};
