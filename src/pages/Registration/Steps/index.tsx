import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { InitReg } from "../types";
import { useRegQuery } from "services/aws/registration";
import { steps } from "../routes";
import Contact from "./ContactDetails";
import Dashboard from "./Dashboard";
import Documentation from "./Documentation";
import ProgressIndicator from "./ProgressIndicator";
import Reference from "./Reference";
import { StepGuardProps } from "./StepGuard";
import Wallet from "./WalletRegistration";
import { getRegistrationState } from "./getRegistrationState";

export default function Steps({ classes = "" }: { classes?: string }) {
  const { state } = useLocation();
  const initReg = state as InitReg | undefined;

  const ref = initReg?.reference || "";
  const { data, isLoading, isError } = useRegQuery(ref, {
    skip: !ref,
  });

  /** should use cache data since "resume" already lazy queried it */
  if (isLoading) {
    return <p className="place-self-center">Fetching registration data..</p>;
  }

  if (isError) {
    return (
      <p className="place-self-center">
        Failed to get registration data - please try again later
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
    <div
      className={`w-full md:w-[90%] max-w-[62.5rem] md:pt-8 grid md:grid-cols-[auto_1fr] md:border border-gray-l2 dark:border-bluegray rounded-none md:rounded-lg bg-white dark:bg-blue-d6 ${classes}`}
    >
      <ProgressIndicator
        step={regState.step}
        classes="mx-6 md:ml-8 md:min-w-[12rem] lg:min-w-[15.5rem]"
      />

      <div className="grid z-10 w-full px-6 py-8 md:p-0 md:pr-8 md:shadow-none shadow-[0px_4px_6px,_0px_-4px_6px] shadow-gray-l2/80 dark:shadow-blue-d7">
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
            path={steps.wallet}
            element={<Wallet {...guardProps} step={3} />}
          />
          <Route
            path={steps.summary}
            element={<Dashboard {...guardProps} step={4} />}
          />
        </Routes>
      </div>
      <Reference id={initReg.reference} classes="col-span-full md:mt-8" />
    </div>
  );
}
