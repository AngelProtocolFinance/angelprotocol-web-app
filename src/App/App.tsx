import { appRoutes, donateWidgetRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import { RouterErrorBoundary } from "errors/ErrorBoundary";
import useScrollTop from "hooks/useScrollTop";
import NProgress from "nprogress";
import { adminRoute } from "pages/Admin";
import { routes as blogRoutes } from "pages/Blog";
import { legalRoutes } from "pages/Legal";
import OAuthRedirector from "pages/OAuthRedirector";
import { profileRoute } from "pages/Profile";
import { route as regRoute } from "pages/Registration";
import { userDashboardRoute } from "pages/UserDashboard";
import { infoRoutes } from "pages/informational";
import { useEffect } from "react";
import {
  Navigate,
  Outlet,
  type RouteObject as RO,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./Layout";

const donateThanks = import("pages/DonateThanks");
const stripePaymentStatus = import("pages/StripePaymentStatus");
const widget = import("pages/Widget");

const widgetRoutes: RO[] = [
  { path: ":id", lazy: () => import("pages/DonateWidget") },
  { path: donateWidgetRoutes.donate_thanks, lazy: () => donateThanks },
  {
    path: donateWidgetRoutes.stripe_payment_status,
    lazy: () => stripePaymentStatus,
  },
];

//routes between header/footer
const _appRoutes: RO[] = [
  adminRoute,
  regRoute,
  userDashboardRoute,
  ...blogRoutes,
  ...legalRoutes,
  ...infoRoutes,
  {
    element: <Outlet context={true} />, //outlet-value: legacy
    children: [{ path: appRoutes.profile + "/:id", ...profileRoute }],
  },

  {
    path: appRoutes.banking_applications,
    children: [
      { path: ":id", lazy: () => import("pages/BankingApplication") },
      { index: true, lazy: () => import("pages/BankingApplications") },
    ],
  },
  {
    path: appRoutes.applications,
    children: [
      { path: ":id", lazy: () => import("pages/Application") },
      { index: true, lazy: () => import("pages/Applications") },
    ],
  },
  { path: appRoutes.donate_thanks, lazy: () => donateThanks },
  { path: appRoutes.stripe_payment_status, lazy: () => stripePaymentStatus },
  { path: appRoutes.signin, lazy: () => import("pages/Signin") },
  { path: appRoutes.signup, lazy: () => import("pages/SignUp") },
  { path: appRoutes.reset_password, lazy: () => import("pages/ResetPassword") },
  { path: appRoutes.auth_redirector, element: <OAuthRedirector /> },
  {
    path: appRoutes.marketplace,
    children: [
      { index: true, lazy: () => import("pages/Marketplace") },
      { path: ":id", ...profileRoute },
    ],
  },
  {
    path: appRoutes.form_builder,
    // Widget.tsx is also used as one of the Admin pages and so
    // where its styles depend on the width of the parent component;
    // We copy/paste src/pages/Admin/Layout.tsx container setup & styles
    // here so that Widget.tsx styles are applied correctly on both pages.
    element: (
      <div className="px-6 py-8 md:p-10 @container">
        <Outlet />
      </div>
    ),
    children: [{ index: true, lazy: () => widget }],
  },
  { index: true, lazy: () => import("pages/Home") },
];

const rootRoutes: RO[] = [
  { path: `${appRoutes.donate}/:id`, lazy: () => import("pages/Donate") },
  //outlet-value: isInWidget/widgetVersion
  { element: <Layout />, children: _appRoutes },
  {
    path: appRoutes.donate_widget,
    element: <Outlet context={true} />, //outlet-value: isInWidget/widgetVersion
    children: widgetRoutes,
  },
];

export const routes: RO[] = [
  {
    element: <RootLayout />,
    children: rootRoutes,
    ErrorBoundary: RouterErrorBoundary,
  },
  { path: "*", element: <Navigate to="/" /> },
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

  const location = useLocation();
  useScrollTop(location.pathname);
  return (
    <ModalContext>
      <Outlet />
      <Toaster richColors position="top-right" closeButton />
    </ModalContext>
  );
}
