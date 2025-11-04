import type { LinkGroup } from "layout/dashboard";
import {
  BlocksIcon,
  CircleDollarSign,
  CircleUserRound,
  Heart,
  MegaphoneIcon,
  RefreshCw,
  Settings,
} from "lucide-react";

export const routes = {
  index: "",
  edit_profile: "edit-profile",
  donations: "donations",
  funds: "funds",
  settings: "settings",
  referrals: "referrals",
  subscriptions: "subscriptions",
  forms: "forms",
};

export const linkGroups: LinkGroup[] = [
  {
    links: [
      {
        title: "My Donations",
        to: routes.donations,
        icon: {
          fn: CircleDollarSign,
          size: 22,
        },
      },
      {
        title: "Recurring Donations",
        to: routes.subscriptions,
        icon: {
          fn: RefreshCw,
          size: 20,
        },
      },
      {
        title: "Edit Profile",
        to: routes.edit_profile,
        icon: {
          fn: CircleUserRound,
          size: 21,
        },
      },
      {
        title: "Settings",
        to: routes.settings,
        icon: {
          fn: Settings,
          size: 22,
        },
      },
      {
        title: "My Fundraisers",
        to: routes.funds,
        icon: {
          fn: Heart,
          size: 21,
        },
      },
      {
        title: "Donation Forms",
        to: routes.forms,
        icon: {
          fn: BlocksIcon,
          size: 21,
        },
      },

      {
        title: "My Referrals",
        to: routes.referrals,
        icon: {
          fn: MegaphoneIcon,
          size: 22,
        },
      },
    ],
  },
];
