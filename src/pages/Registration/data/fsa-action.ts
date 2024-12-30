import type { FsaPayload } from "@better-giving/registration/fsa";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { regRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router";

export const clientAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const contentType = request.headers.get("content-type");
  const signer =
    contentType === "application/json"
      ? await request.json()
      : await request.formData().then((fv) => fv.get("signer_eid")?.toString());

  const from = new URL(request.url);
  from.pathname = `register/${params.regId}/${regRoutes.sign_result}`;
  from.search = "";
  const payload: FsaPayload = {
    signer,
    redirectUrl: from.toString(),
  };

  const { url: to } = await ap
    .post<{ url: string }>(`${ver(1)}/registration-fsa`, {
      json: payload,
      headers: { authorization: auth.idToken },
    })
    .json();

  return redirect(to);
};
