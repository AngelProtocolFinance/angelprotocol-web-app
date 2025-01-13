import type { RouteObject } from "@remix-run/react";
import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { bankingRoute } from "./Banking";
import { mediaRoutes } from "./Media";

export const charityRoutes: RouteObject[] = [
  { path: adminRoutes.funds, lazy: () => import("./Funds").then(convert) },
  {
    path: adminRoutes.programs,
    lazy: () => import("./Programs").then(convert),
  },
  {
    path: adminRoutes.program_editor + "/:programId",
    lazy: () => import("./ProgramEditor").then(convert),
  },
  {
    path: adminRoutes.settings,
    lazy: () => import("./Settings").then(convert),
  },
  bankingRoute,
  {
    path: adminRoutes.form_builder,
    lazy: () => import("../../Widget").then(convert),
  },

  ...mediaRoutes,
];
