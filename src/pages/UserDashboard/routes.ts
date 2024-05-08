import type { LinkGroup } from "layout/DashboardLayout";

export const routes = {
  index: "",
  edit_profile: "edit-profile",
  donations: "donations",
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
    ],
  },
];
