import Loader from "components/Loader";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import { ErrorElement } from "errors/ErrorElement";
import { convert } from "helpers/route";
import NProgress from "nprogress";
import { adminRoute } from "pages/Admin";
import { promptRoutes, reviewRoute } from "pages/Application/review-route";
import { bankApplicationRoute } from "pages/BankingApplication";
import { routes as blogRoutes } from "pages/Blog";
import { legalRoutes } from "pages/Legal";
import { profileRoute } from "pages/Profile";
import { route as regRoute } from "pages/Registration";
import { signUpRoute } from "pages/SignUp";
import { userDashboardRoute } from "pages/UserDashboard";
import { Component as Widget, loader as widgetLoader } from "pages/Widget";
import { infoRoutes } from "pages/informational";
import { useEffect } from "react";
import {
  Navigate,
  Outlet,
  type RouteObject as RO,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import { Toaster } from "sonner";
import Layout from "./Layout";
import { rootAction } from "./root-action";
import { rootLoader } from "./root-loader";

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
      { index: true, lazy: () => import("pages/BankingApplications") },
    ],
  },
  {
    path: appRoutes.applications,
    children: [
      {
        path: ":id",
        lazy: () => import("pages/Application"),
        errorElement: <ErrorElement />,
        children: [reviewRoute, ...promptRoutes],
      },
      { index: true, lazy: () => import("pages/Applications") },
    ],
  },
  { path: appRoutes.donate_thanks, lazy: () => donateThanks },
  { path: appRoutes.stripe_payment_status, lazy: () => stripePaymentStatus },
  { path: appRoutes.signin, lazy: () => import("pages/Signin") },
  signUpRoute,
  { path: appRoutes.reset_password, lazy: () => import("pages/ResetPassword") },
  {
    path: appRoutes.marketplace,
    lazy: () => import("pages/Marketplace"),
    children: [
      { path: "filter", lazy: () => import("pages/Marketplace/Filter") },
    ],
  },
  { path: appRoutes.marketplace + "/:id", ...profileRoute },
  {
    path: appRoutes.form_builder,
    loader: widgetLoader,
    // Widget.tsx is also used as one of the Admin pages and so
    // where its styles depend on the width of the parent component;
    // We copy/paste src/pages/Admin/Layout.tsx container setup & styles
    // here so that Widget.tsx styles are applied correctly on both pages.
    element: (
      <div className="px-6 py-8 md:p-10 @container">
        <Widget />
      </div>
    ),
  },
];

const rootRoutes: RO[] = [
  { index: true, lazy: () => import("pages/Home") },
  {
    path: `${appRoutes.donate}/:id`,
    lazy: () => import("pages/Donate"),
  },
  adminRoute,
  //outlet-value: isInWidget/widgetVersion
  { element: <Layout />, children: _appRoutes },
  {
    path: appRoutes.donate_widget,
    element: <Outlet context={true} />, //outlet-value: isInWidget/widgetVersion
    children: widgetRoutes,
  },
  { path: "*", element: <Navigate to="/" /> },
];

const LoaderComponent = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);
export const routes: RO[] = [
  {
    id: "root",
    path: "/",
    hydrateFallbackElement: <LoaderComponent />,
    element: <RootLayout />,
    loader: rootLoader,
    action: rootAction,
    children: rootRoutes,
    ErrorBoundary: ErrorElement,
  },
];

NProgress.configure({
  showSpinner: false,
});

function RootLayout() {
  const transition = useNavigation();
  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [transition.state]);

  return (
    <ModalContext>
      <ScrollRestoration />
      <Outlet />
      <Toaster richColors position="top-right" closeButton />
    </ModalContext>
  );
}
