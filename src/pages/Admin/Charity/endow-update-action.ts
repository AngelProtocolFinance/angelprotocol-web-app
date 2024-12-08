import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { type ActionFunction, redirect } from "react-router-dom";

export const action: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await ap.patch(`${ver(9)}/endowments/${params.id}`, {
    headers: { authorization: auth.idToken },
    json: await request.json(),
  });

  return redirect("success");
};
