import type { Page } from "@better-giving/registration/approval";
import { loadAuth } from "auth/load-auth";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { decodeState, toUrlWithState } from "helpers/state-params";
import { type LoaderFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";
import type { SignInRouteState, UserV2 } from "types/auth";

export { Component } from "./Applications";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (auth) return getApplications(new URL(request.url), auth);

  //redirect to signin page
  const from = new URL(request.url);
  const toState: SignInRouteState = {
    from: from.pathname,
    data: decodeState(from.searchParams.get("_s")),
    search: from.search,
  };

  const to = new URL(request.url);
  to.pathname = appRoutes.signup;

  return redirect(toUrlWithState(to, toState).toString());
};

async function getApplications(source: URL, user: UserV2) {
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/registrations`;
  url.search = source.search;
  //set defaults
  url.searchParams.set("status", source.searchParams.get("status") ?? "02");

  //remove filter marker
  const _id = source.searchParams.get("_id");
  source.searchParams.delete("_id");

  const req = new Request(url);
  req.headers.set("authorization", user.idToken);
  return cacheGet(req)
    .then<Page>((res) => res.json())
    .then((data) => ({ ...data, _id }));
}
