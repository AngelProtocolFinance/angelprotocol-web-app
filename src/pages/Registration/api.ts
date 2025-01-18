import type { EndowClaim } from "@better-giving/registration/models";
import type { Step1 } from "@better-giving/registration/step";
import type { NewReg } from "@better-giving/registration/update";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndowWithEin } from "api/get/endow-with-ein";
import { cognito, redirectToAuth } from "auth";
import { appRoutes } from "constants/routes";
import { regCookie } from "./data/cookie";
import { steps } from "./routes";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);
  return user;
};

export const newApplicationAction: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const url = new URL(request.url);

  const ein = url.searchParams.get("claim");
  const endow = ein ? await getEndowWithEin(ein) : null;
  const claim = endow
    ? ({
        id: endow.id,
        ein: endow.registration_number,
        name: endow.name,
      } satisfies EndowClaim)
    : null;

  const payload: NewReg = {
    registrant_id: user.email,
  };

  if (claim) payload.claim = claim;

  const reg = await ap
    .post<Pick<Step1, "id">>(`${ver(1)}/registrations`, {
      json: payload,
      headers: { authorization: user.idToken },
    })
    .json();
  const rc = await regCookie
    .parse(request.headers.get("Cookie"))
    .then((x) => x || {});
  rc.reference = reg.id;

  return redirect(`${appRoutes.register}/${reg.id}/${steps.contact}`, {
    headers: { "Set-Cookie": await regCookie.serialize(rc) },
  });
};
