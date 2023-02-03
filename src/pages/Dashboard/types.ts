import { IconType } from "components/Icon";

export type LinkGroup = {
  title?: string;
  links: {
    title: string;
    href: string;
    icon: IconType;
  }[];
};
