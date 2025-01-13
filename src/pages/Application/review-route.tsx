import type { Verdict } from "@better-giving/registration/approval";
import { type ActionFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";
export { default } from "./Prompt";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const fv: { reason?: string } = await request.json();

  const verdict: Verdict = {
    verdict: params.verdict as Verdict["verdict"],
    reason: fv.reason ?? "",
  };

  await ap.post(`${ver(1)}/registrations/${params.id}/review`, {
    json: verdict,
    headers: { authorization: user.idToken },
  });

  return redirect("../success");
};
