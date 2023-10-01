import { Link } from "./Sidebar/types";
import { ProposalBase, Templates } from "./types";
import { SchemaShape } from "schemas/types";
import { stringByteSchema } from "schemas/string";
import { PAYMENT_WORDS, titleCase } from "constants/common";
import { adminRoutes } from "constants/routes";

export const templates: {
  [K in Templates]: K extends `${infer Contract}.${infer Method}`
    ? `${Contract}_${Method}`
    : string;
} = {
  "index-fund.create-fund": "index-fund_create-fund",
  "index-fund.remove-fund": "index-fund_remove-fund",
  "index-fund.update-members": "index-fund_update-members",
  "index-fund.config": "index-fund_config",

  "multisig.fund-transfer": "multisig_fund-transfer",

  "accounts.withdraw": "accounts_withdraw", //includes locked-withdraw
  "accounts.close": "accounts_close",
  "accounts.update-controller": "accounts_update-controller",

  "registrar.update-config": "registrar_update-config",
  "registrar.update-owner": "registrar_update-owner",
  "registrar.add-token": "registrar_add-token",
  "registrar.add-accounts-contract": "registrar_add-accounts-contract",
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
  application,
  proposal,
  templates: templatesRoute,
  account,
  program_editor,
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
  other_settings: {
    title: "Other settings",
    to: sidebarRoutes.other_settings,
    icon: {
      type: "Settings",
      size: 23,
    },
  },
  admin_wallet: {
    title: "Admin Wallet",
    to: sidebarRoutes.admin_wallet,
    icon: {
      type: "Wallet",
      size: 21.7,
    },
  },
  liquidAccount: {
    title: `${titleCase(PAYMENT_WORDS.accounts.liquid)} Account`,
    to: sidebarRoutes.liquidAccount,
    icon: {
      type: "WaterDrop",
      size: 24,
    },
  },
  lockedAccount: {
    title: `${titleCase(PAYMENT_WORDS.accounts.locked)} Account`,
    to: sidebarRoutes.lockedAccount,
    icon: {
      type: "Lock",
      size: 25.5,
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
  deposits: {
    title: "Deposit",
    to: sidebarRoutes.deposits,
    icon: {
      type: "Deposit",
      size: 24,
    },
  },
  withdraws: {
    title: "Withdraw",
    to: sidebarRoutes.withdraws,
    icon: {
      type: "MoneyBill",
      size: 22,
    },
  },
  contributions: {
    title: titleCase(PAYMENT_WORDS.noun.plural),
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
  // settings: {
  //   title: "Settings",
  //   to: sidebarRoutes.settings,
  //   icon: {
  //     type: "PermDataSettings",
  //     size: 24,
  //   },
  // },
  edit_profile: {
    title: "Edit Profile",
    to: sidebarRoutes.edit_profile,
    icon: {
      type: "User",
      size: 20.5,
    },
  },
  programs: {
    title: "Programs",
    to: sidebarRoutes.programs,
    icon: {
      type: "ListBox",
      size: 24,
    },
  },
  permissions: {
    title: "Permissions",
    to: sidebarRoutes.permissions,
    icon: {
      type: "PermDataSettings",
      size: 24,
    },
  },
  proposals: {
    title: "Decision Center",
    to: sidebarRoutes.proposals,
    icon: {
      type: "ClipboardCheck",
      size: 20,
    },
  },
  whitelists: {
    title: "Whitelists",
    to: sidebarRoutes.whitelists,
    icon: {
      type: "FactCheck",
      size: 22,
    },
  },
  maturity: {
    title: "Maturity",
    to: "maturity",
    icon: {
      type: "Calendar",
      size: 24,
    },
  },
  widget_config: {
    title: "Widget Configuration",
    to: "widget-config",
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
