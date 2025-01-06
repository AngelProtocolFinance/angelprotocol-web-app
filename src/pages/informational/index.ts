import type { RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";

export const infoRoutes: RouteObject[] = [
  { path: appRoutes.about, lazy: () => import("./about") },
];
