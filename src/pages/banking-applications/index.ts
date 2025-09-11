import { search } from "helpers/https";
import { metas } from "helpers/seo";
import type { LoaderFunction } from "react-router";
import { cognito, toAuth } from ".server/auth";
import { bappdb } from ".server/aws/db";

export { default } from "./banking-applications";
export { ErrorBoundary } from "components/error";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const { status, nextPageKey } = search(request.url);
  const page = await bappdb.bapps({
    status: status as any,
    next: nextPageKey as any,
  });
  return page;
};
export const meta = () => metas({ title: "Banking Applications" });
