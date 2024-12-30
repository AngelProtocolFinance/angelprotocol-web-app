import type { FsaPayload } from "@better-giving/registration/fsa";
import { ap, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
import { regRoutes } from "constants/routes";
import { type ActionFunction, redirect } from "react-router";

export const fsaAction: ActionFunction = async ({ request, params }) => {
  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const signer = await (async (r) => {
    const r1 = r.clone();
    const form = await r1.formData();
    const signer_eid = form.get("signer_eid")?.toString();
    return (
      signer_eid ||
      ((await request.json()) as Exclude<FsaPayload["signer"], string>)
    );
  })(request);

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
