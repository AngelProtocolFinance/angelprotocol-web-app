import { type ActionFunction, redirect } from "@remix-run/react";
import { apes } from "api/api";
import { loadAuth, redirectToAuth } from "auth";

export const moveFundAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await apes.put(`endowments/${params.id}/move-balance`, {
    headers: { authorization: auth.idToken },
    json: await request.json(),
  });
  return redirect("..");
};
