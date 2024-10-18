import type { Update } from "@better-giving/registration/update";
import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import { type ActionFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";

export const updateAction =
  (next: string): ActionFunction =>
  async ({ request, params }) => {
    const auth = await loadAuth();
    if (!auth) return redirectToAuth(request);

    const data: Update = await request.json();

    const url = new URL(APIs.aws);
    url.pathname = `${v(1)}/registrations/${params.regId}`;

    const req = new Request(url, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    req.headers.set("authorization", auth.idToken);
    const res = await fetch(req);
    //used as context
    if (!res.ok) throw res;

    await caches
      .open("bg")
      .then((c) => c.delete(req.url, { ignoreSearch: true }));

    return redirect(`../${next}`);
  };
