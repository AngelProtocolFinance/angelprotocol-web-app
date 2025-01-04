import type { RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";

export const routes: RouteObject[] = [
  { path: appRoutes.blog, lazy: () => import("./Posts").then(convert) },
  {
    path: appRoutes.blog + "/:slug",
    lazy: () => import("./Post").then(convert),
  },
];
