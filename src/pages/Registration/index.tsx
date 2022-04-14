import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { app, site } from "constants/routes";
import { StepOneCompleteGuard, StepOneInitiatedGuard } from "./guards";
import routes from "./routes";

const AdditionalInformation = lazy(() => import("./AdditionalInformation"));
const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const ContactDetails = lazy(() => import("./ContactDetails"));
const Dashboard = lazy(() => import("./Dashboard"));
const Registration = lazy(() => import("./Registration"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const WalletRegistration = lazy(() => import("./WalletRegistration"));
const Documentation = lazy(() => import("./Documentation"));

export default function Register() {
  return (
    <Container>
      <Routes>
        <Route
          path={routes.additionalInformation}
          element={
            <StepOneCompleteGuard>
              <AdditionalInformation />
            </StepOneCompleteGuard>
          }
        />
        <Route
          path={routes.confirm}
          element={
            <StepOneInitiatedGuard>
              <ConfirmEmail />
            </StepOneInitiatedGuard>
          }
        />
        <Route path={routes.contactDetails} element={<ContactDetails />} />
        <Route
          path={routes.dashboard}
          element={
            <StepOneCompleteGuard>
              <Dashboard />
            </StepOneCompleteGuard>
          }
        />
        <Route
          path={routes.documentation}
          element={
            <StepOneCompleteGuard>
              <Documentation />
            </StepOneCompleteGuard>
          }
        />
        <Route path={routes.index} element={<Registration />} />
        <Route path={routes.verify} element={<VerifiedEmail />} />
        <Route
          path={`${routes.wallet}/*`}
          element={
            <StepOneCompleteGuard>
              <WalletRegistration />
            </StepOneCompleteGuard>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={`${site.app}/${app.register}/${routes.dashboard}`} />
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
