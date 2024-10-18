import type { FsaPayload } from "@better-giving/registration/fsa";
import { loadAuth, redirectToAuth } from "auth";
import { regRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import type { ActionFunction } from "react-router-dom";
import { version as v } from "services/helpers";

export const fsaAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const data: FsaPayload["signer"] = await request.json();

  const from = new URL(request.url);
  from.pathname = `register/${params.regId}/${regRoutes.sign_result}`;
  from.search = "";
  const payload: FsaPayload = {
    signer: data,
    redirectUrl: from.toString(),
  };

  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/registration-fsa`;

  const req = new Request(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  req.headers.set("authorization", auth.idToken);

  const { url: to } = await fetch(req).then<{ url: string }>((res) =>
    res.json()
  );
  return new Response("", { status: 302, headers: { Location: to } });
};
