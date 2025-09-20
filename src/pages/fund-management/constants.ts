import type { LinkGroup } from "layout/dashboard";
import { BookOpenCheckIcon, LineChartIcon, PiggyBankIcon } from "lucide-react";
import { routes } from "./routes";

const linkGroup1: LinkGroup = {
  links: [
    {
      title: "Investments",
      to: routes.investments,
      icon: {
        fn: LineChartIcon,
        size: 18,
      },
      end: true,
    },
    {
      title: "Redemption requests",
      to: routes.redeem_request,
      icon: {
        fn: BookOpenCheckIcon,
        size: 18,
      },
      end: true,
    },
    {
      title: "Savings",
      to: routes.savings,
      icon: {
        fn: PiggyBankIcon,
        size: 18,
      },
      end: true,
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1];
