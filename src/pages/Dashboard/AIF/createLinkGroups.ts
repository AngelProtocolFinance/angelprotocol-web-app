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
          icon: {
            type: "Dashboard",
            size: 24,
          },
        },
        {
          title: "Withdraw",
          to: `${rootPath}${routes.withdraw}`,
          icon: {
            type: "MoneyBill",
            size: 24,
          },
        },
        {
          title: "Contributions",
          to: `${rootPath}${routes.contributions}`,
          icon: {
            type: "DollarCircle",
            size: 24,
          },
        },
      ],
    },
    {
      title: "Invest",
      links: [
        {
          icon: {
            type: "Analytics",
            size: 24,
          },
          title: "Invest Dashboard",
          to: `${rootPath}${routes.invest_dashboard}`,
        },
        {
          icon: {
            type: "WaterDrop",
            size: 24,
          },
          title: "Liquid Account",
          to: `${rootPath}${routes.liquid_account}`,
        },
        {
          icon: {
            type: "Lock",
            size: 24,
          },
          title: "Locked Account",
          to: `${rootPath}${routes.locked_account}`,
        },
        {
          icon: {
            type: "PermDataSettings",
            size: 24,
          },
          title: "Settings",
          to: `${rootPath}${routes.settings}`,
        },
      ],
    },
    {
      title: "Profile",
      links: [
        {
          icon: {
            type: "User",
            size: 24,
          },
          title: "Edit Profile",
          to: `${rootPath}${routes.edit_profile}`,
        },
        {
          icon: {
            type: "ListBox",
            size: 24,
          },
          title: "Programs",
          to: `${rootPath}${routes.programs}`,
        },
        {
          icon: {
            type: "Image",
            size: 24,
          },
          title: "Media",
          to: `${rootPath}${routes.media}`,
        },
      ],
    },
    {
      title: "Manage",
      links: [
        {
          icon: {
            type: "ClipboardCheck",
            size: 24,
          },
          title: "Decision Center",
          to: `${rootPath}${routes.decision_center}`,
        },
        {
          icon: {
            type: "FactCheck",
            size: 24,
          },
          title: "Whitelists",
          to: `${rootPath}${routes.whitelists}`,
        },
      ],
    },
    {
      title: "Settings",
      links: [
        {
          icon: {
            type: "AccountBalanceWallet",
            size: 24,
          },
          title: "Admin Wallet",
          to: `${rootPath}${routes.admin_wallet}`,
        },
        {
          icon: {
            type: "SecurityScan",
            size: 24,
          },
          title: "Donor Verification",
          to: `${rootPath}${routes.donor_verification}`,
        },
        {
          icon: {
            type: "PermDataSettings",
            size: 24,
          },
          title: "Permissions",
          to: `${rootPath}${routes.permissions}`,
        },
      ],
    },
  ];

  return linkGroups;
}
