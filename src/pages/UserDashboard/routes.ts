import type { LinkGroup } from "layout/DashboardLayout";
import { CircleDollarSign, CircleUserRound, Settings } from "lucide-react";

export const routes = {
  index: "",
  edit_profile: "edit-profile",
  donations: "donations",
  funds: "funds",
  settings: "settings",
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
        title: "My fundraisers",
        to: routes.funds,
        icon: {
          type: "HeartFill",
          size: 21,
        },
      },
    ],
  },
];
