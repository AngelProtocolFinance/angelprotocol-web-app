import type { EndowClaim } from "@better-giving/registration/models";
import LoadText from "components/LoadText";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { APP_NAME } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import { useRendered } from "hooks/use-rendered";
import { CircleCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewApplicationMutation } from "services/aws/registration";
import { steps } from "./routes";

export function Component() {
  useRendered();
  const { email } = useAuthenticatedUser();
  const { handleError } = useErrorContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const claim = state as EndowClaim | null;

  const [createNewApplication, { isLoading, isError }] =
    useNewApplicationMutation();

  async function proceed() {
    try {
      const reg = await createNewApplication({
        registrant_id: email,
        claim: claim ?? undefined,
      }).unwrap();
      storeRegistrationReference(reg.id);
      navigate(`${appRoutes.register}/${regRoutes.steps}/${steps.contact}`, {
        state: reg,
      });
    } catch (err) {
      handleError(err, { context: "Creating registration" });
    }
  }

  return (
    <div className="grid justify-items-center mx-6">
      <CircleCheck className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-navy-l1 dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your fundraising profile & account are just few steps away 😇
      </p>

      <button
        type="button"
        onClick={proceed}
        disabled={isLoading}
        className="w-full max-w-[26.25rem] btn-blue btn-reg"
      >
        <LoadText isLoading={isLoading} text="Continue registration">
          Continue registration
        </LoadText>
      </button>
      {isError && (
        <span className="text-xs text-red mt-2 text-center">
          {GENERIC_ERROR_MESSAGE}
        </span>
      )}
      <p className="text-sm italic text-navy-l1 dark:text-navy-l2 mt-8 text-center">
        Note: Registration is quick, but we've sent an email link if you need to
        pause and resume at any point.
      </p>
    </div>
  );
}
