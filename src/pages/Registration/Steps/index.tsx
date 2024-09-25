import { isIrs501c3 } from "@better-giving/registration/models";
import ExtLink from "components/ExtLink";
import { ErrorStatus, LoadingStatus } from "components/Status";
import { appRoutes, regRoutes } from "constants/routes";
import {
  Navigate,
  Outlet,
  type RouteObject,
  useLocation,
} from "react-router-dom";
import { useRegQuery } from "services/aws/registration";
import { steps } from "../routes";
import type { InitState, RegStep4, RegistrationState } from "../types";
import Banking from "./Banking";
import ContactDetails from "./ContactDetails";
import Dashboard from "./Dashboard";
import Documentation from "./Documentation";
import FSAInquiry from "./FSAInquiry";
import OrgDetails from "./OrgDetails";
import ProgressIndicator from "./ProgressIndicator";
import Reference from "./Reference";
import type { StepGuardProps } from "./StepGuard";
import { getRegistrationState } from "./getRegistrationState";

function Layout() {
  const { state } = useLocation();
  const initReg = state as InitState | undefined;

  const ref = initReg?.id || "";
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

  const guardProps: StepGuardProps = {
    init: initReg,
    state: regState,
  };

  const claim = getClaim(regState);

  return (
    <div className="max-md:-my-20 w-full md:w-[90%] max-w-[62.5rem] [&]:has-[[data-claim='true']]:pt-0 pt-8 grid md:grid-cols-[auto_1fr] md:border border-gray-l4 rounded-none md:rounded-lg bg-white dark:bg-blue-d6">
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
        <Outlet context={guardProps} />
      </div>
      <Reference id={initReg.id} classes="col-span-full md:mt-8" />
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
  if (!data.docs || isIrs501c3(data.docs)) return reg.data.init.claim;
}

export const route: RouteObject = {
  path: regRoutes.steps,
  element: <Layout />,
  children: [
    { path: steps.contact, element: <ContactDetails step={1} /> },
    { path: steps.orgDetails, element: <OrgDetails step={2} /> },
    { path: steps.fsaInquiry, element: <FSAInquiry step={3} /> },
    { path: steps.docs, element: <Documentation step={4} /> },
    { path: steps.banking, element: <Banking step={5} /> },
    { path: steps.summary, element: <Dashboard step={6} /> },
  ],
};
