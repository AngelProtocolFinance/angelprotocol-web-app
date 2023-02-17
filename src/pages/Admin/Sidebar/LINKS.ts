import { Link } from "./types";
import { adminRoutes } from "constants/routes";

const _to: keyof Link = "to";

type SIDEBAR_ROUTES = Exclude<
  adminRoutes,
  adminRoutes.proposal | adminRoutes.templates
>;

export const LINKS: { [key in SIDEBAR_ROUTES]: Link & { [_to]: key } } = {
  [adminRoutes.index]: {
    title: "Dashboard",
    to: adminRoutes.index,
    icon: {
      type: "Dashboard",
      size: 24,
    },
  },
  [adminRoutes.withdraws]: {
    title: "Withdraw",
    to: adminRoutes.withdraws,
    icon: {
      type: "MoneyBill",
      size: 24,
    },
  },
  [adminRoutes.contributions]: {
    title: "Contributions",
    to: adminRoutes.contributions,
    icon: {
      type: "DollarCircle",
      size: 24,
    },
  },
  [adminRoutes.invest]: {
    title: "Invest Dashboard",
    to: adminRoutes.invest,
    icon: {
      type: "Analytics",
      size: 24,
    },
  },
  [adminRoutes.settings]: {
    title: "Settings",
    to: adminRoutes.settings,
    icon: {
      type: "PermDataSettings",
      size: 24,
    },
  },
  [adminRoutes.edit_profile]: {
    title: "Edit Profile",
    to: adminRoutes.edit_profile,
    icon: {
      type: "User",
      size: 24,
    },
  },
  [adminRoutes.proposals]: {
    title: "Decision Center",
    to: adminRoutes.proposals,
    icon: {
      type: "ClipboardCheck",
      size: 24,
    },
  },
  [adminRoutes.widget_config]: {
    title: "Widget Configuration",
    to: adminRoutes.widget_config,
    icon: {
      type: "Widget",
      size: 24,
    },
  },
};

// TODO: REMOVE ONCE AIF OR NPO PAGE IS IMPLEMENTED.
// THIS IS JUST A HELPER FOR TESTING
//   const linkGroups: LinkGroup[] = [
//     {
//       links: [],
//     },
//     {
//       title: "Invest",
//       links: [
//         {
//           icon: {
//             type: "WaterDrop",
//             size: 24,
//           },
//           title: "Liquid Account",
//           to: `${rootPath}${routes.liquid_account}`,
//         },
//         {
//           icon: {
//             type: "Lock",
//             size: 24,
//           },
//           title: "Locked Account",
//           to: `${rootPath}${routes.locked_account}`,
//         },
//       ],
//     },
//     {
//       title: "Profile",
//       links: [
//         {
//           icon: {
//             type: "ListBox",
//             size: 24,
//           },
//           title: "Programs",
//           to: `${rootPath}${routes.programs}`,
//         },
//         {
//           icon: {
//             type: "Image",
//             size: 24,
//           },
//           title: "Media",
//           to: `${rootPath}${routes.media}`,
//         },
//       ],
//     },
//     {
//       title: "Manage",
//       links: [
//         {
//           icon: {
//             type: "FactCheck",
//             size: 24,
//           },
//           title: "Whitelists",
//           to: `${rootPath}${routes.whitelists}`,
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       links: [
//         {
//           icon: {
//             type: "AccountBalanceWallet",
//             size: 24,
//           },
//           title: "Admin Wallet",
//           to: `${rootPath}${routes.admin_wallet}`,
//         },
//         {
//           icon: {
//             type: "SecurityScan",
//             size: 24,
//           },
//           title: "Donor Verification",
//           to: `${rootPath}${routes.donor_verification}`,
//         },
//         {
//           icon: {
//             type: "PermDataSettings",
//             size: 24,
//           },
//           title: "Permissions",
//           to: `${rootPath}${routes.permissions}`,
//         },
//       ],
//     },
//   ];

//   return linkGroups;
// }
