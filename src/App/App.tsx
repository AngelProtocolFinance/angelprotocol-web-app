import { Navigate, type RouteObject as RO } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { route as regRoute } from "pages/Registration";

//routes between header/footer
const _appRoutes: RO[] = [regRoute];

const rootRoutes: RO[] = [
  {
    path: `${appRoutes.donate_fund}/:fundId`,
    lazy: () => import("pages/donate-fund").then(convert),
  },
  { path: "*", element: <Navigate to="/" /> },
];

export const routes: RO[] = [
  {
    id: "root",
    path: "/",
    lazy: () => import("./root").then(convert),
    children: rootRoutes,
  },
];
