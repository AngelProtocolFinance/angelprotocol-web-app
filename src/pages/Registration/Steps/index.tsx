import ExtLink from "components/ExtLink";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { appRoutes } from "constants/routes";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useRegQuery } from "services/aws/registration";
import { steps } from "../routes";
import type { InitReg, RegStep4, RegistrationState } from "../types";
import Banking from "./Banking";
import Contact from "./ContactDetails";
import Dashboard from "./Dashboard";
import Documentation from "./Documentation";
import FSAInquiry from "./FSAInquiry/";
import OrgDetails from "./OrgDetails";
import ProgressIndicator from "./ProgressIndicator";
import Reference from "./Reference";
import type { StepGuardProps } from "./StepGuard";
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
    return (
      <LoadingStatus classes="place-self-center">
        Fetching registration data...
      </LoadingStatus>
    );
  }

  if (isError) {
    return (
      <ErrorStatus classes="place-self-center">
        Failed to get registration data. Please try again later.
      </ErrorStatus>
    );
  }

  /**
   * visiting /steps without setting state (e.g via url bar) would just
   * redirect to signup page
   */
  if (!data || !initReg) {
    return <Navigate to=".." />;
  }

  const { state: regState } = getRegistrationState(data);
  const guardProps: Omit<StepGuardProps, "step"> = {
    init: initReg,
    state: regState,
  };

  const claim = getClaim(regState);

  return (
    <div
      className={`w-full md:w-[90%] max-w-[62.5rem] [&]:has-[[data-claim='true']]:pt-0 pt-8 grid md:grid-cols-[auto_1fr] md:border border-gray-l4 rounded-none md:rounded-lg bg-white dark:bg-blue-d6 ${classes}`}
    >
      {claim && (
        <div
          data-claim
          className="bg-blue-l4 col-span-full md:mb-8 rounded-t p-2 text-navy-l1 text-sm"
        >
          Claiming{" "}
          <ExtLink
            className="font-bold text-navy-d4 hover:underline"
            href={`${appRoutes.marketplace}/${claim.id}`}
          >
            {claim.name}
          </ExtLink>
          , EIN: <span className="font-bold text-navy-d4">{claim.ein}</span>
        </div>
      )}
      <ProgressIndicator
        step={regState.step}
        classes="md:min-w-[12rem] lg:min-w-[15.5rem]"
      />

      <div className="grid z-10 w-full px-6 py-8 md:p-0 md:pr-8 md:shadow-none shadow-[0px_4px_6px,_0px_-4px_6px] shadow-gray-l3/80 dark:shadow-blue-d7">
        <Routes>
          <Route
            path={steps.contact}
            element={<Contact {...guardProps} step={1} />}
          />
          <Route
            path={steps.orgDetails}
            element={<OrgDetails {...guardProps} step={2} />}
          />
          <Route
            path={steps.fsaInquiry}
            element={<FSAInquiry {...guardProps} step={3} />}
          />
          <Route
            path={steps.docs}
            element={<Documentation {...guardProps} step={4} />}
          />
          <Route
            path={steps.banking}
            element={<Banking {...guardProps} step={5} />}
          />
          <Route
            path={steps.summary}
            element={<Dashboard {...guardProps} step={6} />}
          />
        </Routes>
      </div>
      <Reference id={initReg.reference} classes="col-span-full md:mt-8" />
    </div>
  );
}

function getClaim(reg: RegistrationState) {
  /** before documentation, claim intent is determined by initial record */
  if (reg.step < 4) return reg.data.init.claim;

  /** in documentation and succeeding steps,
   * registrant might change context from `fresh/new -> claim`.
   * i.e. inputs org's EIN that happens to be already in our marketplace
   */
  const { data } = reg as RegStep4;
  const doc = data.documentation;

  if (doc?.DocType === "FSA") return;

  return doc?.Claim || reg.data.init.claim;
}
