import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "constants/routes";
import {
  StepOneCompleteGuard,
  StepOneInitiatedGuard,
  StepTwoCompleteGuard,
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
  return (
    <Container>
      <Routes>
        <Route
          path={routes.additionalInformation}
          element={
            <StepTwoCompleteGuard>
              <AdditionalInformation />
            </StepTwoCompleteGuard>
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

        <Route path={routes.verify} element={<VerifiedEmail />} />
        <Route
          path={`${routes.wallet}/*`}
          element={
            <StepOneCompleteGuard>
              <WalletRegistration />
            </StepOneCompleteGuard>
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
