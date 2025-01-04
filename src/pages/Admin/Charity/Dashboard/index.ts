import type { RouteObject } from "@remix-run/react";
import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";

export const dashboardRoute: RouteObject = {
  id: "dashboard",
  path: adminRoutes.dashboard,
  lazy: () => import("./Dashboard").then(convert),
  children: [
    { path: "edit-alloc", lazy: () => import("./Schedule/Edit").then(convert) },
    { path: "move-funds", lazy: () => import("./MoveFundForm").then(convert) },
  ],
};
