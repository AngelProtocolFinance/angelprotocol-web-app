import type { Verdict } from "@better-giving/registration/approval";
import { loadAuth, redirectToAuth } from "auth";
import PromptV2 from "components/Prompt/PromptV2";
import { APIs } from "constants/urls";
import {
  type ActionFunction,
  type RouteObject,
  redirect,
} from "react-router-dom";
import { version as v } from "services/helpers";
import Prompt from "./Prompt";

const action: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const fv: { reason?: string } = await request.json();

  const url = new URL(APIs.aws);

  const verdict: Verdict = {
    verdict: params.verdict as Verdict["verdict"],
    reason: fv.reason ?? "",
  };

  const cachePath = `${v(1)}/registrations/${params.id}`;
  url.pathname = `${cachePath}/review`;
  const req = new Request(url, {
    method: "POST",
    body: JSON.stringify(verdict),
    headers: { authorization: `Bearer ${auth?.idToken}` },
  });

  const res = await fetch(req);
  if (!res.ok) throw res;

  const cacheKey = new URL(APIs.aws);
  cacheKey.pathname = cachePath;

  await caches.open("bg").then((c) => c.delete(cacheKey));

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
