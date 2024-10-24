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
        size: 20,
      },
      end: true,
    },
    {
      title: "Donations",
      to: sidebarRoutes.donations,
      icon: {
        type: "DollarCircle",
        size: 22,
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
        size: 22,
      },
    },
    {
      title: "Media",
      to: sidebarRoutes.media,
      icon: {
        type: "Picture",
        size: 20,
      },
    },
    {
      title: "Banking",
      to: sidebarRoutes.banking,
      icon: {
        type: "Wallet",
        size: 20,
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
        size: 21,
      },
    },
    {
      title: "Donation Form Builder",
      to: sidebarRoutes.form_builder,
      icon: {
        type: "Widget",
        size: 25,
      },
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1, linkGroup2, linkGroup3];
