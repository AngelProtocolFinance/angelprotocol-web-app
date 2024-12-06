import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import type { LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
import type { UserV2 } from "types/auth";

export { BankingApplications as Component } from "./BankingApplications";

export const loader: LoaderFunction = async ({ request }) => {
  console.log({ request });
  const auth = await loadAuth();
  if (auth) return getApplications(new URL(request.url), auth);
  return redirectToAuth(request);
};

async function getApplications(source: URL, user: UserV2) {
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/banking-applications`;
  url.searchParams.set("requestor", "bg-admin");

  const status = source.searchParams.get("status");
  const nextPageKey = source.searchParams.get("nextPageKey");
  const endowId = source.searchParams.get("endowmentID");

  if (status) url.searchParams.set("status", status);
  if (nextPageKey) url.searchParams.set("nextPageKey", nextPageKey);
  if (endowId) url.searchParams.set("endowmentID", endowId);

  const req = new Request(url);
  req.headers.set("authorization", user.idToken);
  return fetch(req).then((res) => res.json());
}
