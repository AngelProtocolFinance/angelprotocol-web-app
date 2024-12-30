import type { Update } from "@better-giving/registration/update";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { type ActionFunction, redirect } from "react-router";

export const updateAction =
  (next: string): ActionFunction =>
  async ({ request, params }) => {
    const auth = await loadAuth();
    if (!auth) return redirectToAuth(request);

    const data: Update = await request.json();

    await ap.patch(`${ver(1)}/registrations/${params.regId}`, {
      headers: { authorization: auth.idToken },
      json: data,
    });

    return redirect(`../${next}`);
  };
