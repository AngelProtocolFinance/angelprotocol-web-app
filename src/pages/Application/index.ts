import { convert } from "helpers/route";
import type { RouteObject } from "react-router";

export const applicationRoute: RouteObject = {
  path: ":id",
  lazy: () => import("./Application").then(convert),
  children: [
    { path: ":verdict", lazy: () => import("./review-route").then(convert) },
    { path: "success", lazy: () => import("./success-prompt").then(convert) },
  ],
};
