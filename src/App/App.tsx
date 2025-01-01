import Loader from "components/Loader";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import { ErrorElement } from "errors/ErrorElement";
import { convert } from "helpers/route";
import NProgress from "nprogress";
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
