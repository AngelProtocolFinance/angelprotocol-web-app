import { convert } from "helpers/route";
import type { RouteObject } from "react-router";

export const bankApplicationRoute: RouteObject = {
  path: ":id",
  lazy: () => import("./BankingApplication").then(convert),
  children: [
    {
      path: "approve",
      lazy: () => import("./verdict-approve").then(convert),
    },
    {
      path: "reject",
      lazy: () => import("./verdict-reject").then(convert),
    },
    {
      path: "success",
      lazy: () => import("./success-prompt").then(convert),
    },
  ],
};
