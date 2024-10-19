import { loadAuth, redirectToAuth } from "auth";
import { ENVIRONMENT } from "constants/env";
import { APIs } from "constants/urls";
import { type ActionFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";

export const moveFundAction: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(APIs.apes);
  url.pathname = `${ENVIRONMENT}/endowments/${params.id}/move-balance`;

  const req = new Request(url, {
    method: "PUT",
    body: await request.json().then((r) => JSON.stringify(r)),
    headers: { authorization: auth.idToken },
  });

  const key = new URL(APIs.apes);
  key.pathname = `${v(1)}/balances/${params.id}`;
  await caches.open("bg").then((cache) => cache.delete(key));

  const res = await fetch(req);
  if (!res.ok) throw res;
  return redirect("..");
};
