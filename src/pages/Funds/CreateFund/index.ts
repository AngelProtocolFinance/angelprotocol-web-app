import type { NewFund } from "@better-giving/fundraiser";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@remix-run/react";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { cognito, loadAuth, redirectToAuth } from "auth";
import { adminRoutes, appRoutes } from "constants/routes";

export { default } from "./CreateFund";

export const clientLoader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);
  const url = new URL(request.url);
  const npoId = url.searchParams.get("npo");
  const endow = npoId ? await getEndow(npoId) : null;
  return endow;
};

export const clientAction: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const payload: NewFund = await request.json();

  await ap
    .post<{ id: string }>(`${ver(1)}/funds`, {
      json: payload,
      headers: { authorization: auth.idToken },
    })
    .json();

  //delay to give room for credentials to be written in db
  await new Promise((r) => setTimeout(r, 500));
  await cognito.refresh(auth.refreshToken);

  if (payload.npo_owner) {
    return redirect(`${appRoutes.admin}/${adminRoutes.funds}`);
  }
  return redirect(`${appRoutes.user_dashboard}/funds`);
};
