import { Link } from "./Sidebar/types";
import { Templates } from "pages/Admin/types";
import { ProposalBase } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { stringByteSchema } from "schemas/string";
import { adminRoutes } from "constants/routes";

export const templates: { [key in Templates]: string } = {
  //index fund
  if_alliance: "if_alliance",
  if_create: "if_create",
  if_remove: "if_remove",
  if_members: "if_members",
  if_config: "if_config",
  if_owner: "if_owner",

  //cw3
  cw3_config: "cw3_config",
  cw3_transfer: "cw3_transfer",
  cw3_application: "",
  review_cw3_config: "review_cw3_config",

  //cw4
  cw4_members: "cw4_members",

  //account
  acc_withdraw: "acc_withdraw",
  acc_profile: "acc_profile",
  acc_endow_status: "acc_endow_status",

  //registrar
  reg_config: "reg_config",
  reg_owner: "reg_owner",
};

export const templateRoutes: { [key in Templates | "index"]: string } = {
  ...templates,
  index: "",
};

export const proposalShape: SchemaShape<ProposalBase> = {
  title: stringByteSchema(4, 64),
  description: stringByteSchema(4, 1024),
};

const {
  proposal,
  templates: templatesRoute,
  account,
  ...restAdminRoutes
} = adminRoutes;

const sidebarRoutes = {
  ...restAdminRoutes,
  liquidAccount: `${account}/liquid`,
  lockedAccount: `${account}/locked`,
} as const;

type SidebarRoutes = typeof sidebarRoutes;

const _to: keyof Link = "to";

export const LINKS: {
  [key in keyof SidebarRoutes]: Link & { [_to]: SidebarRoutes[key] };
} = {
  liquidAccount: {
    title: "Liquid Account",
    to: sidebarRoutes.liquidAccount,
    icon: {
      type: "WaterDrop",
      size: 24,
    },
  },
  lockedAccount: {
    title: "Locked Account",
    to: sidebarRoutes.lockedAccount,
    icon: {
      type: "Lock",
      size: 24,
    },
  },
  index_review: {
    title: "Applications",
    to: sidebarRoutes.index_review,
    icon: {
      type: "Dashboard",
      size: 24,
    },
    end: true,
  },
  index: {
    title: "Dashboard",
    to: sidebarRoutes.index,
    icon: {
      type: "Dashboard",
      size: 24,
    },
    end: true,
  },
  withdraws: {
    title: "Withdraw",
    to: sidebarRoutes.withdraws,
    icon: {
      type: "MoneyBill",
      size: 24,
    },
  },
  contributions: {
    title: "Contributions",
    to: sidebarRoutes.contributions,
    icon: {
      type: "DollarCircle",
      size: 24,
    },
  },
  invest: {
    title: "Invest Dashboard",
    to: sidebarRoutes.invest,
    icon: {
      type: "Analytics",
      size: 24,
    },
  },
  settings: {
    title: "Settings",
    to: sidebarRoutes.settings,
    icon: {
      type: "PermDataSettings",
      size: 24,
    },
  },
  edit_profile: {
    title: "Edit Profile",
    to: sidebarRoutes.edit_profile,
    icon: {
      type: "User",
      size: 24,
    },
  },
  proposals: {
    title: "Decision Center",
    to: sidebarRoutes.proposals,
    icon: {
      type: "ClipboardCheck",
      size: 24,
    },
  },
  widget_config: {
    title: "Widget Configuration",
    to: sidebarRoutes.widget_config,
    icon: {
      type: "Widget",
      size: 24,
    },
  },
};

// THESE WILL BE THE APPROPRIATE ICONS TO USE FOR FUTURE PAGES
// TODO: REMOVE ONCE ALL ARE MOVED INTO `LINKS` ABOVE.
//   const linkGroups: LinkGroup[] = [
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
