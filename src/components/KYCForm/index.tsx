import { apes } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { type ActionFunction, redirect } from "react-router-dom";

export { Component } from "./KYCForm";

export const action: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  await apes.put(`crypto-donation/${params.id}`, {
    headers: { authorization: auth.idToken },
    json: await request.json(),
  });

  return redirect("..");
};
