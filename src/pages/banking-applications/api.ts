import { resp, search } from "helpers/https";
import type { LoaderFunctionArgs } from "react-router";
import { cognito, toAuth } from ".server/auth";
import { bappdb } from ".server/aws/db";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return resp.status(403);

  const { status, nextPageKey } = search(request.url);
  const page = await bappdb.bapps({
    status: status as any,
    next: nextPageKey as any,
  });
  return page;
};
