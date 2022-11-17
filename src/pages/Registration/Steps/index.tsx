import { useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { InitReg } from "services/aws/registration/types";
import { useRegQuery } from "services/aws/registration";
import { StepGuardProps } from "services/aws/registration/StepGuard";
import { steps } from "../routes";
import Profile from "./AdditionalInformation";
import Contact from "./ContactDetails";
import Dashboard from "./Dashboard";
import Documentation from "./Documentation";
import ProgressIndicator from "./ProgressIndicator";
import Wallet from "./WalletRegistration";

export default function Steps() {
  const { state } = useLocation();
  const initReg = state as InitReg | undefined;

  const ref = initReg?.reference || "";
  const { data, isLoading, isFetching, isError, requestId } = useRegQuery(ref, {
    skip: !ref,
  });
  const idRef = useRef(requestId);

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

  const guardProps: Omit<StepGuardProps, "step"> = {
    init: initReg,
    state: data,
    stateId: debouceId(requestId, isFetching, idRef),
  };

  return (
    <div className="padded-container grid justify-items-center py-8">
      <ProgressIndicator step={data.step} />
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
function debouceId(
  id: string | undefined,
  isFetching: boolean,
  ref: React.MutableRefObject<string | undefined>
): string {
  if (isFetching) {
    return ref.current || "";
  } else {
    ref.current = id;
    return id || "";
  }
}
