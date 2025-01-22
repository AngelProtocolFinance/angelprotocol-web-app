import { type ActionFunction, redirect } from "@vercel/remix";
import { bankUpdate } from "api/action/bank-update";
import { plusInt } from "api/schema/endow-id";
import { parseWithValibot } from "conform-to-valibot";
import { bankingApplicationUpdate } from "types/aws";
import * as v from "valibot";
import { cognito, redirectToAuth } from ".server/auth";

export const action: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, { headers });

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: bankingApplicationUpdate });
  if (payload.status !== "success") return payload.reply();

  const bankId = v.parse(plusInt, params.id);
  const res = await bankUpdate(bankId, payload.value, user.idToken);
  if (!res.ok) throw res;
  return redirect("../success");
};
