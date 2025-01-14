import type { RouteObject } from "@remix-run/react";
import { appRoutes, regRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { route as stepsRoute } from "./Steps";

export const route: RouteObject = {
  id: "reg",
  path: appRoutes.register,
  lazy: () => import("./layout").then(convert),
  children: [
    { path: regRoutes.success, lazy: () => import("./Success").then(convert) },
    {
      index: true,
      lazy: () => import("./Signup").then(convert),
    },
    {
      id: "reg$Id",
      path: ":regId",
      lazy: () => import("./Steps/layout").then(convert),
      children: [
        stepsRoute,
        {
          path: regRoutes.sign_result,
          lazy: () => import("./SigningResult").then(convert),
        },
      ],
    },
  ],
};
