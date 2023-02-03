import { IconType } from "components/Icon";

export type LinkGroup = {
  title?: string;
  links: {
    title: string;
    to: string;
    icon: IconType;
  }[];
};
