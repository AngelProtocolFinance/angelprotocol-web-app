import type { EndowClaim } from "@better-giving/registration/models";
import Icon from "components/Icon";
import LoadText from "components/LoadText";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { APP_NAME } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { storeRegistrationReference } from "helpers";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNewApplicationQuery } from "services/aws/registration";
import { steps } from "./routes";
import type { InitState } from "./types";

export function Component() {
  const { email } = useAuthenticatedUser();
  const { state } = useLocation();
  const claim = state as EndowClaim | undefined;
  const {
    data: reg,
    isLoading,
    isError,
  } = useNewApplicationQuery({ registrant_id: email, claim });

  useEffect(() => {
    if (!reg) return;
    storeRegistrationReference(reg.id);
  }, [reg]);

  return (
    <div className="grid justify-items-center mx-6">
      <Icon type="CheckCircle" className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-navy-l1 dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your fundraising profile & account are just few steps away 😇
      </p>

      <Link
        aria-disabled={isLoading || isError || !reg}
        className="w-full max-w-[26.25rem] btn-blue btn-reg"
        to={`${appRoutes.register}/${regRoutes.steps}/${steps.contact}`}
        state={
          {
            //link is disabled if no reg
            registrant_id: reg?.registrant_id!,
            id: reg?.id!,
          } satisfies InitState
        }
      >
        <LoadText isLoading={isLoading} text="Continue registration">
          Continue registration
        </LoadText>
      </Link>
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
