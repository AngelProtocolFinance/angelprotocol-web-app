import type { ActionFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionData } from "types/action";

export const submitAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await ap.post(`${ver(1)}/registrations/${params.regId}/submit`, {
    headers: { authorization: auth.idToken },
  });

  return {
    __ok: "Your application has been submitted. We will get back to you soon!",
  } satisfies ActionData;
};
