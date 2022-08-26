import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import RegLoader from "./common/RegLoader";
import {
  AdditionalInformationCompleteGuard,
  ContactDetailsCompleteGuard,
  DashboardGuard,
  DocumentationCompleteGuard,
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
  const { isLoading } = useRegistrationQuery("");

  if (isLoading) {
    return <RegLoader />;
  }

  return (
    <Container>
      <Routes>
        <Route
          path={routes.additionalInformation}
          element={
            <DocumentationCompleteGuard>
              <AdditionalInformation />
            </DocumentationCompleteGuard>
          }
        />
        <Route
          path={routes.confirmEmail}
          element={
            <ContactDetailsCompleteGuard>
              <ConfirmEmail />
            </ContactDetailsCompleteGuard>
          }
        />
        <Route path={routes.contactDetails} element={<ContactDetails />} />
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
            <ContactDetailsCompleteGuard>
              <Documentation />
            </ContactDetailsCompleteGuard>
          }
        />

        <Route path={routes.verifyEmail} element={<VerifiedEmail />} />
        <Route
          path={`${routes.wallet}/*`}
          element={
            <AdditionalInformationCompleteGuard>
              <WalletRegistration />
            </AdditionalInformationCompleteGuard>
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
    </Container>
  );
}

const Container = (props: any) => (
  <section className="flex items-center justify-center relative sm:w-4/5 max-w-5xl text-center text-white mx-auto h-full p-5">
    {props.children}
  </section>
);
