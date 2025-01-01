import { adminRoutes } from "constants/routes";
import { convert } from "helpers/route";
import type { RouteObject } from "react-router";

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
