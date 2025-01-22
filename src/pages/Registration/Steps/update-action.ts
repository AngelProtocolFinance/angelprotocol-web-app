import type { Update } from "@better-giving/registration/update";
import { type ActionFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from ".server/auth";

export const updateAction =
  (next: string): ActionFunction =>
  async ({ request, params }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return redirectToAuth(request, headers);

    const data: Update = await request.json();

    await ap.patch(`${ver(1)}/registrations/${params.regId}`, {
      headers: { authorization: user.idToken },
      json: data,
    });

    return redirect(`../${next}`);
  };
