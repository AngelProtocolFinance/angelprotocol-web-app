import { metas } from "helpers/seo";
import type { LoaderFunction } from "react-router";
import { cognito, toAuth } from ".server/auth";
import { bank_applications } from ".server/banking-applications";

export { default } from "./banking-applications";
export { ErrorBoundary } from "components/error";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const source = new URL(request.url);

  const { status, nextPageKey } = Object.fromEntries(
    source.searchParams.entries()
  );
  const page = await bank_applications(status as any, nextPageKey as any);
  return page;
};
export const meta = () => metas({ title: "Banking Applications" });
