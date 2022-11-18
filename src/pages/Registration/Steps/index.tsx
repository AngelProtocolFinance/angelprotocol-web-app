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
      className={`w-full md:w-[90%] max-w-5xl md:pt-8 grid md:grid-cols-[auto_1fr] justify-items-center md:border border-gray-l2 dark:border-bluegray rounded-none md:rounded-lg bg-white dark:bg-blue-d6 ${classes}`}
    >
      <ProgressIndicator step={data.step} classes="justify-self-start ml-8" />

      <div className="z-10 w-full px-6 py-8 md:p-0 md:pr-8 md:shadow-none shadow-[0px_4px_6px,_0px_-4px_6px] shadow-gray-l2/80 dark:shadow-blue-d7/80">
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

      <div className="col-span-full w-full py-3 px-6 md:mt-8 text-sm text-left md:text-center bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white md:text-gray-d1 md:dark:text-gray md:border-t border-gray-l2 dark:border-bluegray rounded-b-lg">
        <span className="font-semibold">Your registration number:</span>
        <span className="block mt-1 md:inline md:mt-0">
          {initReg.reference}
        </span>
      </div>
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
