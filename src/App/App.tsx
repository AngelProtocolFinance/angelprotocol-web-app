import { cognito } from "auth/cognito";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import { RouterErrorBoundary } from "errors/ErrorBoundary";
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
  ScrollRestoration,
  redirect,
  useNavigation,
} from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./Layout";
import { rootLoader } from "./root-loader";

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
  regRoute,
  userDashboardRoute,
  ...blogRoutes,
  ...legalRoutes,
  ...infoRoutes,
  { path: appRoutes.profile + "/:id", ...profileRoute },
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
    lazy: () => import("pages/Marketplace"),
    children: [
      { path: "filter", lazy: () => import("pages/Marketplace/Filter") },
    ],
  },
  { path: appRoutes.marketplace + "/:id", ...profileRoute },
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
];

const rootRoutes: RO[] = [
  { path: appRoutes.home, lazy: () => import("pages/Home") },
  { path: `${appRoutes.donate}/:id`, lazy: () => import("pages/Donate") },
  adminRoute,
  //outlet-value: isInWidget/widgetVersion
  { element: <Layout />, children: _appRoutes },
  {
    path: appRoutes.donate_widget,
    element: <Outlet context={true} />, //outlet-value: isInWidget/widgetVersion
    children: widgetRoutes,
  },
  {
    path: "logout",
    action: async ({ request }) => {
      const form = await request.formData();
      const token = form.get("token");
      if (!token) return { status: 400, body: "missing token" };
      await cognito.signOut(token.toString());
      return redirect(appRoutes.marketplace);
    },
  },
];

export const routes: RO[] = [
  {
    id: "root",
    element: <RootLayout />,
    loader: rootLoader,
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

  useEffect(() => {
    console.log("reloaded");
    return () => {
      caches.open("bg").then((c) => {
        c.keys().then((ks) => {
          for (const k of ks) {
            c.delete(k);
          }
        });
      });
    };
  }, []);

  return (
    <ModalContext>
      <ScrollRestoration />
      <Outlet />
      <Toaster richColors position="top-right" closeButton />
    </ModalContext>
  );
}
