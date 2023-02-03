import { LinkGroup } from "../types";
import { appRoutes } from "constants/routes";
import { routes } from "./routes";

export const LINK_GROUPS: LinkGroup[] = [
  {
    links: [
      {
        title: "Dashboard",
        href: `${appRoutes.aif}${routes.index}`,
        icon: "Dashboard",
      },
      {
        title: "Withdraw",
        href: `${appRoutes.aif}${routes.withdraw}`,
        icon: "MoneyBill",
      },
      {
        title: "Contributions",
        href: `${appRoutes.aif}${routes.contributions}`,
        icon: "DollarCircle",
      },
    ],
  },
];
