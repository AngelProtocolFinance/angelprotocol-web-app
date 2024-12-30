import { appRoutes } from "constants/routes";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  { path: appRoutes.blog, lazy: () => import("./Posts") },
  { path: appRoutes.blog + "/:slug", lazy: () => import("./Post") },
];
