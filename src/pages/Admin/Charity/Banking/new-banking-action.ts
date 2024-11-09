import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import { type ActionFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";

export const newBanking: ActionFunction = async ({ request }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const payload = await request.json();

  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/banking-applications`;

  const req = new Request(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${auth.idToken}`,
    },
  });

  const res = await fetch(req);
  if (!res.ok) throw res;
  return redirect("..");
};
