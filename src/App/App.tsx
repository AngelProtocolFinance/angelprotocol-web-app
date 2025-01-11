import { Navigate, type RouteObject as RO } from "@remix-run/react";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { adminRoute } from "pages/Admin";
import { applicationRoute } from "pages/Application";
import { fundsRoute } from "pages/Funds";
import { route as regRoute } from "pages/Registration";
import { signUpRoute } from "pages/SignUp";

const donateThanks = import("pages/DonateThanks").then(convert);

const widgetRoutes: RO[] = [
  { path: ":id", lazy: () => import("pages/DonateWidget").then(convert) },
  { path: donateWidgetRoutes.donate_thanks, lazy: () => donateThanks },
];

//routes between header/footer
const _appRoutes: RO[] = [
  regRoute,
  fundsRoute,
  {
    path: appRoutes.applications,
    children: [
      applicationRoute,
      { index: true, lazy: () => import("pages/Applications").then(convert) },
    ],
  },
  signUpRoute,
];

const rootRoutes: RO[] = [
  {
    path: `${appRoutes.donate}/:id`,
    lazy: () => import("pages/Donate").then(convert),
  },
  {
    path: `${appRoutes.donate_fund}/:fundId`,
    lazy: () => import("pages/donate-fund").then(convert),
  },
  adminRoute,
  { lazy: () => import("./Layout").then(convert), children: _appRoutes },
  {
    path: appRoutes.donate_widget,
    lazy: () => import("pages/DonateWidget/widget-context").then(convert),
    children: widgetRoutes,
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
