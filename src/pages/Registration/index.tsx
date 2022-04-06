import { app, site } from "constants/routes";
import useRehydrateUserState from "hooks/useRehydrateUserState";
import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useGetter } from "store/accessors";
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
  useRehydrateUserState();

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
        <Route
          path={routes.verify}
          element={
            <StepOneInitiatedGuard>
              <VerifiedEmail />
            </StepOneInitiatedGuard>
          }
        />
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

/**
 * Checks if the user's email is verified and only if it is allows them to access the component passed
 * in "props.children", otherwise navigates to /app/register page.
 */
function StepOneCompleteGuard(props: any) {
  const user = useGetter((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.EmailVerified) {
      navigate(`${site.app}/${app.register}`);
    }
  }, [navigate, user]);

  return <>{props.children}</>;
}

/**
 * Checks if the user has submitted their contact details and only if they have does this guard allow them
 * to access the component passed in "props.children", otherwise navigates to /app/register page.
 */
function StepOneInitiatedGuard(props: any) {
  const user = useGetter((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.EmailVerified || (!user.PK && !user.Website)) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    }
  }, [navigate, user]);

  return <>{props.children}</>;
}
