import type { RouteObject } from "@remix-run/react";
import { convert } from "helpers/route";

export const payoutMethodRoute: RouteObject = {
  path: ":bankId",
  lazy: () => import("./PayoutMethod").then(convert),
  children: [
    { path: "delete", lazy: () => import("./DeletePrompt").then(convert) },
  ],
};
