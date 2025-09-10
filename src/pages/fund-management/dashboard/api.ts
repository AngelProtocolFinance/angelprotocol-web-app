import type { ILog, IPage } from "@better-giving/nav-history";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import { cognito, toAuth } from ".server/auth";
import { navdb } from ".server/aws/db";

export interface LoaderData {
  ltd: ILog;
  logs: ILog[];
  recent_logs: IPage<ILog>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) throw resp.status(403);

  const [ltd, logs, recent_logs] = await Promise.all([
    navdb.ltd(),
    navdb.week_series(),
    navdb.list({
      limit: 3,
    }),
  ]);

  return resp.json({
    ltd,
    logs: logs.items,
    recent_logs,
  } satisfies LoaderData);
};
