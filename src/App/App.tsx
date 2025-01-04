import { Navigate, type RouteObject as RO } from "@remix-run/react";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { convert } from "helpers/route";
import { adminRoute } from "pages/Admin";
import { applicationRoute } from "pages/Application";
import { bankApplicationRoute } from "pages/BankingApplication";
import { routes as blogRoutes } from "pages/Blog";
import { legalRoutes } from "pages/Legal";
import { profileRoute } from "pages/Profile";
import { route as regRoute } from "pages/Registration";
import { signUpRoute } from "pages/SignUp";
import { userDashboardRoute } from "pages/UserDashboard";
import { infoRoutes } from "pages/informational";

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
  userDashboardRoute,
  ...blogRoutes,
  ...legalRoutes,
  ...infoRoutes,
  { path: appRoutes.profile + "/:id", ...profileRoute },
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
  { path: appRoutes.signin, lazy: () => import("pages/Signin").then(convert) },
  signUpRoute,
  {
    path: appRoutes.reset_password,
    lazy: () => import("pages/ResetPassword").then(convert),
  },
  {
    path: appRoutes.marketplace,
    lazy: () => import("pages/Marketplace").then(convert),
    children: [
      {
        path: "filter",
        lazy: () => import("pages/Marketplace/Filter").then(convert),
      },
    ],
  },
  { path: appRoutes.marketplace + "/:id", ...profileRoute },
  {
    path: appRoutes.form_builder,
    lazy: () => import("pages/Widget/form-builder").then(convert),
  },
];

const rootRoutes: RO[] = [
  { index: true, lazy: () => import("pages/Home").then(convert) },
  {
    path: `${appRoutes.donate}/:id`,
    lazy: () => import("pages/Donate").then(convert),
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
