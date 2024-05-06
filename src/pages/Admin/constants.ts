import { adminRoutes } from "constants/routes";
import type { LinkGroup } from "layout/DashboardLayout";

const { program_editor: _pe, index: _i, ...restAdminRoutes } = adminRoutes;

const sidebarRoutes = {
  ...restAdminRoutes,
  dashboard: "",
} as const;

const linkGroup1: LinkGroup = {
  links: [
    {
      title: "Dashboard",
      to: sidebarRoutes.dashboard,
      icon: {
        type: "Dashboard",
        size: 24,
      },
      end: true,
    },
    {
      title: "Donations",
      to: sidebarRoutes.donations,
      icon: {
        type: "DollarCircle",
        size: 24,
      },
    },
  ],
};

const linkGroup2: LinkGroup = {
  title: "Profile",
  links: [
    {
      title: "Edit Profile",
      to: sidebarRoutes.edit_profile,
      icon: {
        type: "User",
        size: 20.5,
      },
    },
    {
      title: "Programs",
      to: sidebarRoutes.programs,
      icon: {
        type: "ListBox",
        size: 24,
      },
    },
    {
      title: "Banking",
      to: sidebarRoutes.banking,
      icon: {
        type: "Wallet",
        size: 21.7,
      },
    },
  ],
};

const linkGroup3: LinkGroup = {
  title: "Manage",
  links: [
    {
      title: "Settings",
      to: "settings",
      icon: {
        type: "Gear",
        size: 21,
      },
    },
    {
      title: "Members",
      to: "members",
      icon: {
        type: "Users",
        size: 24,
      },
    },
    {
      title: "Donation Form Builder",
      to: sidebarRoutes.widget_config,
      icon: {
        type: "Widget",
        size: 24,
      },
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1, linkGroup2, linkGroup3];
