import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { InitReg } from "services/aws/registration/types";
import { useRegQuery } from "services/aws/registration";
import { StepGuardProps } from "services/aws/registration/StepGuard";
import routes, { steps } from "../routes";
import Contact from "./ContactDetails";
import Documentation from "./Docs";
import Profile from "./Profile";
import Dashboard from "./Summary";
import Wallet from "./Wallet";

export default function Steps() {
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  const ref = initReg?.reference || "";
  const { data, isLoading, isError, requestId } = useRegQuery(ref, {
    skip: !ref,
  });

  /** should use cache data since "resume" already lazy queried it */
  if (isLoading) {
    return <p>fetching registration data</p>;
  }

  if (isError) {
    return <p>failed to get registration data - please try again later</p>;
  }

  /**
   * visiting /steps without setting state (e.g via url bar) would just
   * redirects to signup page
   */
  if (!data || !initReg) {
    return <Navigate to=".." />;
  }

  const stateId = requestId || "";
  const guardProps: Omit<StepGuardProps, "step"> = {
    init: initReg,
    state: data,
    stateId,
  };

  return (
    <Routes>
      <Route
        path={steps.contact}
        element={<Contact {...guardProps} step={1} />}
      />
      <Route
        path={steps.doc}
        element={<Documentation {...guardProps} step={2} />}
      />
      <Route
        path={steps.profile}
        element={<Profile {...guardProps} step={3} />}
      />
      <Route
        path={steps.wallet}
        element={<Wallet {...guardProps} step={4} />}
      />
      <Route
        path={steps.summary}
        element={<Dashboard {...guardProps} step={5} />}
      />
    </Routes>
  );
}
