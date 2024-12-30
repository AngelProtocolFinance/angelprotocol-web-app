import { apes } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { type ActionFunction, redirect } from "react-router";

export const moveFundAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await apes.put(`endowments/${params.id}/move-balance`, {
    headers: { authorization: auth.idToken },
    json: await request.json(),
  });
  return redirect("..");
};
