import type { LinkGroup } from "layout/dashboard";
import { BarChart2 } from "lucide-react";
import { routes } from "./routes";

const linkGroup1: LinkGroup = {
  links: [
    {
      title: "Nav",
      to: routes.nav,
      icon: {
        fn: BarChart2,
        size: 20,
      },
      end: true,
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1];
