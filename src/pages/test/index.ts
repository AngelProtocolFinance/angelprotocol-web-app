import { appRoutes } from "constants/routes";
import type { RouteObject } from "react-router-dom";

export const testPages: RouteObject[] = [
  {
    path: appRoutes.us_nonprofits,
    lazy: () => import("./us-nonprofits"),
  },
  {
    path: appRoutes.us_nonprofits_b,
    lazy: () => import("./us-nonprofits-b"),
  },
];
