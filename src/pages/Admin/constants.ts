import { adminRoutes } from "constants/routes";
import { Link } from "./Sidebar/types";

const { program_editor: _pe, index: _i, ...restAdminRoutes } = adminRoutes;

const sidebarRoutes = {
  ...restAdminRoutes,
  dashboard: "",
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
  dashboard: {
    title: "Dashboard",
    to: sidebarRoutes.dashboard,
    icon: {
      type: "Dashboard",
      size: 24,
    },
    end: true,
  },
  donations: {
    title: "Donations",
    to: sidebarRoutes.donations,
    icon: {
      type: "DollarCircle",
      size: 24,
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
    title: "Donation Form Builder",
    to: sidebarRoutes.widget_config,
    icon: {
      type: "Widget",
      size: 24,
    },
  },
  settings: {
    title: "Settings",
    to: "settings",
    icon: {
      type: "Gear",
      size: 21,
    },
  },
  members: {
    title: "Members",
    to: "members",
    icon: {
      type: "Users",
      size: 24,
    },
  },

  banking: {
    title: "Banking",
    to: sidebarRoutes.banking,
    icon: {
      type: "Wallet",
      size: 21.7,
    },
  },
};
