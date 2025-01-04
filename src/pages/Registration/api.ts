import type { EndowClaim } from "@better-giving/registration/models";
import type { Step1 } from "@better-giving/registration/step";
import type { NewReg } from "@better-giving/registration/update";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@remix-run/react";
import { ap, ver } from "api/api";
import { redirectToAuth } from "auth";
import { loadAuth } from "auth/load-auth";
import { appRoutes } from "constants/routes";
import { storeRegistrationReference } from "helpers";
import { decodeState } from "helpers/state-params";
import { steps } from "./routes";

export const clientLoader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  return auth;
};

export const newApplicationAction: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(request.url);
  const claim = decodeState<EndowClaim>(url.searchParams.get("_s"));

  const payload: NewReg = {
    registrant_id: auth.email,
  };
  if (claim) payload.claim = claim;

  const reg = await ap
    .post<Pick<Step1, "id">>(`${ver(1)}/registrations`, {
      json: payload,
      headers: { authorization: auth.idToken },
    })
    .json();
  storeRegistrationReference(reg.id);
  return redirect(`${appRoutes.register}/${reg.id}/${steps.contact}`);
};
