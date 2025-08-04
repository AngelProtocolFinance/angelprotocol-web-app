import { NavHistoryDB } from "@better-giving/nav-history";
import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, { headers });
  if (!user.groups.includes("ap-admin")) return { status: 403 };
  const db = new NavHistoryDB(apes, env);
  return db.ltd();
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, { headers });
  if (!user.groups.includes("ap-admin")) return { status: 403 };
};
