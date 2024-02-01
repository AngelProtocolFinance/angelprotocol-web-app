import Icon from "components/Icon";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";
import { regRoutes } from "constants/routes";
import { getSavedRegistrationReference } from "helpers";
import { useNavigate } from "react-router-dom";
import { useLazyRegQuery } from "services/aws/registration";
import { getRegistrationState } from "../Steps/getRegistrationState";
import { SignerCompleteQueryParams } from "./types";

const proxyFunctionURL =
  "https://h247dsayjkdwlheiboq54r2gxu0htegs.lambda-url.us-east-1.on.aws";
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
      const { state, nextStep } = getRegistrationState(savedRegistration);
      navigate(`${appRoutes.register}/${regRoutes.steps}/${nextStep}`, {
        state: state.data.init,
      });
    } catch (_) {
      navigate(appRoutes.register);
    }
  };

  return (
    <>
      <Icon type="CheckCircle" className="text-green" size={70} />
      <h1 className="text-2xl uppercase text-center mt-10 mb-4">
        Fiscal Sponsorship Agreement signature was successfully saved!
      </h1>

      <a
        href={downloadZipURL(documentGroupEid)}
        className="text-blue hover:text-blue-d1 active:text-blue-d2 mb-4 inline-block"
      >
        <Icon
          type="FileDownload"
          size={18}
          className="inline bottom-px relative mr-1"
        />
        <span className="uppercase text-sm font-semibold font-work">
          download
        </span>
      </a>
      <button
        disabled={isLoading}
        className="w-full max-w-[26.25rem] btn-orange btn-reg mt-4"
        onClick={proceed}
      >
        {isLoading ? "Loading..." : "Continue"}
      </button>
    </>
  );
}
