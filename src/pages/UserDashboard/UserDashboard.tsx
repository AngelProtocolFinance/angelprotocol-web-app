import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { Navigate, type RouteObject } from "react-router";
import { routes } from "./routes";

export const userDashboardRoute: RouteObject = {
  path: appRoutes.user_dashboard,
  lazy: () => import("./layout").then(convert),
  children: [
    {
      path: routes.edit_profile,
      lazy: () => import("./EditProfile").then(convert),
    },
    {
      path: routes.donations,
      lazy: () => import("./Donations").then(convert),
      children: [
        { path: ":id", lazy: () => import("components/KYCForm").then(convert) },
      ],
    },
    { path: routes.settings, lazy: () => import("./Settings").then(convert) },
    { index: true, element: <Navigate to={routes.edit_profile} /> },
  ],
};
