import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";

export const infoRoutes: RouteObject[] = [
  {
    path: appRoutes.nonprofit_info,
    lazy: () => import("./NonprofitInfo").then(convert),
  },
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
