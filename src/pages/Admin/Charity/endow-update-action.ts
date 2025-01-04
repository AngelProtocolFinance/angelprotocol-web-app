import { type ActionFunction, redirect } from "@remix-run/react";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionData } from "types/action";

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
      return { __ok: next.success } satisfies ActionData;
    }

    return redirect(next.redirect);
  };
