import { Progress } from "@better-giving/reg/progress";
import { reg_id } from "@better-giving/reg/schema";
import { $ } from "@better-giving/schemas";
import { type ActionFunction, redirect } from "react-router";
import { literal, object, parse, variant } from "valibot";
import { npo_new } from "./npo-new";
import { cognito, to_auth } from ".server/auth";
import { regdb } from ".server/aws/db";
export { default } from "./prompt";
export { ErrorModal as ErrorBoundary } from "components/error";

const approval = object({ type: literal("approved") });
const rejection = object({
  type: literal("rejected"),
  reason: $,
});
export const schema = variant("type", [approval, rejection]);

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  if (!user.groups.includes("ap-admin")) {
    throw "Unauthorized";
  }

  const fv: { reason?: string } = await request.json();

  const id = parse(reg_id, params.id);
  const verdict = parse(schema, {
    type: params.verdict,
    reason: fv.reason ?? "",
  });

  const reg = await regdb.reg(id);
  if (!reg) throw new Response("Registration not found", { status: 404 });

  const r = new Progress(reg).banking; // no need to look at fsa
  if (!r) throw "registration has incomplete steps";

  if (reg.status !== "02") {
    throw `registration not in review, curr status:${reg.status}`;
  }

  if (verdict.type === "rejected") {
    await regdb.reg_update(id, {
      status: "04",
      status_rejected_reason: verdict.reason,
    });
    return redirect("../success");
  }
  const npo = await npo_new(r);
  console.info("NPO created:", npo);
  return redirect("../success");
};
