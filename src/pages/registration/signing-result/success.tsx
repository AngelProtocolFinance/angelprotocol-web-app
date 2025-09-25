import { Progress } from "@better-giving/reg/progress";
import { app_routes } from "constants/routes";
import { ArrowDownToLine, CircleCheck } from "lucide-react";
import { Link, useNavigation, useRouteLoaderData } from "react-router";
import { next_step } from "../routes";
import type { Reg$IdData } from "../types";
import type { SignerCompleteQueryParams } from "./types";

export default function Success({
  documentGroupEid,
}: SignerCompleteQueryParams) {
  const navigation = useNavigation();
  const { reg } = useRouteLoaderData("reg$Id") as Reg$IdData;
  const step = new Progress(reg).step;

  const isLoading = navigation.state === "loading";

  return (
    <>
      <CircleCheck className="text-green" size={70} />
      <h1 className="text-2xl uppercase text-center mt-10 mb-4">
        Fiscal Sponsorship Agreement signature was successfully saved!
      </h1>

      <a
        download
        href={`/api/anvil-doc/${documentGroupEid}`}
        className="text-blue hover:text-blue-d1 active:text-blue-d2 mb-4 inline-block"
      >
        <ArrowDownToLine size={18} className="inline bottom-px relative mr-1" />
        <span className="uppercase text-sm font-semibold">download</span>
      </a>
      <Link
        aria-disabled={isLoading}
        className="w-full max-w-[26.25rem] btn btn-blue text-sm mt-4"
        to={`${app_routes.register}/${reg.id}/${next_step[step]}`}
      >
        {isLoading ? "Loading..." : "Continue"}
      </Link>
    </>
  );
}
