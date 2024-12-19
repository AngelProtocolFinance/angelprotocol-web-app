import { appRoutes } from "constants/routes";
import type { RouteObject } from "react-router-dom";

export const infoRoutes: RouteObject[] = [
  {
    path: appRoutes.nonprofit_info,
    lazy: () => import("./NonprofitInfo"),
  },
  {
    path: appRoutes.donor_info,
    lazy: () => import("./DonorInfo"),
  },
  {
    path: appRoutes.wp_plugin,
    lazy: () => import("./WpPlugin"),
  },
  { path: appRoutes.about, lazy: () => import("./about") },
  { path: appRoutes.us_nonprofits, lazy: () => import("./us-nonprofits") },
];
