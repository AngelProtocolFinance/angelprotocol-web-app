import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";
import { payoutMethodRoute } from "./PayoutMethod";

export { default, loader as payoutMethodsLoader } from "./PayoutMethods";
export { default as NewPayoutMethod } from "./Banking";
export { payoutMethodRoute } from "./PayoutMethod";

export { newBanking } from "./new-banking-action";

export const bankingRoute: RouteObject = {
  path: adminRoutes.banking,
  children: [
    { index: true, lazy: () => import("./PayoutMethods").then(convert) },
    { path: "new", lazy: () => import("./Banking").then(convert) },
    payoutMethodRoute,
  ],
};
