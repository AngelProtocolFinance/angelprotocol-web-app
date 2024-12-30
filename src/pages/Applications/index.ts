import type { Page } from "@better-giving/registration/approval";
import { ap, ver } from "api/api";
import { redirectToAuth } from "auth";
import { loadAuth } from "auth/load-auth";
import type { LoaderFunction } from "react-router";
import type { UserV2 } from "types/auth";

export { Component } from "./Applications";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (auth) return getApplications(new URL(request.url), auth);
  return redirectToAuth(request);
};

async function getApplications(source: URL, user: UserV2) {
  const copy = new URLSearchParams(source.search);
  copy.set("status", source.searchParams.get("status") ?? "02");

  return ap
    .get<Page>(`${ver(1)}/registrations`, {
      headers: { authorization: user.idToken },
      searchParams: source.searchParams,
    })
    .json();
}
