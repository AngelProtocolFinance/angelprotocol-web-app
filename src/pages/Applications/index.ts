import type { Page } from "@better-giving/registration/approval";
import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";
import type { UserV2 } from "types/auth";

export { default } from "./Applications";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (user) return getApplications(new URL(request.url), user);
  return redirectToAuth(request, headers);
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
