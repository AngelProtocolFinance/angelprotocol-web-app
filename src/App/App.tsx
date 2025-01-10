import { Navigate, type RouteObject as RO } from "@remix-run/react";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { adminRoute } from "pages/Admin";
import { applicationRoute } from "pages/Application";
import { bankApplicationRoute } from "pages/BankingApplication";
import { fundsRoute } from "pages/Funds";
import { legalRoutes } from "pages/Legal";
import { route as regRoute } from "pages/Registration";
import { signUpRoute } from "pages/SignUp";
import { userDashboardRoute } from "pages/UserDashboard";

const donateThanks = import("pages/DonateThanks").then(convert);
const stripePaymentStatus = import("pages/StripePaymentStatus").then(convert);

const widgetRoutes: RO[] = [
  { path: ":id", lazy: () => import("pages/DonateWidget").then(convert) },
  { path: donateWidgetRoutes.donate_thanks, lazy: () => donateThanks },
  {
    path: donateWidgetRoutes.stripe_payment_status,
    lazy: () => stripePaymentStatus,
  },
];

//routes between header/footer
const _appRoutes: RO[] = [
  regRoute,
  fundsRoute,
  userDashboardRoute,
  ...legalRoutes,
  {
    path: appRoutes.banking_applications,
    children: [
      bankApplicationRoute,
      {
        index: true,
        lazy: () => import("pages/BankingApplications").then(convert),
      },
    ],
  },
  {
    path: appRoutes.applications,
    children: [
      applicationRoute,
      { index: true, lazy: () => import("pages/Applications").then(convert) },
    ],
  },
  { path: appRoutes.donate_thanks, lazy: () => donateThanks },
  { path: appRoutes.stripe_payment_status, lazy: () => stripePaymentStatus },
  signUpRoute,
  {
    path: appRoutes.form_builder,
    lazy: () => import("pages/Widget/form-builder").then(convert),
  },
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
