import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { InitReg } from "services/types";
import { useRegQuery } from "services/aws/registration";
import { steps } from "../routes";
import Profile from "./AdditionalInformation";
import Contact from "./ContactDetails";
import Dashboard from "./Dashboard";
import Documentation from "./Documentation";
import ProgressIndicator from "./ProgressIndicator";
import { StepGuardProps } from "./StepGuard";
import Wallet from "./WalletRegistration";
import { getRegistrationState } from "./getRegistrationState";

export default function Steps() {
  const { state } = useLocation();
  const initReg = state as InitReg | undefined;

  const ref = initReg?.reference || "";
  const { data, isLoading, isError } = useRegQuery(ref, {
    skip: !ref,
  });

  /** should use cache data since "resume" already lazy queried it */
  if (isLoading) {
    return <p className="place-self-center">fetching registration data</p>;
  }

  if (isError) {
    return (
      <p className="place-self-center">
        failed to get registration data - please try again later
      </p>
    );
  }

  /**
   * visiting /steps without setting state (e.g via url bar) would just
   * redirect to signup page
   */
  if (!data || !initReg) {
    return <Navigate to=".." />;
  }

  const regState = getRegistrationState(data);
  const guardProps: Omit<StepGuardProps, "step"> = {
    init: initReg,
    state: regState,
    stateId: data.reqId,
  };

  return (
    <div className="padded-container grid justify-items-center py-8">
      <ProgressIndicator step={regState.step} classes="mb-8" />
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
    </div>
  );
}

/** hold prev id, while still isFetching
 * could just bundle isFetching & isLoading to sync fresh id with
 * loaded data - but this would disrupt UI with "loading" on every save
 */
