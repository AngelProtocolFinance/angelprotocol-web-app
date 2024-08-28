import type { LinkGroup } from "layout/DashboardLayout";

export const routes = {
  index: "",
  edit_profile: "edit-profile",
  donations: "donations",
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
          size: 22,
        },
      },
      {
        title: "Edit Profile",
        to: routes.edit_profile,
        icon: {
          type: "User",
          size: 21,
        },
      },
      {
        title: "Settings",
        to: routes.settings,
        icon: {
          type: "Gear",
          size: 22,
        },
      },
    ],
  },
];
