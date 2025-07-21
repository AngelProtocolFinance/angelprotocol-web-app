import { endowIdParam } from "@better-giving/endowment/schema";
import { PayoutsDB } from "@better-giving/payouts";
import type { LoaderFunction } from "@vercel/remix";
import * as v from "valibot";
import { resp } from "./helpers/resp";
import { cognito } from ".server/auth";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = v.parse(endowIdParam, params.id);
  const { user } = await cognito.retrieve(request);
  if (!user) return resp.status(401);
  if (!user.endowments.includes(id) && !user.groups.includes("ap-admin")) {
    return resp.status(403);
  }
  const db = new PayoutsDB(apes, env);
  const page = await db.npo_payouts(id.toString(), {});
  return resp.json(page);
};
