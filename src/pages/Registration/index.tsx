import useRehydrateUserState from "hooks/useRehydrateUserState";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
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
          element={<AdditionalInformation />}
        />
        <Route path={routes.confirm} element={<ConfirmEmail />} />
        <Route path={routes.contactDetails} element={<ContactDetails />} />
        <Route path={routes.verify} element={<VerifiedEmail />} />
        <Route path={routes.dashboard} element={<Dashboard />} />
        <Route path={routes.documentation} element={<Documentation />} />
        <Route path={`${routes.wallet}/*`} element={<WalletRegistration />} />
        <Route path={routes.index} element={<Registration />} />
      </Routes>
    </Container>
  );
}

const Container = (props: any) => (
  <section className="flex items-center justify-center relative sm:w-4/5 max-w-5xl text-center text-white mx-auto h-full p-5">
    {props.children}
  </section>
);
