import { type ActionFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";
import type { ActionData } from "types/action";

type Next = { success: string } | { redirect: string };

export const endowUpdate =
  (next: Next): ActionFunction =>
  async ({ params, request }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return redirectToAuth(request, headers);

    await ap.patch(`${ver(9)}/endowments/${params.id}`, {
      headers: { authorization: user.idToken },
      json: await request.json(),
    });

    if ("success" in next) {
      return { __ok: next.success } satisfies ActionData;
    }

    return redirect(next.redirect);
  };
