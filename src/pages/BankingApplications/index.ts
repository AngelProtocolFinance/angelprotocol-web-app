import type { LoaderFunction } from "@vercel/remix";
import { ap, toSearch, ver } from "api/api";
import { metas } from "helpers/seo";
import type { UserV2 } from "types/auth";
import { cognito, toAuth } from ".server/auth";

export { default } from "./BankingApplications";
export { ErrorBoundary } from "components/error";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (user) return getApplications(new URL(request.url), user);
  return toAuth(request, headers);
};
export const meta = () => metas({ title: "Banking Applications" });
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
