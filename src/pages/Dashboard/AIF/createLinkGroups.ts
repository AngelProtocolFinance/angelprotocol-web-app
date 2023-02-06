import { LinkGroup } from "../types";
import { appRoutes } from "constants/routes";
import { routes } from "./routes";

export default function createLinkGroups(id: number): LinkGroup[] {
  const rootPath = `${appRoutes.aif}/${id}`;

  const linkGroups: LinkGroup[] = [
    {
      links: [
        {
          title: "Dashboard",
          to: rootPath,
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
    {
      title: "Profile",
      links: [
        {
          icon: "User",
          title: "Edit Profile",
          to: `${rootPath}${routes.edit_profile}`,
        },
        {
          icon: "ListBox",
          title: "Programs",
          to: `${rootPath}${routes.programs}`,
        },
        {
          icon: "Image",
          title: "Media",
          to: `${rootPath}${routes.media}`,
        },
      ],
    },
    {
      title: "Manage",
      links: [
        {
          icon: "ClipboardCheck",
          title: "Decision Center",
          to: `${rootPath}${routes.decision_center}`,
        },
        {
          icon: "FactCheck",
          title: "Whitelists",
          to: `${rootPath}${routes.whitelists}`,
        },
      ],
    },
    {
      title: "Settings",
      links: [
        {
          icon: "AccountBalanceWallet",
          title: "Admin Wallet",
          to: `${rootPath}${routes.admin_wallet}`,
        },
        {
          icon: "SecurityScan",
          title: "Donor Verification",
          to: `${rootPath}${routes.donor_verification}`,
        },
        {
          icon: "PermDataSettings",
          title: "Permissions",
          to: `${rootPath}${routes.permissions}`,
        },
      ],
    },
  ];

  return linkGroups;
}
