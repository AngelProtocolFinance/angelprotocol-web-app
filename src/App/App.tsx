import * as Sentry from "@sentry/react";
import { appRoutes, donateWidgetRoutes, wpRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import useScrollTop from "hooks/useScrollTop";
import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";

const Admin = lazy(() => import("pages/Admin"));
const Profile = lazy(() => import("pages/Profile"));
const Donations = lazy(() => import("pages/Donations"));
const Leaderboard = lazy(() => import("pages/Leaderboard"));
const Marketplace = lazy(() => import("pages/Marketplace"));
const Registration = lazy(() => import("pages/Registration"));
const Donate = lazy(() => import("pages/Donate"));
const DonateFiatThanks = lazy(() => import("pages/DonateFiatThanks"));
const Gift = lazy(() => import("pages/Gift"));
const DonateWidget = lazy(() => import("pages/DonateWidget"));
const Signin = lazy(() => import("pages/Signin"));
const SignUp = lazy(() => import("pages/SignUp"));
const ResetPassword = lazy(() => import("pages/ResetPassword"));
const Applications = lazy(() => import("pages/Applications"));
const Application = lazy(() => import("pages/Application"));
const BankingApplications = lazy(() => import("pages/BankingApplications"));
const BankingApplication = lazy(() => import("pages/BankingApplication"));
const OAuthRedirector = lazy(() => import("pages/OAuthRedirector"));
const StripePaymentStatus = lazy(() => import("pages/StripePaymentStatus"));
const Widget = lazy(() => import("pages/Widget"));
const WordpressPosts = lazy(() => import("pages/Wordpress/Posts/Posts"));
const WordpressPost = lazy(() => import("pages/Wordpress/Posts/Post"));
// const WordPressPages = lazy(() => import("pages/Wordpress/Pages/Pages"));
const WordPressPage = lazy(() => import("pages/Wordpress/Pages/Page"));

export default function App() {
  const location = useLocation();
  useScrollTop(location.pathname);

  const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

  return (
    <ModalContext>
      <SentryRoutes>
        <Route path={appRoutes.donate_widget}>
          <Route path=":id" element={<DonateWidget />} />
          <Route
            path={donateWidgetRoutes.donate_fiat_thanks}
            element={<DonateFiatThanks widgetVersion />}
          />
          <Route
            path={donateWidgetRoutes.stripe_payment_status}
            element={<StripePaymentStatus />}
          />
        </Route>
        <Route
          path={`${appRoutes.donate_widget}/:id`}
          element={<DonateWidget />}
        />
        <Route element={<Layout />}>
          <Route
            path={`${appRoutes.profile}/:id/*`}
            element={<Profile legacy />}
          />
          <Route path={`${appRoutes.admin}/:id/*`} element={<Admin />} />
          <Route
            path={appRoutes.banking_applications}
            element={<BankingApplications />}
          />
          <Route
            path={appRoutes.banking_applications + "/:id"}
            element={<BankingApplication />}
          />
          <Route path={appRoutes.applications} element={<Applications />} />
          <Route
            path={appRoutes.applications + "/:id"}
            element={<Application />}
          />

          <Route path={appRoutes.donations} element={<Donations />} />
          <Route path={`${appRoutes.donate}/:id`} element={<Donate />} />
          <Route
            path={appRoutes.donate_fiat_thanks}
            element={<DonateFiatThanks />}
          />
          <Route
            path={appRoutes.stripe_payment_status}
            element={<StripePaymentStatus />}
          />
          <Route path={appRoutes.leaderboard} element={<Leaderboard />} />
          <Route path={`${appRoutes.register}/*`} element={<Registration />} />
          <Route path={`${appRoutes.gift}/*`} element={<Gift />} />
          <Route path={appRoutes.signin} element={<Signin />} />
          <Route path={appRoutes.signup} element={<SignUp />} />
          <Route path={appRoutes.reset_password} element={<ResetPassword />} />
          <Route
            path={appRoutes.auth_redirector}
            element={<OAuthRedirector />}
          />
          <Route path={appRoutes.marketplace}>
            <Route path=":id/*" element={<Profile />} />
            <Route index element={<Marketplace />} />
          </Route>
          <Route
            path={appRoutes.widget_config}
            element={
              // Widget.tsx is also used as one of the Admin pages and so
              // where its styles depend on the width of the parent component;
              // We copy/paste src/pages/Admin/Layout.tsx container setup & styles
              // here so that Widget.tsx styles are applied correctly on both pages.
              <div className="px-6 py-8 md:p-10 @container">
                <Widget />
              </div>
            }
          />
          <Route path={appRoutes.blog}>
            <Route path=":slug" element={<WordpressPost />} />
            <Route index element={<WordpressPosts />} />
          </Route>
          <Route path={`${wpRoutes.pages}:slug`} element={<WordPressPage />} />
        </Route>
        <Route
          path="*"
          element={<Navigate replace to={appRoutes.marketplace} />}
        />
      </SentryRoutes>
    </ModalContext>
  );
}
