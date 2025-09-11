import { resp } from "helpers/https";
import type { LoaderFunction } from "react-router";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { navdb } from ".server/aws/db";

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams: s } = new URL(request.url);

  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("next")
  );

  const { user } = await cognito.retrieve(request);
  if (!user?.groups.includes("ap-admin")) {
    return resp.status(403);
  }

  const page = await navdb.list({
    limit: 6,
    next: key ?? undefined,
  });

  return resp.json(page);
};
