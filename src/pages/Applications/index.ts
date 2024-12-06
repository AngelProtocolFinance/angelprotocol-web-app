import type { Page } from "@better-giving/registration/approval";
import { redirectToAuth } from "auth";
import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import type { LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
import type { UserV2 } from "types/auth";

export { Component } from "./Applications";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (auth) return getApplications(new URL(request.url), auth);
  return redirectToAuth(request);
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
  return fetch(req)
    .then<Page>((res) => res.json())
    .then((data) => ({ ...data, _id }));
}
