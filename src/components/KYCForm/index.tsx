import { apes } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import type { ActionFunction } from "react-router-dom";

export { Component } from "./KYCForm";

export const action: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const res = await apes.put(`crypto-donation/${params.id}`, {
    headers: { authorization: auth.idToken },
    json: await request.json(),
  });

  return res.ok
    ? { success: "Your tax receipt has been sent" }
    : { err: "Failed to send receipt request" };
};
