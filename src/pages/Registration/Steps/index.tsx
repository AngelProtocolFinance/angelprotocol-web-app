import { isIrs501c3 } from "@better-giving/registration/models";
import ExtLink from "components/ExtLink";
import PromptV2 from "components/Prompt/PromptV2";
import { appRoutes } from "constants/routes";
import { ErrorElement } from "errors/ErrorElement";
import {
  Navigate,
  Outlet,
  type RouteObject,
  useRouteLoaderData,
} from "react-router-dom";
import { stepLoader } from "../data/step-loader";
import { nextStep, steps } from "../routes";
import type { Reg$IdData, RegStep4, RegistrationState } from "../types";
import Banking from "./Banking";
import ContactDetails from "./ContactDetails";
import Dashboard from "./Dashboard";
import Documentation from "./Documentation";
import FSAInquiry from "./FSAInquiry";
import OrgDetails from "./OrgDetails";
import ProgressIndicator from "./ProgressIndicator";
import Reference from "./Reference";
import { fsaAction } from "./fsa-action";
import { submitAction } from "./submit-action";
import { updateAction } from "./update-action";

function Layout() {
  const { reg, user } = useRouteLoaderData("reg$Id") as Reg$IdData;
  const claim = getClaim(reg);

  return (
    <div className="w-full md:w-[90%] max-w-[62.5rem] [&]:has-[[data-claim='true']]:pt-0 pt-8 grid md:grid-cols-[auto_1fr] md:border border-gray-l4 rounded-none md:rounded-lg bg-white dark:bg-blue-d6">
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
        step={reg.step}
        classes="md:min-w-[12rem] lg:min-w-[15.5rem]"
      />

      <div className="grid z-10 w-full px-6 py-8 md:p-0 md:pr-8 md:shadow-none shadow-[0px_4px_6px,_0px_-4px_6px] shadow-gray-l3/80 dark:shadow-blue-d7">
        <Outlet context={user} />
      </div>
      <Reference id={reg.data.init.id} classes="col-span-full md:mt-8" />
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
  element: <Layout />,
  children: [
    {
      path: steps.contact,
      element: <ContactDetails />,
      loader: stepLoader(1),
      errorElement: <ErrorElement />,
      action: updateAction(nextStep[1]),
    },
    {
      path: steps.orgDetails,
      element: <OrgDetails />,
      loader: stepLoader(2),
      errorElement: <ErrorElement />,
      action: updateAction(nextStep[2]),
    },
    {
      path: steps.fsaInquiry,
      element: <FSAInquiry />,
      loader: stepLoader(3),
      errorElement: <ErrorElement />,
      action: updateAction(nextStep[3]),
    },
    {
      path: steps.docs,
      element: <Documentation />,
      loader: stepLoader(4),
      action: updateAction(nextStep[4]),
      errorElement: <ErrorElement />,
      children: [{ path: "fsa", action: fsaAction }],
    },
    {
      path: steps.banking,
      element: <Banking />,
      loader: stepLoader(5),
      errorElement: <ErrorElement />,
      action: updateAction(nextStep[5]),
    },
    {
      path: steps.summary,
      element: <Dashboard />,
      loader: stepLoader(6),
      errorElement: <ErrorElement />,
      action: submitAction,
      children: [
        {
          path: "success",
          element: (
            <PromptV2
              type="success"
              children="Your application has been submitted. We will get back to you soon!"
            />
          ),
        },
      ],
    },
    { index: true, element: <Navigate to={steps.contact} /> },
  ],
};
