import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";
import { payoutMethodRoute } from "./PayoutMethod";

export const bankingRoute: RouteObject = {
  path: adminRoutes.banking,
  children: [
    { index: true, lazy: () => import("./PayoutMethods").then(convert) },
    { path: "new", lazy: () => import("./Banking").then(convert) },
    payoutMethodRoute,
  ],
};
