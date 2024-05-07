import { appRoutes } from "constants/routes";
import type { LinkGroup } from "layout/DashboardLayout";

export const routes = {
  index: "",
  edit_profile: "edit-profile",
};

export const linkGroups: LinkGroup[] = [
  {
    links: [
      {
        title: "Edit Profile",
        to: routes.edit_profile,
        icon: {
          type: "User",
          size: 20.5,
        },
      },
      {
        title: "My Donations",
        to: appRoutes.donations,
        icon: {
          type: "DollarCircle",
          size: 24,
        },
      },
    ],
  },
];
