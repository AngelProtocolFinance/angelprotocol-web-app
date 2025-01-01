import { convert } from "helpers/route";
import type { RouteObject } from "react-router";

export const payoutMethodRoute: RouteObject = {
  path: ":bankId",
  lazy: () => import("./PayoutMethod").then(convert),
  children: [
    { path: "delete", lazy: () => import("./DeletePrompt").then(convert) },
  ],
};
