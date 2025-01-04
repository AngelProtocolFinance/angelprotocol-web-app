import { type ActionFunction, redirect } from "@remix-run/react";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";

export const newBanking: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const payload = await request.json();

  await ap.post(`${ver(1)}/banking-applications`, {
    headers: { authorization: auth.idToken },
    json: payload,
  });
  return redirect("..");
};
