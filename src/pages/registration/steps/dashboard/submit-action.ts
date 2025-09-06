import { Progress } from "@better-giving/reg/progress";
import { type IReg, reg_id } from "@better-giving/reg/schema";
import type { ActionFunction } from "@vercel/remix";
import { resp } from "helpers/https";
import type { ActionData } from "types/action";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { regdb } from ".server/aws/db";

export const submit_action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(reg_id, params.regId);
  const reg = await regdb.reg(id);

  if (!reg) throw resp.status(404, `reg:${id} not found`);

  const r = new Progress(reg).step5;
  if (!r) throw `Registration not ready for submission`;

  if (user.email !== r.r_id && !user.groups.includes("ap-admin")) {
    throw resp.status(403);
  }

  const b = regdb.reg_update_build({
    status: "02",
  });
  //reset previous review
  b.remove("status_rejected_reason" satisfies keyof IReg);
  await regdb.reg_update(r.id, b);

  return {
    __ok: "Your application has been submitted. We will get back to you soon!",
  } satisfies ActionData;
};
