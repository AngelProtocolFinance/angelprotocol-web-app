import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";
import { charityRoutes } from "./Charity";

export const adminRoute: RouteObject = {
  path: appRoutes.admin + "/:id",
  lazy: () => import("./layout").then(convert),
  children: charityRoutes,
};
