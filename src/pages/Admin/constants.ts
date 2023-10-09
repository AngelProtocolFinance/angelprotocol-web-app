import { Link } from "./Sidebar/types";
import { ProposalBase, Templates } from "./types";
import { SchemaShape } from "schemas/types";
import { stringByteSchema } from "schemas/string";
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

const { program_editor, index, ...restAdminRoutes } = adminRoutes;

const sidebarRoutes = {
  ...restAdminRoutes,
} as const;

type SidebarRoutes = typeof sidebarRoutes;

const _to: keyof Link = "to";

export const LINKS: {
  [key in keyof SidebarRoutes]: Link & { [_to]: SidebarRoutes[key] };
} = {
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

  widget_config: {
    title: "Widget Configuration",
    to: "widget-config",
    icon: {
      type: "Widget",
      size: 24,
    },
  },
  banking: {
    title: "Banking (Coming soon)",
    to: "banking",
    icon: {
      type: "Wallet",
      size: 21.7,
    },
    disabled: true,
  },
};
