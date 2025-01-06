import type { RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";

export const infoRoutes: RouteObject[] = [
  {
    path: appRoutes.donor_info,
    lazy: () => import("./DonorInfo").then(convert),
  },
  {
    path: appRoutes.wp_plugin,
    lazy: () => import("./WpPlugin"),
  },
  { path: appRoutes.about, lazy: () => import("./about") },
];
