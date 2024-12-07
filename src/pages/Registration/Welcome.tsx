import type { EndowClaim } from "@better-giving/registration/models";
import type { Step1 } from "@better-giving/registration/step";
import type { NewReg } from "@better-giving/registration/update";
import { ap, ver } from "api/api";
import { loadAuth } from "auth/load-auth";
import LoadText from "components/LoadText";
import { APP_NAME } from "constants/env";
import { storeRegistrationReference } from "helpers";
import { decodeState } from "helpers/state-params";
import { CircleCheck } from "lucide-react";
import { type ActionFunction, redirect, useFetcher } from "react-router-dom";
import { steps } from "./routes";

export const action: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const url = new URL(request.url);
  const claim = decodeState<EndowClaim>(url.searchParams.get("_s"));

  const payload: NewReg = {
    registrant_id: auth.email,
  };
  if (claim) payload.claim = claim;

  const reg = await ap
    .post<Pick<Step1, "id">>(`${ver(1)}/registrations`, {
      headers: { authorization: auth.idToken },
    })
    .json();
  storeRegistrationReference(reg.id);
  return redirect(`../${reg.id}/${steps.contact}`);
};

export function Component() {
  const fetcher = useFetcher();

  return (
    <div className="grid justify-items-center mx-6">
      <CircleCheck className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-navy-l1 dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your fundraising profile & account are just few steps away 😇
      </p>

      <fetcher.Form className="contents" action="." method="post">
        <button
          disabled={fetcher.state !== "idle"}
          className="w-full max-w-[26.25rem] btn-blue btn-reg"
        >
          <LoadText text="Continue registration">
            Continue registration
          </LoadText>
        </button>
      </fetcher.Form>

      <p className="text-sm italic text-navy-l1 dark:text-navy-l2 mt-8 text-center">
        Note: Registration is quick, but we've sent an email link if you need to
        pause and resume at any point.
      </p>
    </div>
  );
}
