import type { RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";

export const signUpRoute: RouteObject = {
  path: appRoutes.signup,
  lazy: () => import("./layout").then(convert),
  children: [
    { index: true, lazy: () => import("./SignupForm").then(convert) },
    {
      path: "confirm",
      lazy: () => import("./confirm-form").then(convert),
    },
    { path: "success", lazy: () => import("./Success").then(convert) },
  ],
};
