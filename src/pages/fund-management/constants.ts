import type { LinkGroup } from "layout/dashboard";
import { BookOpenCheckIcon, LineChartIcon, PiggyBankIcon } from "lucide-react";
import { routes } from "./routes";

/** to reduce number to txs, skip tiny amounts */
export const MIN_INTR_TO_CREDIT = 0.01;

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
        size: 20,
      },
      end: true,
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1];
