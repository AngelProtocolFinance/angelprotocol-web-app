import { Link } from "./Sidebar/types";
import { adminRoutes } from "constants/routes";

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
    to: sidebarRoutes.widget_config,
    icon: {
      type: "Widget",
      size: 24,
    },
  },
  banking: {
    title: "Banking (Coming soon)",
    to: sidebarRoutes.banking,
    icon: {
      type: "Wallet",
      size: 21.7,
    },
    disabled: true,
  },
};
