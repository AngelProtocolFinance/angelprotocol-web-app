import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import { type ActionFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";

export const action: ActionFunction = async ({ params, request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(APIs.aws);
  url.pathname = `/${v(9)}/endowments/${params.id}`;

  const req = new Request(url, {
    method: "PATCH",
    body: await request.json().then((r) => JSON.stringify(r)),
    headers: { authorization: auth.idToken },
  });

  const res = await fetch(req);

  if (!res.ok) throw res;

  const key = new URL(APIs.aws);
  key.pathname = `v9/endowments/${params.id}`;

  await caches
    .open("bg")
    .then((cache) => cache.delete(key.toString(), { ignoreSearch: true }));

  return redirect("success");
};
