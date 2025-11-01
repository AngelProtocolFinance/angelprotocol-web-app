import type { LinkGroup } from "layout/dashboard";
import {
  Blocks,
  BoxIcon,
  CircleDollarSign,
  CircleUserRound,
  Heart,
  Image,
  LayoutDashboard,
  ListCheck,
  MegaphoneIcon,
  PiggyBankIcon,
  PlugZap,
  Settings,
  SproutIcon,
  UsersRound,
  Wallet,
} from "lucide-react";
import { routes } from "./routes";

const { program_editor: _pe, ...sidebar_routes } = routes;

const linkGroup1: LinkGroup = {
  links: [
    {
      title: "Dashboard",
      to: sidebar_routes.dashboard,
      icon: {
        fn: LayoutDashboard,
        size: 20,
      },
      end: true,
    },
    {
      title: "Donations",
      to: sidebar_routes.donations,
      icon: {
        fn: CircleDollarSign,
        size: 22,
      },
    },
    {
      title: "Savings",
      to: sidebar_routes.savings,
      icon: {
        fn: PiggyBankIcon,
        size: 22,
      },
    },
    {
      title: "Investments",
      to: sidebar_routes.investments,
      icon: {
        fn: SproutIcon,
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
      to: sidebar_routes.edit_profile,
      icon: {
        fn: CircleUserRound,
        size: 20.5,
      },
    },
    {
      title: "Programs",
      to: sidebar_routes.programs,
      icon: {
        fn: ListCheck,
        size: 22,
      },
    },
    {
      title: "Media",
      to: sidebar_routes.media,
      icon: {
        fn: Image,
        size: 20,
      },
    },
    {
      title: "Assets",
      to: sidebar_routes.assets,
      icon: {
        fn: BoxIcon,
        size: 20,
      },
    },
    {
      title: "Banking",
      to: sidebar_routes.banking,
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
      to: sidebar_routes.form_builder,
      icon: {
        fn: Blocks,
        size: 25,
      },
    },
    {
      title: "Donation Forms",
      to: sidebar_routes.forms,
      icon: {
        fn: Blocks,
        size: 25,
      },
    },
    {
      title: "Fundraisers",
      to: sidebar_routes.funds,
      icon: {
        fn: Heart,
        size: 21,
      },
    },
    {
      title: "Integrations",
      to: sidebar_routes.integrations,
      icon: {
        fn: PlugZap,
        size: 23,
      },
    },
    {
      title: "Referrals",
      to: sidebar_routes.referrals,
      icon: {
        fn: MegaphoneIcon,
        size: 22,
      },
    },
  ],
};

export const linkGroups: LinkGroup[] = [linkGroup1, linkGroup2, linkGroup3];
