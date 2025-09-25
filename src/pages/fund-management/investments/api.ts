import type { ILog, IPage } from "@better-giving/nav-history";
import { resp } from "helpers/https";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { navdb } from ".server/aws/db";

export interface LoaderData {
  ltd: ILog;
  logs: ILog[];
  recent_logs: IPage<ILog>;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  if (!user.groups.includes("ap-admin")) throw resp.status(403);

  const [ltd, logs, recent_logs] = await Promise.all([
    navdb.ltd(),
    navdb.week_series(),
    navdb.list({
      limit: 3,
    }),
  ]);

  return {
    ltd,
    logs: logs.items,
    recent_logs,
  } satisfies LoaderData;
};
