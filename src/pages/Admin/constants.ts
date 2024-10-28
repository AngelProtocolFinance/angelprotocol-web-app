import { adminRoutes } from "constants/routes";
import type { LinkGroup } from "layout/DashboardLayout";
import {
  Blocks,
  CircleDollarSign,
  CircleUserRound,
  Image,
  LayoutDashboard,
  ListCheck,
  Settings,
  UsersRound,
  Wallet,
} from "lucide-react";

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
        fn: LayoutDashboard,
        size: 20,
      },
      end: true,
    },
    {
      title: "Donations",
      to: sidebarRoutes.donations,
      icon: {
        fn: CircleDollarSign,
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
        fn: CircleUserRound,
        size: 20.5,
      },
    },
    {
      title: "Programs",
      to: sidebarRoutes.programs,
      icon: {
        fn: ListCheck,
        size: 22,
      },
    },
    {
      title: "Media",
      to: sidebarRoutes.media,
      icon: {
        fn: Image,
        size: 20,
      },
    },
    {
      title: "Banking",
      to: sidebarRoutes.banking,
      icon: {
        fn: Wallet,
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
        fn: Settings,
        size: 21,
      },
    },
    {
      title: "Members",
      to: "members",
      icon: {
        fn: UsersRound,
        size: 21,
      },
    },
    {
      title: "Donation Form Builder",
      to: sidebarRoutes.form_builder,
      icon: {
        fn: Blocks,
        size: 25,
      },
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1, linkGroup2, linkGroup3];
