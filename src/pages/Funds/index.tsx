import { Outlet, type RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";

export const fundsRoute: RouteObject = {
  path: appRoutes.funds,
  element: <Outlet />,
  children: [
    { index: true, lazy: () => import("./Funds").then(convert) },
    { path: ":fundId", lazy: () => import("./Fund").then(convert) },
    { path: ":fundId/edit", lazy: () => import("./EditFund").then(convert) },
    { path: "new", lazy: () => import("./CreateFund").then(convert) },
  ],
};
