import { ap, toSearch, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import type { LoaderFunction } from "react-router-dom";
import type { UserV2 } from "types/auth";

export { BankingApplications as Component } from "./BankingApplications";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (auth) return getApplications(new URL(request.url), auth);
  return redirectToAuth(request);
};

async function getApplications(source: URL, user: UserV2) {
  const { status, nextPageKey } = Object.fromEntries(
    source.searchParams.entries()
  );
  return ap
    .get(`${ver(1)}/banking-applications`, {
      headers: { authorization: user.idToken },
      searchParams: toSearch({
        requestor: "bg-admin",
        status: status,
        nextPageKey,
      }),
    })
    .json();
}
