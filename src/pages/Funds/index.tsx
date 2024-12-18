import { appRoutes } from "constants/routes";
import { Outlet, type RouteObject } from "react-router-dom";

export const fundsRoute: RouteObject = {
  path: appRoutes.funds,
  element: <Outlet />,
  children: [
    { index: true, lazy: () => import("./Funds") },
    { path: ":fundId", lazy: () => import("./Fund") },
    { path: ":fundId/edit", lazy: () => import("./EditFund") },
    { path: "new", lazy: () => import("./CreateFund") },
  ],
};
