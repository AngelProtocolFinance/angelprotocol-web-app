import type { RouteObject } from "@remix-run/react";
import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";

export const membersRoute: RouteObject = {
  id: "endow-admins",
  path: adminRoutes.members,
  lazy: () => import("./Members").then(convert),
  children: [{ path: "add", lazy: () => import("./AddForm").then(convert) }],
};
