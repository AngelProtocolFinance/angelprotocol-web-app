import type { RouteObject } from "@remix-run/react";
import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";

const promptPaths: RouteObject[] = [
  { path: "new", lazy: () => import("./video-new").then(convert) },
  { path: ":mediaId", lazy: () => import("./video-edit").then(convert) },
];

export const mediaRoutes: RouteObject[] = [
  {
    path: adminRoutes.media,
    lazy: () => import("./Media").then(convert),
    children: promptPaths,
  },
  {
    path: adminRoutes.media + "/videos",
    lazy: () => import("./Videos").then(convert),
    children: promptPaths,
  },
];
