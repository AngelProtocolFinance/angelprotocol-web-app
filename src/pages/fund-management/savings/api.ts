import { resp } from "helpers/https";
import type { IBalLog, IInterestLog } from "lib/liquid";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { liqdb } from ".server/aws/db";

export interface LoaderData {
  logs_bal: IBalLog[];
  logs_intr: IInterestLog[];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  if (!user.groups.includes("ap-admin")) throw resp.status(403);

  const [bal_logs, int_logs] = await Promise.all([
    liqdb.bal_logs({ limit: 3 }),
    liqdb.intr_logs({ limit: 3 }),
  ]);

  return {
    logs_bal: bal_logs.items,
    logs_intr: int_logs.items,
  } satisfies LoaderData;
};
