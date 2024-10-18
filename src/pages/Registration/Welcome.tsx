import type { EndowClaim } from "@better-giving/registration/models";
import type { Step1 } from "@better-giving/registration/step";
import type { NewReg } from "@better-giving/registration/update";
import { loadAuth } from "auth/load-auth";
import LoadText from "components/LoadText";
import { APP_NAME } from "constants/env";
import { APIs } from "constants/urls";
import { storeRegistrationReference } from "helpers";
import { decodeState } from "helpers/state-params";
import { CircleCheck } from "lucide-react";
import { Link, type LoaderFunction, useLoaderData } from "react-router-dom";
import { version as v } from "services/helpers";
import { steps } from "./routes";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) throw "auth is required up higher";

  const url = new URL(request.url);
  const claim = decodeState<EndowClaim>(url.searchParams.get("_s"));

  const payload: NewReg = {
    registrant_id: auth.email,
  };
  if (claim) payload.claim = claim;

  const api = new URL(APIs.aws);

  api.pathname = `${v(1)}/registrations`;

  const post = new Request(api, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  post.headers.set("authorization", auth.idToken);

  api.search = "";
  const cacheKey =
    api.toString() + `?new=true&claim=${btoa(JSON.stringify(claim))}`;

  const cache = await caches.open("bg");
  const cached = await cache.match(cacheKey);
  if (cached) return cached.clone();

  const res = await fetch(post);
  await cache.put(cacheKey, res.clone());

  const reg: Pick<Step1, "id"> = await res.json();
  storeRegistrationReference(reg.id);
  return reg.id;
};

export function Component() {
  const regId = useLoaderData() as string;

  return (
    <div className="grid justify-items-center mx-6">
      <CircleCheck className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-navy-l1 dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your fundraising profile & account are just few steps away 😇
      </p>

      <Link
        className="w-full max-w-[26.25rem] btn-blue btn-reg"
        to={`../${regId}/${steps.contact}`}
      >
        <LoadText text="Continue registration">Continue registration</LoadText>
      </Link>
      <p className="text-sm italic text-navy-l1 dark:text-navy-l2 mt-8 text-center">
        Note: Registration is quick, but we've sent an email link if you need to
        pause and resume at any point.
      </p>
    </div>
  );
}
