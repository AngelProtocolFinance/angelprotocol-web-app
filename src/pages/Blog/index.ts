import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  { path: appRoutes.blog, lazy: () => import("./Posts").then(convert) },
  {
    path: appRoutes.blog + "/:slug",
    lazy: () => import("./Post").then(convert),
  },
];
