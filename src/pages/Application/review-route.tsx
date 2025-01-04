import type { Verdict } from "@better-giving/registration/approval";
import { type ActionFunction, redirect } from "@remix-run/react";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
export { default } from "./Prompt";

export const clientAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv: { reason?: string } = await request.json();

  const verdict: Verdict = {
    verdict: params.verdict as Verdict["verdict"],
    reason: fv.reason ?? "",
  };

  await ap.post(`${ver(1)}/registrations/${params.id}/review`, {
    json: verdict,
    headers: { authorization: auth.idToken },
  });

  return redirect("../success");
};
