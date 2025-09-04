import { reg_id, reg_update } from "@better-giving/reg/schema";
import { type ActionFunction, redirect } from "@vercel/remix";
import { resp } from "helpers/https";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { regdb } from ".server/aws/db";

export const update_action =
  (next: string): ActionFunction =>
  async ({ request, params }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return toAuth(request, headers);

    const rid = parse(reg_id, params.regId);
    const upd8 = parse(reg_update, await request.json());

    const reg = await regdb.reg(rid);
    if (!reg) throw resp.status(404, `reg:${rid} not found`);

    if (reg.r_id !== user.email && !user.groups.includes("ap-admin")) {
      throw resp.status(401);
    }
    await regdb.reg_update(rid, upd8);

    return redirect(`../${next}`);
  };
