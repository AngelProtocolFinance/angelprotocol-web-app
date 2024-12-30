import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { type ActionFunction, redirect } from "react-router";

export const submitAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await ap.patch(`${ver(1)}/registrations/${params.regId}/submit`, {
    headers: { authorization: auth.idToken },
  });

  return redirect("success");
};
