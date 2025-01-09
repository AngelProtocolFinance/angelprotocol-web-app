import type { LoaderFunction } from "@remix-run/react";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";

export const userFunds: LoaderFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  return ap
    .get(`${ver(3)}/users/${auth.email}/funds`, {
      headers: { authorization: auth.idToken },
    })
    .json();
};
