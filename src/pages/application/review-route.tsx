import { verdict as verdictSchema } from "@better-giving/registration/approval";
import { regId as regIdSchema } from "@better-giving/registration/models";
import { isDone } from "@better-giving/registration/step";
import { type ActionFunction, redirect } from "@vercel/remix";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { getReg } from ".server/registration/get-reg";
import { review } from ".server/registration/review";
export { default } from "./prompt";
export { ErrorModal as ErrorBoundary } from "components/error";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (!user.groups.includes("ap-admin")) {
    throw `Unauthorized`;
  }

  const fv: { reason?: string } = await request.json();

  const id = parse(regIdSchema, params.id);
  const verdict = parse(verdictSchema, {
    verdict: params.verdict,
    reason: fv.reason ?? "",
  });

  const reg = await getReg(id);
  if (!reg) throw new Response("Registration not found", { status: 404 });

  if (!isDone.submission(reg)) throw `registration not submitted`;
  await review(verdict, reg);
  return redirect("../success");
};
