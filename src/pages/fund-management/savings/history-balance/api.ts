import { resp } from "helpers/https";
import * as v from "valibot";
import type { Route } from "./+types";
import { cognito } from ".server/auth";
import { liqdb } from ".server/aws/db";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { searchParams: s } = new URL(request.url);

  const key = v.parse(
    v.nullable(v.pipe(v.string(), v.base64())),
    s.get("next")
  );

  const { user } = await cognito.retrieve(request);
  if (!user?.groups.includes("ap-admin")) {
    return resp.status(403);
  }

  const page = await liqdb.bal_logs({
    limit: 6,
    next: key ?? undefined,
  });

  return page;
};
