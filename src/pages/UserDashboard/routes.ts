import type { LinkGroup } from "layout/DashboardLayout";

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
          type: "DollarCircle",
          size: 24,
        },
      },
      {
        title: "Edit Profile",
        to: routes.edit_profile,
        icon: {
          type: "User",
          size: 20.5,
        },
      },
      {
        title: "Settings",
        to: routes.settings,
        icon: {
          type: "Gear",
          size: 21,
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
