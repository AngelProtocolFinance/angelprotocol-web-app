import type { RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { charityRoutes } from "./Charity";

export const adminRoute: RouteObject = {
  path: appRoutes.admin + "/:id",
  lazy: () => import("./layout").then(convert),
  children: charityRoutes,
};
