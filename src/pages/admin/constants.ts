import { adminRoutes } from "constants/routes";
import type { LinkGroup } from "layout/dashboard";
import {
  Blocks,
  CircleDollarSign,
  CircleUserRound,
  Heart,
  Image,
  LayoutDashboard,
  ListCheck,
  MegaphoneIcon,
  PlugZap,
  Settings,
  UsersRound,
  Wallet,
} from "lucide-react";

const { program_editor: _pe, ...sidebarRoutes } = adminRoutes;

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
    {
      title: "Fundraisers",
      to: sidebarRoutes.funds,
      icon: {
        fn: Heart,
        size: 21,
      },
    },
    {
      title: "Integrations",
      to: sidebarRoutes.integrations,
      icon: {
        fn: PlugZap,
        size: 23,
      },
    },
    {
      title: "Referrals",
      to: sidebarRoutes.referrals,
      icon: {
        fn: MegaphoneIcon,
        size: 22,
      },
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1, linkGroup2, linkGroup3];
