import { appRoutes, donateWidgetRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import useScrollTop from "hooks/useScrollTop";
import { routes as blogRoutes } from "pages/Blog";
import { legalRoutes } from "pages/Legal";
import OAuthRedirector from "pages/OAuthRedirector";
import { route as regRoute } from "pages/Registration";
import { infoRoutes } from "pages/informational";
import {
  Outlet,
  type RouteObject as RO,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { usePingQuery } from "services/aws/aws";
import Layout from "./Layout";

const donateThanks = import("pages/DonateThanks");
const stripePaymentStatus = import("pages/StripePaymentStatus");
const endowProfile = import("pages/Profile");
const widget = import("pages/Widget");

const widgetRoutes: RO[] = [
  { path: donateWidgetRoutes.donate_thanks, lazy: () => donateThanks },
  {
    path: donateWidgetRoutes.stripe_payment_status,
    lazy: () => stripePaymentStatus,
  },
];

//routes between header/footer
const _appRoutes: RO[] = [
  regRoute,
  ...blogRoutes,
  ...legalRoutes,
  ...infoRoutes,
  {
    element: <Outlet context={true} />, //outlet-value: legacy
    children: [
      { path: `${appRoutes.profile}/:id/*`, lazy: () => endowProfile },
    ],
  },
  { path: `${appRoutes.admin}/:id/*`, lazy: () => import("pages/Admin") },
  {
    path: `${appRoutes.user_dashboard}/*`,
    lazy: () => import("pages/UserDashboard"),
  },
  {
    path: appRoutes.banking_applications,
    children: [
      { path: ":id", lazy: () => import("pages/BankingApplications") },
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
  { path: `${appRoutes.gift}/*`, lazy: () => import("pages/Gift") },
  { path: appRoutes.reset_password, lazy: () => import("pages/ResetPassword") },
  { path: appRoutes.auth_redirector, element: <OAuthRedirector /> },
  {
    path: appRoutes.marketplace,
    children: [
      { index: true, lazy: () => import("pages/Marketplace") },
      { path: ":id/*", lazy: () => import("pages/Profile") },
    ],
  },
  {
    path: appRoutes.widget_config,
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
  },
];

export const router = createBrowserRouter(routes);

function RootLayout() {
  /**
   * ping AWS api every 5 minutes,
   * this invokes token refresh and fires refresh events: tokenRefresh | tokenRefresh_failure.
   * if tokenRefresh_failure, `A.` user state is set to null
   * when `A.` happens and user is on a protected page (wrapped with `withAuth` HOC),
   * user will be redirected to the signin page
   */
  usePingQuery({}, { pollingInterval: 5 * 60 * 60 * 1000 });
  const location = useLocation();
  useScrollTop(location.pathname);
  return (
    <ModalContext>
      <Outlet />
    </ModalContext>
  );
}
