import { appRoutes, donateWidgetRoutes, regRoutes } from "constants/routes";
import ModalContext from "contexts/ModalContext";
import useScrollTop from "hooks/useScrollTop";
import OAuthRedirector from "pages/OAuthRedirector";
import SignResult from "pages/Registration/SigningResult";
import Signup from "pages/Registration/Signup";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import { usePingQuery } from "services/aws/aws";
import Layout from "./Layout";

export const routes = createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route
      path={`${appRoutes.donate}/:id`}
      lazy={() => import("pages/Donate")}
    />
    <Route path={appRoutes.donate_widget} element={<Outlet context={true} />}>
      <Route path=":id" lazy={() => import("pages/DonateWidget")} />
      <Route
        path={donateWidgetRoutes.donate_thanks}
        lazy={() => import("pages/DonateThanks")}
      />
      <Route
        path={donateWidgetRoutes.stripe_payment_status}
        lazy={() => import("pages/StripePaymentStatus")}
      />
    </Route>
    <Route element={<Layout />}>
      <Route element={<Outlet context={true} />}>
        <Route
          path={`${appRoutes.profile}/:id/*`}
          lazy={() => import("pages/Profile")}
        />
      </Route>
      <Route
        path={`${appRoutes.admin}/:id/*`}
        lazy={() => import("pages/Admin")}
      />
      <Route
        path={`${appRoutes.user_dashboard}/*`}
        lazy={() => import("pages/UserDashboard")}
      />
      <Route path={appRoutes.banking_applications}>
        <Route path=":id" lazy={() => import("pages/BankingApplications")} />
        <Route index lazy={() => import("pages/BankingApplications")} />
      </Route>

      <Route path={appRoutes.applications}>
        <Route path=":id" lazy={() => import("pages/Application")} />
        <Route index lazy={() => import("pages/Applications")} />
      </Route>

      <Route
        path={appRoutes.donate_thanks}
        lazy={() => import("pages/DonateThanks")}
      />
      <Route
        path={appRoutes.stripe_payment_status}
        lazy={() => import("pages/StripePaymentStatus")}
      />

      <Route
        path={appRoutes.register}
        lazy={() => import("pages/Registration")}
      >
        <Route
          path={regRoutes.welcome}
          lazy={() => import("pages/Registration/Welcome")}
        />
        <Route
          path={regRoutes.steps + "/*"}
          lazy={() => import("pages/Registration/Steps")}
        />
        <Route
          path={regRoutes.resume}
          lazy={() => import("pages/Registration/Resume")}
        />
        <Route
          path={regRoutes.success}
          lazy={() => import("pages/Registration/Success")}
        />
        <Route path={regRoutes.sign_result} element={<SignResult />} />
        <Route index element={<Signup />} />
      </Route>

      <Route path={`${appRoutes.gift}/*`} lazy={() => import("pages/Gift")} />
      <Route path={appRoutes.signin} lazy={() => import("pages/Signin")} />
      <Route path={appRoutes.signup} lazy={() => import("pages/SignUp")} />
      <Route
        path={appRoutes.reset_password}
        lazy={() => import("pages/ResetPassword")}
      />
      <Route path={appRoutes.auth_redirector} element={<OAuthRedirector />} />
      <Route path={appRoutes.marketplace}>
        <Route path=":id/*" lazy={() => import("pages/Profile")} />
        <Route index lazy={() => import("pages/Marketplace")} />
      </Route>

      <Route
        // Widget.tsx is also used as one of the Admin pages and so
        // where its styles depend on the width of the parent component;
        // We copy/paste src/pages/Admin/Layout.tsx container setup & styles
        // here so that Widget.tsx styles are applied correctly on both pages.
        element={
          <div className="px-6 py-8 md:p-10 @container">
            <Outlet />
          </div>
        }
      >
        <Route
          path={appRoutes.widget_config}
          lazy={() => import("pages/Widget")}
        />
      </Route>
      <Route path={appRoutes.blog}>
        <Route path=":slug" lazy={() => import("pages/Blog/Post")} />
        <Route index lazy={() => import("pages/Blog/Posts")} />
      </Route>
      <Route
        path={appRoutes.privacy_policy}
        lazy={() => import("pages/Legal/PrivacyPolicy")}
      />
      <Route
        path={appRoutes.terms_nonprofits}
        lazy={() => import("pages/Legal/TermsNonprofits")}
      />
      <Route
        path={appRoutes.terms_donors}
        lazy={() => import("pages/Legal/TermsDonors")}
      />
      <Route
        path={appRoutes.nonprofit_info}
        lazy={() => import("pages/informational/NonprofitInfo")}
      />
      <Route
        path={appRoutes.donor_info}
        lazy={() => import("pages/informational/DonorInfo")}
      />
      <Route
        path={appRoutes.wp_plugin}
        lazy={() => import("pages/informational/WpPlugin")}
      />
      <Route index lazy={() => import("pages/Home")} />
    </Route>
    <Route path="*" lazy={() => import("pages/Home")} />
  </Route>
);

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
