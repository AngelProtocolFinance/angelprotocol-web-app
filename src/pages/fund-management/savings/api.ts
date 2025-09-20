import type { IBalLog, IInterestLog } from "@better-giving/liquid";
import { resp } from "helpers/https";
import type { Route } from "./+types";
import { cognito, toAuth } from ".server/auth";
import { liqdb } from ".server/aws/db";

export interface LoaderData {
  logs_bal: IBalLog[];
  logs_intr: IInterestLog[];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
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
