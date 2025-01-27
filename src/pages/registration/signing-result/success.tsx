import { Link, useNavigation, useRouteLoaderData } from "@remix-run/react";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { ArrowDownToLine, CircleCheck } from "lucide-react";
import { nextStep } from "../routes";
import type { Reg$IdData } from "../types";
import type { SignerCompleteQueryParams } from "./types";

const proxyFunctionURL =
  "https://e7r5xzrogp3hpnzgrg2laiqwvq0avzkz.lambda-url.us-east-1.on.aws";
const downloadZipURL = (eid: string) =>
  proxyFunctionURL + (IS_TEST ? "/staging" : "") + `?eid=${eid}`;

export default function Success({
  documentGroupEid,
}: SignerCompleteQueryParams) {
  const navigation = useNavigation();
  const { reg } = useRouteLoaderData("reg$Id") as Reg$IdData;

  const isLoading = navigation.state === "loading";

  return (
    <>
      <CircleCheck className="text-green" size={70} />
      <h1 className="text-2xl uppercase text-center mt-10 mb-4">
        Fiscal Sponsorship Agreement signature was successfully saved!
      </h1>

      <a
        href={downloadZipURL(documentGroupEid)}
        className="text-blue hover:text-blue-d1 active:text-blue-d2 mb-4 inline-block"
      >
        <ArrowDownToLine size={18} className="inline bottom-px relative mr-1" />
        <span className="uppercase text-sm font-semibold">download</span>
      </a>
      <Link
        aria-disabled={isLoading}
        className="w-full max-w-[26.25rem] btn-blue btn-reg mt-4"
        to={`${appRoutes.register}/${reg.data.init.id}/${nextStep[reg.step]}`}
      >
        {isLoading ? "Loading..." : "Continue"}
      </Link>
    </>
  );
}
