import { Progress } from "@better-giving/reg/progress";
import { ExtLink } from "components/ext-link";
import { app_routes } from "constants/routes";
import { Outlet, useRouteLoaderData } from "react-router";
import type { Reg$IdData } from "../types";
import { ProgressIndicator } from "./progress-indicator";
import Reference from "./reference";

export default function Layout() {
  const { reg, user } = useRouteLoaderData("reg$Id") as Reg$IdData;

  return (
    <div className="w-full md:w-[90%] max-w-[62.5rem] [&]:has-data-[claim='true']:pt-0 pt-8 grid md:grid-cols-[auto_1fr] md:border border-gray-l3 rounded-none md:rounded-lg bg-white dark:bg-blue-d6">
      {reg.claim && (
        <div
          data-claim
          className="bg-blue-l4 col-span-full md:mb-8 rounded-t p-2 text-gray text-sm"
        >
          Claiming{" "}
          <ExtLink
            className="font-bold text-gray-d4 hover:underline"
            href={`${app_routes.marketplace}/${reg.claim.id}`}
          >
            {reg.claim.name}
          </ExtLink>
          , EIN: <span className="font-bold text-gray-d4">{reg.claim.ein}</span>
        </div>
      )}
      <ProgressIndicator
        step={new Progress(reg).step}
        classes="md:min-w-[12rem] lg:min-w-[15.5rem]"
      />

      <div className="grid z-10 w-full px-6 py-8 md:p-0 md:pr-8 md:shadow-none shadow-[0px_4px_6px,_0px_-4px_6px] shadow-gray-l3/80 dark:shadow-blue-d7">
        <Outlet context={user} />
      </div>
      <Reference id={reg.id} classes="col-span-full md:mt-8" />
    </div>
  );
}
