import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { type ActionFunction, redirect } from "react-router";
import type { ActionResult } from "types/action";

type Next = { success: string } | { redirect: string };

export const endowUpdate =
  (next: Next): ActionFunction =>
  async ({ params, request }) => {
    const auth = await loadAuth();
    if (!auth) return redirectToAuth(request);

    await ap.patch(`${ver(9)}/endowments/${params.id}`, {
      headers: { authorization: auth.idToken },
      json: await request.json(),
    });

    if ("success" in next) {
      return { success: next.success } satisfies ActionResult;
    }

    return redirect(next.redirect);
  };
