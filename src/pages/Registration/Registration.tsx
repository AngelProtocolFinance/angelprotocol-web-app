import { lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import ProgressIndicator from "./ProgressIndicator";
import {
  AdditionalInformationGuard,
  ContactDetailsGuard,
  DashboardGuard,
  DocumentationGuard,
  WalletRegistrationGuard,
} from "./guards";
import routes from "./routes";

const AdditionalInformation = lazy(() => import("./AdditionalInformation"));
const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const ContactDetails = lazy(() => import("./ContactDetails"));
const Dashboard = lazy(() => import("./Dashboard"));
const Documentation = lazy(() => import("./Documentation"));
const LandingPage = lazy(() => import("./LandingPage"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const WalletRegistration = lazy(() => import("./WalletRegistration"));

export default function Registration() {
  const location = useLocation();
  const { application } = useRegistrationQuery();

  const shouldShowProgressBar =
    location.pathname.search(
      `${appRoutes.register}(/${routes.confirmEmail})?/?$`
    ) === -1;

  const containerClasses = `grid grid-rows-[${
    !shouldShowProgressBar ? "1fr" : "auto_1fr"
  }] gap-10 items-center sm:w-4/5 max-w-5xl text-center text-white mx-auto h-full p-5`;

  return (
    <section className={containerClasses}>
      {shouldShowProgressBar && (
        <div className="flex flex-col w-full gap-2">
          <ProgressIndicator />
          {!!application.ContactPerson.PK && (
            <div className="flex w-full justify-start">
              Ref ID: {application.ContactPerson.PK}
            </div>
          )}
        </div>
      )}

      <Routes>
        <Route
          path={routes.additionalInformation}
          element={
            <AdditionalInformationGuard>
              <AdditionalInformation />
            </AdditionalInformationGuard>
          }
        />
        <Route
          path={routes.confirmEmail}
          element={
            // Documentation and ConfirmEmail pages have the same requirements to access the page
            // which is - Contact Details step must have been submitted
            <DocumentationGuard>
              <ConfirmEmail />
            </DocumentationGuard>
          }
        />
        <Route
          path={routes.contactDetails}
          element={
            <ContactDetailsGuard>
              <ContactDetails />
            </ContactDetailsGuard>
          }
        />
        <Route
          path={routes.dashboard}
          element={
            <DashboardGuard>
              <Dashboard />
            </DashboardGuard>
          }
        />
        <Route
          path={routes.documentation}
          element={
            <DocumentationGuard>
              <Documentation />
            </DocumentationGuard>
          }
        />

        <Route path={routes.verifyEmail} element={<VerifiedEmail />} />
        <Route
          path={`${routes.wallet}/*`}
          element={
            <WalletRegistrationGuard>
              <WalletRegistration />
            </WalletRegistrationGuard>
          }
        />
        <Route index element={<LandingPage />} />
        <Route
          path="*"
          element={
            <Navigate to={`${appRoutes.register}/${routes.dashboard}`} />
          }
        />
      </Routes>
    </section>
  );
}
