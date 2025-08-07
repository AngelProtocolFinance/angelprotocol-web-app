import { NavHistoryDB } from "@better-giving/nav-history";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

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

  const db = new NavHistoryDB(apes, env);
  const page = await db.list({
    limit: 6,
    next: key ?? undefined,
  });

  return resp.json(page);
};
