import type { LoaderFunction } from "@vercel/remix";
import { ap, toSearch, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";
import type { UserV2 } from "types/auth";

export { default } from "./BankingApplications";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (user) return getApplications(new URL(request.url), user);
  return redirectToAuth(request, headers);
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
