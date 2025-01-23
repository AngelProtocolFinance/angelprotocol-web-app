import { isIrs501c3 } from "@better-giving/registration/models";
import { Outlet, useRouteLoaderData } from "@remix-run/react";
import ExtLink from "components/ExtLink";
import { appRoutes } from "constants/routes";
import type { Reg$IdData, RegStep4, RegistrationState } from "../types";
import ProgressIndicator from "./ProgressIndicator";
import Reference from "./Reference";

export default function Layout() {
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
