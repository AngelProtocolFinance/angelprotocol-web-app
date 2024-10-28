import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { regRoutes } from "constants/routes";
import { getSavedRegistrationReference } from "helpers";
import { ArrowDownToLine, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLazyRegQuery } from "services/aws/registration";
import { getRegistrationState } from "../Steps/getRegistrationState";
import type { SignerCompleteQueryParams } from "./types";

const proxyFunctionURL =
  "https://e7r5xzrogp3hpnzgrg2laiqwvq0avzkz.lambda-url.us-east-1.on.aws";
const downloadZipURL = (eid: string) =>
  proxyFunctionURL + (IS_TEST ? "/staging" : "") + `?eid=${eid}`;

export default function Success({
  documentGroupEid,
}: SignerCompleteQueryParams) {
  const [checkPrevRegistration, { isLoading }] = useLazyRegQuery();
  const navigate = useNavigate();

  //redirect page from anvil has no information about the registration
  const proceed = async () => {
    try {
      const reference = getSavedRegistrationReference();
      if (!reference) return navigate(appRoutes.register);
      const savedRegistration = await checkPrevRegistration(reference).unwrap();
      const { state } = getRegistrationState(savedRegistration);
      navigate(`${appRoutes.register}/${regRoutes.steps}/${state.step}`, {
        state: state.data.init,
      });
    } catch (_) {
      navigate(appRoutes.register);
    }
  };

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
      <button
        disabled={isLoading}
        className="w-full max-w-[26.25rem] btn-blue btn-reg mt-4"
        onClick={proceed}
      >
        {isLoading ? "Loading..." : "Continue"}
      </button>
    </>
  );
}
