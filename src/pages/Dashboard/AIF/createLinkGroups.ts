import { LinkGroup } from "../types";
import { appRoutes } from "constants/routes";
import { routes } from "./routes";

export default function createLinkGroups(id: string | undefined): LinkGroup[] {
  const rootPath = `${appRoutes.aif}/${id}`;

  const linkGroups: LinkGroup[] = [
    {
      links: [
        {
          title: "Dashboard",
          to: `${rootPath}${routes.index}`,
          icon: "Dashboard",
        },
        {
          title: "Withdraw",
          to: `${rootPath}${routes.withdraw}`,
          icon: "MoneyBill",
        },
        {
          title: "Contributions",
          to: `${rootPath}${routes.contributions}`,
          icon: "DollarCircle",
        },
      ],
    },
    {
      title: "Invest",
      links: [
        {
          icon: "Analytics",
          title: "Invest Dashboard",
          to: `${rootPath}${routes.invest_dashboard}`,
        },
        {
          icon: "WaterDrop",
          title: "Liquid Account",
          to: `${rootPath}${routes.liquid_account}`,
        },
        {
          icon: "Lock",
          title: "Locked Account",
          to: `${rootPath}${routes.locked_account}`,
        },
        {
          icon: "PermDataSettings",
          title: "Settings",
          to: `${rootPath}${routes.settings}`,
        },
      ],
    },
  ];

  return linkGroups;
}
