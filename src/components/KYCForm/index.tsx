import { type ActionFunction, redirect } from "@remix-run/react";
import { apes } from "api/api";
import { loadAuth, redirectToAuth } from "auth";

export { default } from "./KYCForm";

export const clientAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await apes.put(`crypto-donation/${params.id}`, {
    headers: { authorization: auth.idToken },
    json: await request.json(),
  });

  return redirect("..");
};
