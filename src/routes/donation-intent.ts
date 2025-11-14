import { resp } from "helpers/https";
import type { Route } from "./+types/donation-intent";
import { onholddb } from ".server/aws/db";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const x = await onholddb.item(params.intent_id);
  if (!x) return resp.status(404);
  return resp.txt(x.transactionId, 200);
};
