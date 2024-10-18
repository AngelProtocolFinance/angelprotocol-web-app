import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import type { ActionFunction } from "react-router-dom";
import { version as v } from "services/helpers";

export const submitAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/registrations/${params.regId}/submit`;

  const req = new Request(url, { method: "POST" });
  req.headers.set("authorization", auth.idToken);
  const res = await fetch(req);
  if (!res.ok) throw res;

  const key = new URL(request.url);
  key.pathname = `${v(1)}/registrations/${params.regId}`;

  await caches
    .open("bg")
    .then((c) => c.delete(key.toString(), { ignoreSearch: true }));

  return res;
};
