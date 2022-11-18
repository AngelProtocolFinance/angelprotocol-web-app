import { useRef } from "react";
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

export default function Steps({ classes = "" }: { classes?: string }) {
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
    <div
      className={`max-w-5xl w-full px-5 sm:px-8 pt-0 grid md:grid-cols-[auto_1fr] shadow-[0px_0px_10px_4px] shadow-blue-d6 lg:shadow-none lg:border border-gray-l2 dark:border-bluegray rounded-none lg:rounded-lg justify-items-center ${classes}`}
    >
      <ProgressIndicator step={data.step} classes="mb-8" />
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
      <div className="bg-blue col-span-full w-full">reference number here</div>
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
