import { type ActionFunction, redirect } from "@remix-run/react";
import { bankUpdate } from "api/action/bank-update";
import { plusInt } from "api/schema/endow-id";
import { loadAuth, redirectToAuth } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import { bankingApplicationUpdate } from "types/aws";
import * as v from "valibot";

export const clientAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv = await request.formData();
  const payload = parseWithValibot(fv, { schema: bankingApplicationUpdate });
  if (payload.status !== "success") return payload.reply();

  const bankId = v.parse(plusInt, params.id);
  const res = await bankUpdate(bankId, payload.value, auth.idToken);
  if (!res.ok) throw res;
  return redirect("../success");
};
