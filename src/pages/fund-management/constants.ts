import type { LinkGroup } from "layout/dashboard";
import { BookOpenCheckIcon, PieChartIcon } from "lucide-react";
import { routes } from "./routes";

const linkGroup1: LinkGroup = {
  links: [
    {
      title: "Dashboard",
      to: routes.dashboard,
      icon: {
        fn: PieChartIcon,
        size: 18,
      },
      end: true,
    },
    {
      title: "Tx Requests",
      to: routes.tx_requests,
      icon: {
        fn: BookOpenCheckIcon,
        size: 18,
      },
      end: true,
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1];
