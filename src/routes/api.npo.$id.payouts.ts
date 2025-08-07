import { $int_gte1 } from "@better-giving/endowment/schema";
import { PayoutsDB } from "@better-giving/payouts";
import type { LoaderFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import * as v from "valibot";
import { cognito } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = v.parse($int_gte1, params.id);
  const { user } = await cognito.retrieve(request);
  if (!user) return resp.status(401);
  if (!user.endowments.includes(id) && !user.groups.includes("ap-admin")) {
    return resp.status(403);
  }
  const db = new PayoutsDB(apes, env);
  const page = await db.npo_payouts(id.toString(), {});
  return resp.json(page);
};
