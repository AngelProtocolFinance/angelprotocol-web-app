import type { RouteObject } from "@remix-run/react";
import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { bankingRoute } from "./Banking";

export const charityRoutes: RouteObject[] = [
  { path: adminRoutes.funds, lazy: () => import("./Funds").then(convert) },
  bankingRoute,
];
