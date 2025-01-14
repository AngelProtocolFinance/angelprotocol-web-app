import { Outlet, type RouteObject } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";

export const fundsRoute: RouteObject = {
  path: appRoutes.funds,
  element: <Outlet />,
  children: [
    { path: ":fundId/edit", lazy: () => import("./EditFund").then(convert) },
    { path: "new", lazy: () => import("./CreateFund").then(convert) },
  ],
};
