import { type ILog, NavHistoryDB } from "@better-giving/nav-history";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import { cognito, toAuth } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export interface LoaderData {
  ltd: ILog;
  logs: ILog[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) throw resp.status(403);

  const navdb = new NavHistoryDB(apes, env);

  const [ltd, logs] = await Promise.all([navdb.ltd(), navdb.list_weekly()]);

  return resp.json({
    ltd,
    logs: logs.items,
  } satisfies LoaderData);
};
