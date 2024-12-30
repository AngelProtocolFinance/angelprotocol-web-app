import type { Verdict } from "@better-giving/registration/approval";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { PromptV2 } from "components/Prompt";
import { type ActionFunction, type RouteObject, redirect } from "react-router";
import Prompt from "./Prompt";

const action: ActionFunction = async ({ request, params }) => {
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

export const reviewRoute: RouteObject = {
  path: ":verdict",
  element: <Prompt />,
  action,
};

export const promptRoutes: RouteObject[] = [
  {
    path: "success",
    element: <PromptV2 type="success">Review submitted</PromptV2>,
  },
];
